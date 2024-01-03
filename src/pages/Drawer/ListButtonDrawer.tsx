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
import GradingIcon from '@mui/icons-material/Grading';
import { RouteList } from '../../routes/routes';

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

      {/* My grade review requested */}
      <ListItem disablePadding sx={{ display: 'block' }}>
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
          }}
          onClick={() => navigate(RouteList.gradeReview)}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
            }}
          >
            <GradingIcon />
          </ListItemIcon>
          <ListItemText
            primary={t('gradeReview')}
            sx={{ opacity: open ? 1 : 0 }}
          />
        </ListItemButton>
      </ListItem>
    </List>
  );
}

export default ListButtonDrawer;
