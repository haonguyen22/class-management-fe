import React, { useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useNavigate, useParams } from 'react-router-dom';
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';

export const ClassDetailNav = ({ children }: { children: React.ReactNode }) => {
  const [value, setValue] = React.useState(0);
  const path = window.location.pathname;
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const index = path.lastIndexOf('/');
    const pathName = path.substring(index + 1);
    if (pathName === 'detail') setValue(0);
    if (pathName === 'members') setValue(1);
    if (pathName === 'scores') setValue(2);
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
  ];

  const handleClick = (newValue: number, path: string) => {
    setValue(newValue);
    navigate(path);
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'gray' }}>
        <Tabs value={value} aria-label="basic tabs example">
          {NavList.map((item, index) => (
            <Tab
              sx={{ fontWeight: '550' }}
              label={item.name}
              key={index}
              onClick={() => handleClick(index, item.path)}
            />
          ))}
        </Tabs>
      </Box>
      <div className="mt-8" />
      {children}
    </>
  );
};
