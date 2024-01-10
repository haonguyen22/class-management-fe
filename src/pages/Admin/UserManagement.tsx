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
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';
import BlockIcon from '@mui/icons-material/Block';
import SendIcon from '@mui/icons-material/Send';
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
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { avatarDefault } from '../../constants/globalConst';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import { Upload } from '@mui/icons-material';
import { downloadFileXlsx } from '../../utils/xlsx';
import FormUpload from '../../components/Grade/FormUpload';

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

export default function UserManagementPage() {
  const { t } = useTranslation();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [users, setUsers] = React.useState<IUser[]>([]);
  const [open, setOpen] = React.useState(false);
  const [editUser, setEditUser] = React.useState<IUser>();
  const [isLoading, setIsLoading] = React.useState(false);
  const [openUpload, setOpenUpload] = React.useState(false);

  React.useEffect(() => {
    fetchUsers();
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
    {
      id: 'phoneNumber',
      label: t('phoneNumber'),
      minWidth: 100,
    },
    { id: 'role', label: t('role'), minWidth: 120 },
    {
      id: 'address',
      label: t('address'),
      minWidth: 170,
    },
  ];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const rows =
    users?.map((user) => {
      return createData(
        user?.role?.toLowerCase() !== 'admin' ?? false ? (
          <AdminPanelSettingsIcon color="primary" />
        ) : (
          <PersonIcon color="primary" />
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

  const fetchUsers = async () => {
    setIsLoading(true);
    await apiCall(adminService.fetchAllUsers(), {
      ifSuccess: (res) => {
        const result = res as unknown as IUser[];
        setUsers(result);
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

  const handleBlockUser = async (id: number) => {
    setIsLoading(true);
    await apiCall(adminService.lockUser(id), {
      ifSuccess: () => {
        setUsers((prev) => {
          const index = prev.findIndex((x) => x.id === id);
          prev[index].isActive = false;
          return [...prev];
        });
        enqueueSnackbar(t('blockSuccess'), { variant: 'success' });
      },
      ifFailed: (error) => {
        console.log(error);
        enqueueSnackbar(error.message, { variant: 'error' });
      },
    });
    setIsLoading(false);
  };

  const deleteUser = async (id: number) => {
    setIsLoading(true);

    await apiCall(adminService.deleteUser(id), {
      ifSuccess: () => {
        setUsers((prev) => {
          const index = prev.findIndex((x) => x.id === id);
          prev.splice(index, 1);
          return [...prev];
        });
        enqueueSnackbar(t('deleteSuccess'), { variant: 'success' });
      },
      ifFailed: (error) => {
        console.log(error);
        enqueueSnackbar(error.message, { variant: 'error' });
      },
    });
    setIsLoading(false);
  };

  const updateUser = async (id: number) => {
    setIsLoading(true);
    await apiCall(
      adminService.updateUser(id, {
        address: editUser?.address,
        name: editUser?.name,
        phoneNumber: editUser?.phoneNumber,
        studentId: editUser?.studentId,
      }),
      {
        ifSuccess: () => {
          setUsers((prev) => {
            const index = prev.findIndex((x) => x.id === editUser?.id);
            prev[index] = editUser as IUser;
            return [...prev];
          });
          handleClose();
          enqueueSnackbar(t('editSuccess'), { variant: 'success' });
        },
        ifFailed: (error) => {
          console.log(error);
          enqueueSnackbar(error.message, { variant: 'error' });
        },
      },
    );
    setIsLoading(false);
  };

  const exportMapListStudent = async () => {
    setIsLoading(true);
    await apiCall(adminService.exportUserExcel(), {
      ifSuccess: (data) => {
        downloadFileXlsx({
          data: data as unknown as Blob,
          fileName: `map-studentid-${new Date().getTime()}`,
        });
        enqueueSnackbar('Download success', {
          variant: 'success',
        });
      },
      ifFailed: (error) => {
        console.log(error);
        enqueueSnackbar(error.message, { variant: 'error' });
      },
    });
    setIsLoading(false);
  };

  const uploadMapListStudent = async (file: File) => {
    setIsLoading(true);
    await apiCall(adminService.uploadUserExcel(file), {
      ifSuccess: (data) => {
        enqueueSnackbar(data.message, { variant: 'success' });
        fetchUsers();
      },
      ifFailed: (error) => {
        enqueueSnackbar(error.message, { variant: 'error' });
      },
    });
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-start">
      <div className="w-full flex flex-row items-center justify-between h-8">
        <div className="text-lg mb-4 font-bold">{t('userManagement')}</div>
        <div className="text-sm mb-4 font-bold">
          {isLoading && <CircularProgress />}
        </div>
      </div>
      <div className="flex flex-row items-center">
        <Button
          variant="contained"
          startIcon={<DownloadIcon />}
          onClick={exportMapListStudent}
        >
          {t('exportMapListStudent')}
        </Button>
        <div className="w-4" />
        <Button
          variant="contained"
          className="my-2"
          onClick={() => setOpenUpload(true)}
          startIcon={<Upload />}
        >
          {t('uploadMapListStudent')}
        </Button>
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
                  console.log(row);
                  const isActive = users[index]?.isActive ?? false;
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.userId}
                      sx={{
                        backgroundColor: `${
                          !isActive ? 'rgba(255,0,0,0.08)' : ''
                        }`,
                      }}
                    >
                      {columns.map((column) => {
                        const value = row[column.id as keyof typeof row];
                        return <TableCell key={column.id}>{value}</TableCell>;
                      })}
                      <TableCell>
                        {isActive  ? (
                          <>
                            { row.userId !== '1' &&
                              <Tooltip title={t('block')}>
                                <BlockIcon
                                  onClick={() =>
                                    handleBlockUser(parseInt(row.userId))
                                  }
                                  color="error"
                                  sx={{
                                    marginX: 1,
                                    ':hover': {
                                      cursor: 'pointer',
                                    },
                                  }}
                                />
                              </Tooltip>
                            }
                            <Tooltip title={t('edit')}>
                              <EditIcon
                                onClick={() => {
                                  handleClickOpen();
                                  setEditUser(users[index]);
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
                            { row.userId !== '1' &&
                              <Tooltip title={t('delete')}>
                                <HighlightOffIcon
                                  onClick={() => deleteUser(parseInt(row.userId))}
                                  color="error"
                                  sx={{
                                    marginX: 1,
                                    ':hover': {
                                      cursor: 'pointer',
                                    },
                                  }}
                                />
                              </Tooltip>
                            }
                          </>
                        ) : (
                          <div>{t('accountNotActivated')}</div>
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

      <FormUpload
        handleSubmit={(file) => uploadMapListStudent(file)}
        titleForm={t('uploadMapListStudent')}
        open={openUpload}
        setOpen={setOpenUpload}
      />

      {/* edit user */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{t('editUser')}</DialogTitle>
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
          <TextField
            id="input-with-sx"
            className="w-full"
            label={t('phoneNumber')}
            margin="normal"
            required={true}
            value={editUser?.phoneNumber}
            onChange={onEditUserChange}
            variant="outlined"
            name={'phoneNumber'}
          />
          <TextField
            id="input-with-sx"
            className="w-full"
            label={t('address')}
            required={true}
            margin="normal"
            value={editUser?.address}
            onChange={onEditUserChange}
            variant="outlined"
            name={'address'}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t('cancel')}</Button>
          <Button
            onClick={async () => {
              await updateUser(editUser?.id ?? 0);
              handleClose();
            }}
          >
            {t('edit')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
