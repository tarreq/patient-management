import { Box, Drawer } from "@mui/material";
import React from "react";
import { Menu } from "../Menu";
import { MenuItem } from "../MenuItem";
import { GroupOutlined, HomeOutlined, Logout } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { logo } from "../../../assets/images";
import supabase from "../../providers/supabase";

const drawerWidth = 280;

const transitionDuration = 300;

export const Sidebar: React.FC = ({}) => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        position: "relative",
        transition: `width ${transitionDuration}ms`,
        width: drawerWidth,
        flexShrink: 0,
        zIndex: 999,
        "& >.MuiDrawer-paper": {
          overflow: "initial",
          position: "relative",
          transition: `width ${transitionDuration}ms`,
          width: drawerWidth,
          color: "typography.subtle",
          bgcolor: "grey.900",
          border: "none",
          boxShadow: "32px 0 30px rgba(52, 64, 84, 0.18)",

          "&:hover": {
            ".collapse-btn": {
              opacity: 1,
            },
          },
        },
      }}
      data-testid="sidebar"
    >
      <Box
        height="100vh"
        display="flex"
        flexDirection="column"
        sx={{ overflowX: "hidden" }}
      >
        <Box
          position="relative"
          paddingLeft={2}
          paddingRight={3}
          paddingTop={4}
          paddingBottom={0.2}
          zIndex={2}
          display="flex"
          justifyContent="start"
          alignItems="center"
          sx={{ transition: `padding ${transitionDuration}ms` }}
        >
          <Link to="/">
            <img src={logo} width={80} height={40} />
          </Link>

          <Box
            component="div"
            height={32}
            width="calc(100% - 20px)"
            position="absolute"
            bottom={-30}
            left={0}
            sx={{
              transform: "rotate(-180deg)",
              background:
                "linear-gradient(180deg, rgba(16, 24, 40, 0) 20.83%, #101828 100%)",
            }}
          />
        </Box>

        <Box
          flexGrow={1}
          marginRight={0.5}
          sx={{
            overflowX: "hidden",
            overflowY: "auto",
            "&::-webkit-scrollbar-thumb": {
              bgcolor: "transparent",
              borderRadius: 0.5,
            },
            "&:hover": {
              "&::-webkit-scrollbar-thumb": {
                bgcolor: "grey.700",
              },
            },
            "&::-webkit-scrollbar": {
              width: "4px",
            },
          }}
        >
          <Box
            sx={{ opacity: 0.8, height: "100%" }}
            pr={0.5}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Menu>
              <MenuItem path={`/`} icon={<HomeOutlined />}>
                Home
              </MenuItem>
              <MenuItem path={`/patients`} icon={<GroupOutlined />}>
                Patients
              </MenuItem>
            </Menu>
            <Menu>
              <MenuItem
                path={`/logout`}
                icon={<Logout sx={{ transform: "rotateY(180deg)" }} />}
                onClick={handleSignOut}
              >
                Sign Out
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};
