import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useTranslation } from 'react-i18next';
import { IClass, IPagination } from '../../models/IClass';
import { apiCall } from '../../utils/apiCall';
import { adminService } from '../../services/admin/AdminService';
import {
  Avatar,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { set } from 'lodash';

interface Column {
  id:
    | 'name'
    | 'id'
    | 'description'
    | 'owner'
    | 'activted'
    | 'action'
    | 'quantity';
  label: string;
  minWidth?: number;
  maxWidth?: number;
  align?: 'center';
}

interface Data {
  name: string;
  id: string;
  description: string;
  owner: React.ReactNode;
  quantity: React.ReactNode;
  activted: React.ReactNode;
}

export default function StickyHeadTable() {
  const { t } = useTranslation();

  const columns: Column[] = [
    { id: 'id', label: t('classId'), minWidth: 50, align: 'center' },
    { id: 'name', label: t('className'), minWidth: 100 },
    {
      id: 'description',
      label: t('description'),
      minWidth: 150,
      maxWidth: 200,
    },
    {
      id: 'owner',
      label: t('owner'),
      minWidth: 170,
    },
    {
      id: 'quantity',
      label: t('numOfStudent/numOfTeacher'),
      minWidth: 80,
      align: 'center',
    },
    {
      id: 'activted',
      label: t('status'),
      minWidth: 80,
      align: 'center',
    },
  ];

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [classes, setClasses] = React.useState<IClass[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedClass, setSelectedClass] = React.useState<IClass | null>(null);
  const total = React.useRef(0);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const rows: Data[] =
    classes?.map((c) => {
      return {
        id: c.id,
        name: c.name,
        description: c.description,
        owner: (
          <div className="flex flex-row items-center">
            <Avatar src={c.owner.avatar} />
            <div className="ml-2">{c.owner.name}</div>
          </div>
        ),
        quantity: (
          <div className="flex flex-row items-center justify-center">
            <div className="mr-2">{c.numberOfStudents}</div>
            <div className="mr-2">/</div>
            <div>{c.numberOfTeachers}</div>
          </div>
        ),
        activted: c.isActive ? (
          <CheckCircleIcon color="success" />
        ) : (
          <DoDisturbOnIcon color="error" />
        ),
      } as unknown as Data;
    }) ?? [];

  const fetchClasses = async ({
    page,
    limit,
    sortField,
    order,
    search,
  }: {
    page?: number;
    limit?: number;
    sortField?: string;
    order?: string;
    search?: string;
  }) => {
    setIsLoading(true);
    await apiCall(
      adminService.fetchAllClasses({
        page,
        limit,
        sortField,
        order,
        search,
      }),
      {
        ifSuccess: (res) => {
          const data = res.metadata as {
            classes: IClass[];
            paging: IPagination;
          };
          setClasses(data.classes);
          total.current = data.paging.total;
        },
        ifFailed: (err) => {
          console.log(err);
        },
      },
    );
    setIsLoading(false);
  };

  const activateClass = async (classId: string) => {
    await apiCall(adminService.activeClass(parseInt(classId)), {
      ifSuccess: () => {
        setClasses((prev) => {
          const newClasses = [...prev];
          const index = newClasses.findIndex((c) => c.id === classId);
          newClasses[index].isActive = true;
          return newClasses;
        });
      },
      ifFailed: (err) => {
        console.log(err);
      },
    });
  };

  const deactivateClass = async (classId: string) => {
    await apiCall(adminService.inactiveClass(parseInt(classId)), {
      ifSuccess: () => {
        setClasses((prev) => {
          const newClasses = [...prev];
          const index = newClasses.findIndex((c) => c.id === classId);
          newClasses[index].isActive = false;
          return newClasses;
        });
      },
      ifFailed: (err) => {
        console.log(err);
      },
    });
  };

  React.useEffect(() => {
    fetchClasses({ page: page + 1 });
  }, [page]);

  return (
    <>
      <div className="flex flex-row items-center justify-between h-8">
        <div className="text-lg mb-4 font-bold">{t('classManagement')}</div>
        <div className="text-sm mb-4 font-bold">
          {isLoading && <CircularProgress />}
        </div>
      </div>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    sx={{
                      backgroundColor: '#f3f4f6',
                    }}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell
                  sx={{
                    backgroundColor: '#f3f4f6',
                  }}
                ></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id as keyof typeof row];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                    <TableCell>
                      <IconButton
                        onClick={(e) => {
                          setSelectedClass(
                            classes.find((c) => c.id === row.id) ?? null,
                          );
                          handleClick(e);
                        }}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={total.current}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Menu popup */}
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem
          onClick={() => {
            if (selectedClass?.id ?? false) {
              if (selectedClass?.isActive) {
                deactivateClass(selectedClass!.id);
              } else {
                activateClass(selectedClass!.id);
              }
            }
            handleClose();
          }}
        >
          {selectedClass?.isActive ? t('inactiveClass') : t('activeClass')}
        </MenuItem>
      </Menu>
    </>
  );
}
