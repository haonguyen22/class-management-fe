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
import { IClass, IClassFilter, IPagination } from '../../models/IClass';
import { apiCall } from '../../utils/apiCall';
import { adminService } from '../../services/admin/AdminService';
import {
  Avatar,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { debounce } from 'lodash';
import { Navigate, useNavigate } from 'react-router-dom';

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

interface FilterClass {
  sortField?: string;
  order?: string;
  search?: string;
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

  const SortField = [
    { value: 'name', label: t('name') },
    { value: 'createdAt', label: t('createdAt') },
  ];

  const Order = [
    { value: 'asc', label: t('asc') },
    { value: 'desc', label: t('desc') },
  ];

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [classes, setClasses] = React.useState<IClass[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedClass, setSelectedClass] = React.useState<IClass | null>(null);
  const [filter, setFilter] = React.useState<FilterClass>({});
  const total = React.useRef(0);
  const navigate = useNavigate();

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
    page = 1,
    limit = 10,
    sortField,
    order,
    search,
  }: {
    page?: number;
    limit?: number;
    sortField?: string | undefined;
    order?: string | undefined;
    search?: string;
  }) => {
    console.log(page, limit, sortField, order, search);
    setIsLoading(true);
    let body: IClassFilter = {
      page,
      limit,
      search,
      sortField: undefined,
      order: undefined,
    };
    if (sortField !== undefined && order !== undefined) {
      body = {
        ...body,
        sortField,
        order,
      };
    }
    await apiCall(adminService.fetchAllClasses(body), {
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
    });
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

  const debounceFetchClass = React.useCallback(
    debounce((nextValue) => {
      setPage(0);
      fetchClasses(nextValue);
    }, 1000),
    [],
  );

  const onFilterChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    const filterValue = {
      ...filter,
      [name]: value,
    };
    setFilter((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    if (
      (e.target.value !== undefined &&
        filterValue.order !== undefined &&
        filterValue.sortField !== undefined) ||
      filterValue.search !== undefined
    ) {
      debounceFetchClass({
        ...filterValue,
        page: page,
        limit: rowsPerPage,
      });
    }
  };

  React.useEffect(() => {
    fetchClasses({ page: page + 1, limit: rowsPerPage, ...filter });
  }, [page, rowsPerPage]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center justify-between h-8">
        <div className="text-lg mb-4 font-bold">{t('classManagement')}</div>
        <div className="text-sm mb-4 font-bold">
          {isLoading && <CircularProgress />}
        </div>
      </div>
      {/* Filter */}
      <div className="flex flex-row items-center justify-between mb-4 h-10">
        <div className="flex flex-row items-center">
          <FilterListIcon sx={{ marginRight: 4 }} />
          <Select
            value={filter.sortField}
            name="sortField"
            onChange={onFilterChange}
            sx={{
              minWidth: 120,
              mr: 4,
              height: 40,
            }}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value={undefined}>
              <em>{t('none')}</em>
            </MenuItem>{' '}
            {SortField.map((s) => (
              <MenuItem key={s.label} value={s.value}>
                {s.label}
              </MenuItem>
            ))}
          </Select>{' '}
          <Select
            value={filter.order}
            onChange={onFilterChange}
            name="order"
            sx={{
              minWidth: 120,
              mr: 4,
              height: 40,
            }}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value={undefined}>
              <em>{t('none')}</em>
            </MenuItem>
            {Order.map((o) => (
              <MenuItem key={o.label} value={o.value}>
                {o.label}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className="flex flex-row items-center">
          <TextField
            id="outlined-basic"
            label={t('searchByClassName')}
            variant="outlined"
            size="small"
            name="search"
            onChange={(e) => {
              const { value } = e.target;
              const filterValue = {
                ...filter,
                search: value,
              };
              setFilter((prev) => {
                return {
                  ...prev,
                  search: value,
                };
              });
              if (value !== undefined) {
                debounceFetchClass({
                  ...filterValue,
                  page: page,
                  limit: rowsPerPage,
                });
              }
            }}
          />{' '}
        </div>
      </div>

      {/* Table */}

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
                        <TableCell
                          key={column.id}
                          align={column.align}
                          sx={{
                            cursor: 'pointer',
                          }}
                          onClick={() => navigate('/admin/classes/' + row.id)}
                        >
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
    </div>
  );
}
