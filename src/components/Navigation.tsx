import { AppBar, Toolbar, Button } from '@mui/material';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useParams } from 'react-router-dom';
import { ClassContext } from '../context/GlobalContext';

const Navigation = ({ children }: { children: React.ReactNode }) => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();

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
    <div>
      <AppBar
        position="static"
        sx={{
          background: 'white',
          color: 'black',
          boxShadow: 'none',
          fontFamily: 'serif',
        }}
      >
        <Toolbar className="flex justify-center">
          {NavList.map((item, index) => (
            <Button
              color="inherit"
              key={index}
              component={NavLink}
              to={item.path}
              sx={{ fontWeight: 'bold', '&.active': { color: 'blue' } }}
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
