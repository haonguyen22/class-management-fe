import { IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Header from '../../components/Header/Header';
import { AppBar } from './Style';

function AppBarDrawer({
  open,
  handleDrawerOpen,
}: {
  open: boolean;
  handleDrawerOpen: () => void;
}) {
  return (
    <AppBar position="fixed" color="inherit" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography className="w-full" component="div">
          <Header />
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default AppBarDrawer;
