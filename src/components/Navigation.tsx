import { AppBar, Toolbar, Button } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';


const NavList = [
  {
    name: 'Class Info',
    path: '/class/detail',
  },
  {
    name: 'People Info',
    path: '/class/members',
  },
  {
    name: 'Score Table',
    path: '/class/scores',
  },
];

const Navigation = ({children}: { children: React.ReactNode }) => {
  return (
    <div>
      <AppBar position="static" sx={{background: 'white', color:'black', boxShadow: 'none', fontFamily:'serif' }}>
        <Toolbar className='flex justify-center'>
          {NavList.map((item, index) => (
            <Button color="inherit" key={index} component={NavLink} to={item.path}
              sx={{ fontWeight: 'bold', '&.active': { color: 'blue',}}}
            >
              {item.name}
            </Button>
          ))}
        </Toolbar>
      </AppBar>
      {children}
    </div>
  );
};

export default Navigation;
