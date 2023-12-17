import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import Footer from '../../components/Footer';
import { GlobalContext } from '../../context/GlobalContext';
import AppBarDrawer from './AppBarHeader';
import HomeButtonDrawer from './HomeButtonDrawer';
import { useTranslation } from 'react-i18next';
import GroupsIcon from '@mui/icons-material/Groups';
import SchoolIcon from '@mui/icons-material/School';
import ListClassDrawer from './ListClassDrawer';
import { Drawer, DrawerHeader } from './Style';

export default function MiniDrawer({
  children,
}: {
  children: React.ReactNode;
}) {
  const { classes } = React.useContext(GlobalContext);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <AppBarDrawer handleDrawerOpen={handleDrawerOpen} open={open} />

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          {open && (
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          )}
        </DrawerHeader>

        <Divider />

        <HomeButtonDrawer open={open} />

        <Divider />

        <ListClassDrawer
          classes={classes}
          open={open}
          label={t('teaching')}
          handleDrawerOpen={handleDrawerOpen}
          icon={<GroupsIcon />}
        />

        <Divider />

        <ListClassDrawer
          classes={classes}
          open={open}
          handleDrawerOpen={handleDrawerOpen}
          label={t('enrolled')}
          icon={<SchoolIcon />}
        />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
        <Footer />
      </Box>
    </Box>
  );
}
