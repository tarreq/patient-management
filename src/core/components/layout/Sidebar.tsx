import { Box, Drawer } from "@mui/material";
import React, { useRef } from "react";
import theme from "../../theme/theme";
import { Menu } from "../Menu";
import { MenuItem } from "../MenuItem";
import { GroupOutlined, HomeOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { logo } from "../../../assets/images";

const drawerWidth = 280;
const collapsedWidth = 80;
const transitionDuration = 300;

export const Sidebar: React.FC = ({}) => {
  const timer = React.useRef<number | undefined>(undefined);

  const [expanded, setExpanded] = React.useState(false);
  const [scrollPosition, setScrollPosition] = React.useState<number>(0);

  const collapseButtonRef = useRef<HTMLButtonElement | null>(null);
  const brandSidebarRef = useRef<HTMLDivElement | null>(null);
  const notificationDrawerRef = useRef<HTMLDivElement | null>(null);

  const scrollableBoxRef = useRef<HTMLDivElement | null>(null);

  //   const handleMouseEnter = (
  //     event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  //   ): void => {
  //     const target = event.target as EventTarget & HTMLDivElement;
  //     clearTimeout(timer.current);

  //     if (
  //       collapsed &&
  //       !target.isEqualNode(collapseButtonRef?.current) &&
  //       !brandSidebarRef.current?.contains(event.target as Node) &&
  //       !notificationDrawerRef.current?.contains(event.target as Node)
  //     )
  //       timer.current = setTimeout(() => {
  //         setExpanded(true);
  //       }, 300) as unknown as number;
  //   };

  //   const handleMouseLeave = (): void => {
  //     clearTimeout(timer.current);
  //     if (collapsed) setExpanded(false);
  //   };

  const handleScroll = (): void => {
    if (expanded) setScrollPosition(scrollableBoxRef.current?.scrollTop ?? 0);
  };

  //   React.useEffect(() => {
  //     setExpanded(!collapsed);
  //   }, [collapsed]);

  const handleScrollToLatestPosition = (): void => {
    scrollableBoxRef.current?.scrollTo({ top: scrollPosition });
  };

  React.useEffect(() => {
    if (expanded) handleScrollToLatestPosition();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expanded]);

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
          //   bgcolor: theme.palette.grey[900],
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
      //   PaperProps={{
      //     onMouseEnter: handleMouseEnter,
      //     onMouseLeave: handleMouseLeave,
      //   }}
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
            {/* <ClubLogo color="typography.tertiary" height={26} /> */}
            <img src={logo} width={80} height={40} />
          </Link>

          {/* <Link to="/">
            <JKTImage
              src={getImageUrl(brandData?.brand?.logo?.id)}
              width={40}
              height={40}
              sx={{
                marginLeft: "auto",
              }}
            />
          </Link> */}
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
          ref={scrollableBoxRef}
          onScroll={handleScroll}
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
          <Box sx={{ opacity: 0.8 }} pr={0.5}>
            <Menu expanded={expanded}>
              <MenuItem path={`/`} icon={<HomeOutlined />}>
                Home
              </MenuItem>
              <MenuItem path={`/patients`} icon={<GroupOutlined />}>
                Patients
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};
