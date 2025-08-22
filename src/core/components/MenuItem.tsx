import { Box, ListItemIcon, Typography } from "@mui/material";
import type { BoxProps } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export interface MenuItemProps extends BoxProps {
  path?: string;
  icon?: React.ReactElement;
  suffix?: React.ReactNode;
  active?: boolean;
  disableIconSize?: boolean;
}

export const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  suffix,
  children,
  path,
  active: controlledActive,
  onClick,
  disableIconSize = false,
  sx,
  ...rest
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [active, setActive] = React.useState(false);

  const isActive = controlledActive ?? active;

  const handleNavigate = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ): void => {
    if (!event.ctrlKey && !event.metaKey) {
      event.preventDefault();
      if (path) navigate(path);
    }
    onClick?.(event);
  };

  React.useEffect(() => {
    if (path === "/") {
      // For home route, only active when pathname is exactly "/"
      setActive(pathname === "/");
    } else {
      // For other routes, check if pathname starts with the path
      setActive(!!path && pathname.startsWith(path));
    }
  }, [path, pathname]);

  return (
    <Box
      onClick={handleNavigate}
      component="a"
      href={path}
      display="flex"
      alignItems="center"
      height={40}
      sx={{
        cursor: "pointer",
        outline: "none",
        textDecoration: "none",
        paddingX: "10px",
        marginBottom: 0.5,
        borderRadius: 1,
        ...(isActive ? { bgcolor: "bg.dark" } : undefined),
        ":hover": {
          bgcolor: "bg.dark",
        },
        "&:focus": {
          boxShadow: "inset 0px 0px 0px 2px #667085",
        },
        ...sx,
      }}
      {...rest}
    >
      {icon ? (
        <ListItemIcon
          sx={{
            minWidth: "auto",
            marginRight: 2,
            color: isActive ? "primary.main" : "#555E73",
          }}
        >
          {React.cloneElement(icon, {
            ...(!disableIconSize && { size: 20 }),
          })}
        </ListItemIcon>
      ) : null}

      <Typography
        component="span"
        noWrap
        variant="body2"
        fontWeight={isActive ? 600 : 500}
        color={isActive ? "#D0D1D4" : "#AAAFB9"}
        flex={1}
      >
        {children}
      </Typography>

      {suffix ? suffix : null}
    </Box>
  );
};
