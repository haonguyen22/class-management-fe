import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { useTranslation } from 'react-i18next';

function HomeButtonDrawer({ open }: { open: boolean }) {
  const navigate = useNavigate();
  const {t} = useTranslation();
  return (
    <List>
      <ListItem disablePadding sx={{ display: 'block' }}>
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
          }}
          onClick={() => navigate('/')}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
            }}
          >
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary={t('home')} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </ListItem>
    </List>
  );
}

export default HomeButtonDrawer;
