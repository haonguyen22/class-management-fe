import React, { useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useNavigate, useParams } from 'react-router-dom';

const Nav=({children}: {children:React.ReactNode})=> {
  const [value, setValue] = React.useState(0);
  const path = window.location.pathname;
  useEffect(() => {
    const index = path.lastIndexOf('/');
    const pathName = path.substring(index + 1);
    if (pathName === 'detail') setValue(0);
    if (pathName === 'members') setValue(1);
    if (pathName === 'scores') setValue(2);
  }, [path]);
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

  const handleClick = (newValue: number, path:string) => {
    setValue(newValue);
    navigate(path);
  };

  return (
    <div className="flex flex-col items-center">
      <Tabs value={value} aria-label="disabled tabs example">
        {NavList.map((item, index) => (
          <Tab label={item.name} key={index} onClick={() => handleClick(index, item.path)} />
        ))}
      </Tabs>
      {children}
    </div>
  );
};

export default Nav;


