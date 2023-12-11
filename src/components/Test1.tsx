import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

const Test1=({children}: {children: React.ReactNode})=> {
  const [value, setValue] = React.useState(0);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const NavList = [
    {
      name: 'Class Info',
      path: `/class/${id}/detail`,
    },
    {
      name: 'People Info',
      path: `/class/${id}/members`,
    },
    {
      name: 'Score Table',
      path: `/class/${id}/scores`,
    },
  ];

  return (
    <>
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} aria-label="basic tabs example">
          {NavList.map((item, index) => (
            <Tab label={item.name} key={index} onClick={() => navigate(item.path)} />
          ))}
        </Tabs>
      </Box>
      {children}
    </Box>
    </>
  );
};

export default Test1;


