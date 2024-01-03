import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useNavigate, useParams } from 'react-router-dom';
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { ClassContext } from '../../context/ClassContext';
import { apiCall } from '../../utils/apiCall';
import { classService } from '../../services/class/ClassService';
import { useAuthUser } from 'react-auth-kit';
import { Role } from '../../enums/RoleClass';
import { IUser } from '../../models/User';

export const ClassDetailNav = ({ children }: { children: React.ReactNode }) => {
  const [value, setValue] = React.useState(0);
  const path = window.location.pathname;
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const auth = useAuthUser();
  const [role, setRole] = useState(Role.NONE);

  const checkRoleAccount = async () => {
    setRole(Role.NONE);
    const user = auth()!.user;
    await apiCall(classService.getListMember(id), {
      ifSuccess: (data) => {
        if (data.status === 200) {
          const metadata = data.metadata as {
            students: IUser[];
            teachers: IUser[];
          };
          metadata.teachers.forEach((item) => {
            if (item.id === user.id) {
              setRole(Role.TEACHER);
              return;
            }
          });
          metadata.students.forEach((item) => {
            if (item.id === user.id) {
              setRole(Role.STUDENT);
              return;
            }
          });
        }
      },

      ifFailed: () => {
        setRole(Role.NONE);
      },
    });
  };

  useEffect(() => {
    setRole(Role.NONE);

    checkRoleAccount();
  }, []);

  useEffect(() => {
    const index = path.lastIndexOf('/');
    const pathName = path.substring(index + 1);
    if (pathName === 'detail') setValue(0);
    if (pathName === 'members') setValue(1);
    if (pathName === 'scores') setValue(2);
    if (pathName === 'settings') setValue(3);
  }, [path]);

  const NavList = [
    {
      name: t('stream'),
      path: `/class/${id}/detail`,
    },
    {
      name: t('people'),
      path: `/class/${id}/members`,
    },
    {
      name: t('grade'),
      path: `/class/${id}/scores`,
    },
    {
      name: t('homeworks'),
      path: `/class/${id}/homeworks`,
    },
    {
      name: t('settings'),
      path: `/class/${id}/settings`,
    },
  ];

  const handleClick = (newValue: number, path: string) => {
    setValue(newValue);
    navigate(path);
  };

  return (
    <ClassContext.Provider value={{ role, setRole }}>
      <Box sx={{ borderBottom: 1, borderColor: 'gray' }}>
        <Tabs value={value} aria-label="basic tabs example">
          {NavList.map((item, index) => (
            <Tab
              sx={{ fontWeight: '550', fontSize: '13px', paddingX: 4 }}
              label={item.name}
              key={index}
              onClick={() => handleClick(index, item.path)}
            />
          ))}
        </Tabs>
      </Box>
      <div className="mt-8" />
      {children}
    </ClassContext.Provider>
  );
};
