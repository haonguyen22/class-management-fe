import { AppBar, Toolbar, Button } from '@mui/material';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, NavLink, useLocation, useParams } from 'react-router-dom';
import ClassContext from '../context/classContext';

const Navigation = ({children}: { children: React.ReactNode }) => {
  const {t} = useTranslation();
  // const id = localStorage.getItem('classId');
  const {id, setId} = useContext(ClassContext);

  const NavList = [
    {
      name: 'ClassInfo',
      path: `/class/${id}/detail`,
    },
    {
      name: 'PeopleInfo',
      path: `/class/${id}/members`,
    },
    {
      name: 'ScoreTable',
      path: `/class/${id}/scores`,
    },
  ];
  return (
    <div>
      <AppBar position="static" sx={{background: 'white', color:'black', boxShadow: 'none', fontFamily:'serif' }}>
        <Toolbar className='flex justify-center'>
          {NavList.map((item, index) => (
            <Button color="inherit" key={index} component={NavLink} to={item.path}
              sx={{ fontWeight: 'bold', '&.active': { color: 'blue',}}}
            >
              {t(`${item.name}`)}
            </Button>
          ))}
        </Toolbar>
      </AppBar>
      {children}
    </div>
  );
};

export default Navigation;
