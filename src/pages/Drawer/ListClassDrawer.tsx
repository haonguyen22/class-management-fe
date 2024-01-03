import {
  Accordion,
  AccordionDetails,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { IClass } from '../../models/IClass';
import { avatarDefault } from '../../constants/globalConst';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

function ListClassDrawer({
  classes,
  open,
  label,
  icon,
  handleDrawerOpen,
}: {
  classes: IClass[];
  open: boolean;
  label: string;
  icon: React.ReactNode;
  handleDrawerOpen: () => void;
}) {
  const navigate = useNavigate();
  const [isOpenAccordion, setIsOpenAccordion] = useState(false);

  return (
    <Accordion
      expanded={open && isOpenAccordion}
      onChange={() => setIsOpenAccordion(!isOpenAccordion)}
      sx={{
        boxShadow: 'none',
        backgroundColor: 'transparent',
        paddingY: 1,
      }}
      disableGutters
    >
      <ListItem disablePadding sx={{ display: 'block' }}>
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
          }}
          onClick={() => {
            if (!open) {
              handleDrawerOpen();
              setIsOpenAccordion(true);
            } else {
              setIsOpenAccordion(!isOpenAccordion);
            }
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
              backgroundColor: 'transparent',
            }}
          >
            {icon}
          </ListItemIcon>
          <ListItemText primary={label} sx={{ opacity: open ? 1 : 0 }} />
          {open && (!isOpenAccordion ? <ExpandLess /> : <ExpandMore />)}
        </ListItemButton>
      </ListItem>
      {open && (
        <AccordionDetails>
          <List>
            {classes.map((item: IClass) => (
              <ListItem
                onClick={() => navigate(`/class/${item.id}/detail`)}
                key={item.id}
                disablePadding
                sx={{ display: 'block' }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <img
                      src={item?.owner?.avatar || avatarDefault}
                      className="rounded-full w-[32px] h-[32px]"
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.name}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      )}
    </Accordion>
  );
}

export default ListClassDrawer;
