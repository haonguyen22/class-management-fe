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
import { apiCall } from '../../utils/apiCall';
import { adminService } from '../../services/admin/AdminService';
import { IUser } from '../../models/User';
import { enqueueSnackbar } from 'notistack';
import PersonIcon from '@mui/icons-material/Person';
import SpaIcon from '@mui/icons-material/Spa';
import {
  Avatar,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { avatarDefault } from '../../constants/globalConst';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate, useParams } from 'react-router-dom';
import { RouteList } from '../../routes/routes';
import { classService } from '../../services/class/ClassService';

interface Column {
  id:
    | 'role'
    | 'userId'
    | 'studentId'
    | 'name'
    | 'email'
    | 'phoneNumber'
    | 'address'
    | 'action';
  label: string;
  minWidth?: number;
}

function createData(
  role: React.ReactNode,
  userId: string,
  studentId: string,
  email: React.ReactNode,
  name: string,
  phoneNumber: string,
  address: string,
) {
  return { role, userId, studentId, email, name, phoneNumber, address };
}

export default function ClassDetailManagementPage() {
  const { id } = useParams<{ id: string }>();

  const { t } = useTranslation();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [students, setStudents] = React.useState<IUser[]>([]);
  const [teachers, setTeachers] = React.useState<IUser[]>([]);
  const [open, setOpen] = React.useState(false);
  const [editUser, setEditUser] = React.useState<IUser>();
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    fetchMember();
  }, []);

  const onEditUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    if (!editUser) return;
    setEditUser({
      ...editUser,
      [name]: value,
    });
  };

  const columns: Column[] = [
    { id: 'userId', label: t('userId'), minWidth: 100 },
    {
      id: 'email',
      label: t('email'),
      minWidth: 250,
    },
    { id: 'studentId', label: t('studentId'), minWidth: 100 },
    {
      id: 'name',
      label: t('name'),
      minWidth: 100,
    },
    { id: 'role', label: t('Role'), minWidth: 100 },
  ];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const rows =
    [...teachers, ...students]?.map((user, index) => {
      return createData(
        index < teachers.length ? (
          <Tooltip title={t('teacher')}>
            <SpaIcon color="secondary" />
          </Tooltip>
        ) : (
          <Tooltip title={t('student')}>
            <PersonIcon color="primary" />
          </Tooltip>
        ),
        user?.id?.toString() ?? '',
        user?.studentId ?? '',
        <div className="flex items-center">
          <Avatar
            alt={user?.name}
            src={user?.avatar ?? avatarDefault}
            className="mr-4"
          />
          {user?.email ?? ''}
        </div>,
        user?.name ?? '',
        user?.phoneNumber ?? '',
        user?.address ?? '',
      );
    }) ?? [];

  const fetchMember = async () => {
    setIsLoading(true);
    await apiCall(classService.getListMember(id), {
      ifSuccess: (res) => {
        console.log(res.metadata);
        const result = res.metadata as {
          teachers: IUser[];
          students: IUser[];
        };
        setStudents(result.students);
        setTeachers(result.teachers);
      },
      ifFailed: (error) => {
        console.log(error);
        enqueueSnackbar(error.message, { variant: 'error' });
      },
    });
    setIsLoading(false);
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
  const updateStudentIdMap = async (userId: number, studentId: string) => {
    setIsLoading(true);
    await apiCall(adminService.mapStudentIdToUser(userId, studentId, id!), {
      ifSuccess: () => {
        setStudents((prev) => {
          const newStudents = [...prev];
          const index = newStudents.findIndex((user) => user.id === userId);
          newStudents[index].studentId = studentId;
          return newStudents;
        });
        handleClose();
        enqueueSnackbar(t('editSuccess'), { variant: 'success' });
      },
      ifFailed: (error) => {
        console.log(error);
        enqueueSnackbar(error.message, { variant: 'error' });
      },
    });
    setIsLoading(false);
  };

  const unMapStudentIdToUser = async (userId: number, classId: string) => {
    setIsLoading(true);
    console.log(userId, classId);
    await apiCall(adminService.unMapStudentIdToUser(userId, classId), {
      ifSuccess: () => {
        setStudents((prev) => {
          const newStudents = [...prev];
          const index = newStudents.findIndex((user)  => user.id === userId);
          newStudents[index].studentId = '';
          return newStudents;
        });
        handleClose();
        enqueueSnackbar(t('unmapSuccess'), { variant: 'success' });
      },
      ifFailed: (error) => {
        console.log(error);
        enqueueSnackbar(error.message, { variant: 'error' });
      },
    });
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-start">
      <Button
        variant="contained"
        startIcon={<ArrowBackIosNewIcon />}
        onClick={() => navigate(RouteList.adminClasses)}
      >
        {t('backToClassManagement')}
      </Button>
      <div className="h-4"></div>
      <div className="w-full flex flex-row items-center justify-between h-8">
        <div className="text-lg mb-4 font-bold">
          {t('studentListInClass')} 1234
        </div>
        <div className="text-sm mb-4 font-bold">
          {isLoading && <CircularProgress />}
        </div>
      </div>

      <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: 2 }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    sx={{
                      backgroundColor: '#f3f4f6',
                    }}
                    key={column.id}
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
              {rows
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((row, index) => {
                  const isTeacher = index < teachers.length;
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.userId}
                      sx={{
                        backgroundColor: `${
                          isTeacher ? 'rgba(0,0,255,0.1)' : 'white'
                        }`,
                      }}
                    >
                      {columns.map((column) => {
                        console.log(row.userId);
                        const value = row[column.id as keyof typeof row];
                        return <TableCell key={column.id}>{value}</TableCell>;
                      })}
                      <TableCell>
                        {!isTeacher && row.userId !== '' && (
                          <>
                            <Tooltip title={t('edit')}>
                              <EditIcon
                                onClick={() => {
                                  handleClickOpen();
                                  setEditUser(
                                    students[index - teachers.length],
                                  );
                                }}
                                color="primary"
                                sx={{
                                  marginX: 1,
                                  ':hover': {
                                    cursor: 'pointer',
                                  },
                                }}
                              />
                            </Tooltip>
                          </>
                        )}
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
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* edit user */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{t('editStudent')}</DialogTitle>
        <DialogContent>
          {/* id */}
          <TextField
            id="input-with-sx"
            className="w-full"
            label={t('userId')}
            margin="normal"
            required={true}
            value={editUser?.id}
            onChange={onEditUserChange}
            variant="outlined"
            name={'id'}
            disabled
          />
          <TextField
            id="input-with-sx"
            className="w-full"
            label={t('studentId')}
            margin="normal"
            required={true}
            value={editUser?.studentId}
            onChange={onEditUserChange}
            variant="outlined"
            name={'studentId'}
          />
          <TextField
            id="input-with-sx"
            className="w-full"
            label={t('name')}
            required={true}
            margin="normal"
            value={editUser?.name}
            onChange={onEditUserChange}
            variant="outlined"
            name={'name'}
          />
          <TextField
            id="input-with-sx"
            className="w-full"
            label={t('email')}
            margin="normal"
            required={true}
            disabled
            value={editUser?.email}
            onChange={onEditUserChange}
            variant="outlined"
            name={'email'}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t('cancel')}</Button>
          <Button
            onClick={async () => {
              await updateStudentIdMap(editUser!.id!, editUser!.studentId!);
              handleClose();
            }}
            variant="contained"
          >
            {t('update')}
          </Button>
          <Button
            onClick={async () => {
              await unMapStudentIdToUser(editUser!.id!, id!);
              handleClose();
            }}
            color="error"
            variant="contained"
          >
            {t('unmap')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
