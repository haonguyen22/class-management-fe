import { Avatar, Button, CircularProgress, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useTranslation } from 'react-i18next';
import { AccountCircle, EmailOutlined } from '@mui/icons-material';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';

import FieldInfoRow from '../../components/User/FieldInfoRow';
import { useEffect, useState } from 'react';
import { useAuthHeader, useAuthUser, useSignIn } from 'react-auth-kit';
import { blue } from '@mui/material/colors';
import { userService } from '../../services/user/UserService';
import { apiCall } from '../../utils/apiCall';
import { useSnackbar } from 'notistack';
import styled from '@emotion/styled';
import { IUser } from '../../models/User';

interface UserProfileUpdate {
  name: string;
  phoneNumber: string;
  address: string;
  studentId: string;
  avatar?: string;
}

function UserProfilePage() {
  const auth = useAuthUser();
  const authHeader = useAuthHeader();
  const signIn = useSignIn();
  const [tokenType, token] = authHeader().split(' ');

  const [profile, setProfile] = useState<UserProfileUpdate>({
    name: '',
    phoneNumber: '',
    address: '',
    studentId: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const { t } = useTranslation();

  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const getMe = async () => {
    setIsLoading(true);
    await apiCall(userService.getMe(), {
      ifSuccess: (data) => {
        const res = data.metadata as UserProfileUpdate;
        setProfile(res);
        signIn({
          token,
          tokenType,
          expiresIn: 3600,
          authState: { user: data.metadata as IUser },
        });
      },
      ifFailed: (error) => {
        console.log(error);
      },
    });
    setIsLoading(false);
  };

  const saveInformation = async () => {
    setIsLoading(true);
    await apiCall(userService.updateUser(profile), {
      ifSuccess: () => {
        enqueueSnackbar(t('saveSuccess'), { variant: 'success' });
      },
      ifFailed: (error) => {
        console.log(error);
        enqueueSnackbar(t('saveFailed'), { variant: 'error' });
      },
    });
    setIsLoading(false);
  };

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    borderRadius: '100%',
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  const changeAvatar = async (file?: File) => {
    if (!file) return;
    setIsLoading(true);
    await apiCall(userService.updateAvatar(file!), {
      ifSuccess: (data) => {
        const res = data.metadata as { backgroundImage: string };
        setProfile({
          ...profile,
          avatar: res.backgroundImage,
        });
        enqueueSnackbar(t('saveSuccess'), { variant: 'success' });
      },
      ifFailed: (error) => {
        enqueueSnackbar(t('saveFailed'), { variant: 'error' });
        console.log(error);
      },
    });
    setIsLoading(false);
  };

  useEffect(() => {
    getMe();
  }, []);

  return (
    <div className="w-full flex  flex-col items-center justify-center">
      <div className="w-2/3 min-w-fit  min-h-80 border-t-4 border-t-blue-500 shadow-md rounded-md py-12 px-20">
        <div className="flex flex-row items-center justify-center relative mb-8">
          <div className=" relative" style={{ width: 130, height: 130 }}>
            <Avatar
              alt="Remy Sharp"
              src={profile.avatar}
              sx={{ width: 130, height: 130, marginRight: '20px' }}
              className=" absolute top-0 left-0"
            />
            <Avatar
              component="label"
              sx={{
                bgcolor: blue[500],
                width: 30,
                height: 30,
                position: 'absolute',
                bottom: 0,
                right: 0,
                cursor: 'pointer',
              }}
              onClick={(e) =>
                changeAvatar((e.target as HTMLInputElement).files?.[0])
              }
              className="absolute bottom-0 right-0"
            >
              <EditIcon />
              <VisuallyHiddenInput type="file" />
            </Avatar>
          </div>
          <div className="flex flex-col  justify-center ml-10">
            <div className="text-2xl font-bold mb-4">{auth()!.user.name}</div>
            <div className="text-base font-thin text-gray-500">
              {t('studentId')}: {auth()!.user.studentId}
            </div>{' '}
            <div className="text-base font-thin text-gray-500">
              {t('accountId')}: {auth()!.user.id}
            </div>
          </div>
        </div>
        <Divider />
        <div className="px-20 mt-8">
          <FieldInfoRow
            label={t('studentId')}
            value={profile.studentId}
            required
            onChange={onTextChange}
            name="studentId"
            icon={
              <SchoolIcon
                sx={{ width: '35px', height: '35px', marginRight: '8px' }}
                fontSize="large"
              />
            }
          />
          <FieldInfoRow
            label={t('name')}
            value={profile.name}
            required
            name="name"
            onChange={onTextChange}
            icon={
              <AccountCircle
                sx={{ width: '35px', height: '35px', marginRight: '8px' }}
                fontSize="large"
              />
            }
          />

          <FieldInfoRow
            label={t('email')}
            value={auth()!.user.email}
            required
            disabled
            icon={
              <EmailOutlined
                sx={{ width: '35px', height: '35px', marginRight: '8px' }}
                fontSize="large"
              />
            }
          />

          <FieldInfoRow
            label={t('phoneNumber')}
            value={profile.phoneNumber}
            required
            onChange={onTextChange}
            name="phoneNumber"
            icon={
              <LocalPhoneIcon
                sx={{ width: '35px', height: '35px', marginRight: '8px' }}
                fontSize="large"
              />
            }
          />

          <FieldInfoRow
            label={t('address')}
            value={profile.address}
            required
            onChange={onTextChange}
            name="address"
            icon={
              <HomeIcon
                sx={{ width: '35px', height: '35px', marginRight: '8px' }}
                fontSize="large"
              />
            }
          />

          <div className="w-full self-center text-center">
            {isLoading ? (
              <CircularProgress
                color="warning"
                sx={{ width: '12px', height: '12px' }}
              />
            ) : (
              <Button
                variant="contained"
                color="primary"
                className="self-center"
                onClick={saveInformation}
                sx={{ marginTop: '20px', padding: '10px 28px' }}
              >
                {t('save')}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfilePage;
