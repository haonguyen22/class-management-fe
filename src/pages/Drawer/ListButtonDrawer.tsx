import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { RouteList } from '../../routes/routes';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ClassIcon from '@mui/icons-material/Class';

function ListButtonDrawer({ open }: { open: boolean }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <List>
      {/* Home button */}
      <ListItem disablePadding sx={{ display: 'block' }}>
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
          }}
          onClick={() => navigate(RouteList.adminUsers)}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
            }}
          >
            <AdminPanelSettingsIcon />
          </ListItemIcon>
          <ListItemText
            primary={t('userManagement')}
            sx={{ opacity: open ? 1 : 0 }}
          />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding sx={{ display: 'block' }}>
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
          }}
          onClick={() => navigate(RouteList.adminClasses)}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
            }}
          >
            <ClassIcon />
          </ListItemIcon>
          <ListItemText
            primary={t('classManagement')}
            sx={{ opacity: open ? 1 : 0 }}
          />
        </ListItemButton>
      </ListItem>
    </List>
  );
}

export default ListButtonDrawer;
