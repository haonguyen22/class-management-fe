import { AppBar, Toolbar, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link, NavLink } from 'react-router-dom';


const NavList = [
  {
    name: 'ClassInfo',
    path: '/class/detail',
  },
  {
    name: 'PeopleInfo',
    path: '/class/members',
  },
  {
    name: 'ScoreTable',
    path: '/class/scores',
  },
];

const Navigation = ({children}: { children: React.ReactNode }) => {
  const {t} = useTranslation();
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
