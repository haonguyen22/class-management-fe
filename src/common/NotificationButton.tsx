import * as React from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Typography from '@mui/material/Typography';
import {
  Badge,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
} from '@mui/material';
import { GlobalContext } from '../context/GlobalContext';
import { NotificationType } from '../enums/Notification';
import { useNavigate } from 'react-router-dom';

const NotificationButton = () => {
  const { notifications, isFetchingNotifications } =
    React.useContext(GlobalContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [invisible, setInvisible] = React.useState(true);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setInvisible(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    notifications.length > 0 && setInvisible(false);
  }, [notifications]);

  return (
    <div>
      <div
        className="text-gray-800 dark:text-white  font-medium rounded-lg text-sm mr-2 ml-3 dark:hover:text-gray-300 focus:outline-none cursor-pointer"
        onClick={handleClick}
      >
        <Badge
          color="secondary"
          variant="dot"
          invisible={invisible || isFetchingNotifications}
        >
          <NotificationsIcon />
        </Badge>
      </div>
      {notifications.length > 0 && (
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          sx={{
            height: '50px',
            padding: '0px',
          }}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <List
            sx={{
              width: '100%',
              maxWidth: 360,
              maxHeight: '300px',
              padding: '0px',
              minWidth: 360,
              overflow: 'auto',
              bgcolor: 'background.paper',
              justifyContent: 'center',
            }}
          >
            {isFetchingNotifications ? (
              <CircularProgress
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                }}
              />
            ) : (
              <>
                {notifications.map((notification) => {
                  const type = NotificationType.convert(
                    notification.notificationType,
                  );
                  return (
                    <div key={notification.id}>
                      <ListItem
                        alignItems="flex-start"
                        onClick={() => {
                          navigate(
                            notification.link.replace(
                              'https://class-management-fe.vercel.app',
                              '',
                            ),
                          );
                        }}
                        sx={{
                          ':hover': {
                            backgroundColor: 'whitesmoke',
                            cursor: 'pointer',
                          },
                        }}
                      >
                        <ListItemAvatar>{type?.icon}</ListItemAvatar>
                        <ListItemText
                          primary={
                            <React.Fragment>
                              <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                {notification.title}
                              </Typography>
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </div>
                  );
                })}

              </>
            )}
          </List>
        </Menu>
      )}
    </div>
  );
};

export default NotificationButton;
