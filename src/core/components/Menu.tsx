import React from "react";
import { Box } from "@mui/material";
import type { BoxProps } from "@mui/material";

interface MenuProps extends BoxProps {
  expanded?: boolean;
}

export const Menu: React.FC<MenuProps> = ({
  children,
  expanded = true,
  sx,
  ...rest
}) => {
  return (
    <nav aria-labelledby="main-navbar">
      <Box
        sx={{
          width: "100%",
          padding: 2,

          ".MuiCollapse-root": {
            display: expanded ? "block" : "none",
          },

          ".MuiListItemIcon-root": {
            position: "relative",
            transition: "left 300ms",
          },
          ".MuiListItemButton-root": {
            "&.active": {
              ...(!expanded ? { bgcolor: "grey.700" } : undefined),
              ".MuiListItemIcon-root": { color: "grey.300" },
              ".MuiTypography-root": { color: "grey.200", fontWeight: 600 },
            },

            ".MuiTypography-root, .MuiTypography-root + svg": {
              transition: "opacity 300ms",
              opacity: expanded ? 1 : 0,
            },
          },
          ...sx,
        }}
        {...rest}
      >
        {children}
      </Box>
    </nav>
  );
};
