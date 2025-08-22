import React from "react";
import {
  Box,
  ButtonBase,
  Dialog,
  Divider,
  Typography,
  useTheme,
  type BoxProps,
  type DialogProps,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

export interface ModalProps extends Omit<DialogProps, "title"> {
  type?: "default" | "highlighted";
  title?: string;
  subTitle?: string;
  iconBackgroundColor?: string;
  leadingIcon?: React.ReactNode;
  trailingAction?: React.ReactNode;
  icon?: React.ReactNode;
  size?: "small" | "medium" | "large" | "xlarge" | "fullscreen";
  /**
   * Number of steps to be displayed in the header
   */
  steps?: number;
  /**
   * Current step to be highlighted
   */
  currentStep?: number;
  hideDivider?: boolean;
  /**
   * custom node to be displayed between title container and close button/trailing action
   */
  customHeaderContent?: React.ReactNode;
  /**
   * Additional props to be passed to the title container
   */
  titleContainerProps?: BoxProps;
  onClose: () => void;
  onGoBack?: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  type = "default",
  children,
  leadingIcon,
  trailingAction,
  iconBackgroundColor,
  icon,
  title,
  subTitle,
  size = "medium",
  steps,
  currentStep,
  hideDivider,
  customHeaderContent,
  titleContainerProps,
  onClose,
  onGoBack,
  ...rest
}) => {
  const theme = useTheme();

  const dialogWidth = () => {
    switch (size) {
      case "small":
        return 400;
      case "medium":
        return 600;
      case "large":
        return 800;
      case "xlarge":
        return 960;
      case "fullscreen":
        return "100%";
      default:
        return 400;
    }
  };

  const dialogRadius = () => {
    switch (size) {
      case "small":
        return "16px";
      case "medium":
        return "18px";
      case "large":
        return "28px";
      default:
        return "16px";
    }
  };

  return (
    <Dialog
      PaperProps={{
        sx: {
          width: dialogWidth(),
          maxWidth: dialogWidth(),
          height: size === "fullscreen" ? "100%" : "auto",
          borderRadius: dialogRadius(),
          p: 0,
        },
      }}
      onClose={onClose}
      {...rest}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        px={3}
        pt={3}
        pb={2}
        sx={{
          backgroundColor: "primary.main",
        }}
      >
        <Box flex={1}>
          {leadingIcon && (
            <Box
              width={48}
              height={48}
              borderRadius={24}
              display="flex"
              alignItems="center"
              justifyContent="center"
              mb={2}
              sx={{
                backgroundColor: iconBackgroundColor
                  ? iconBackgroundColor
                  : theme.palette.bg.main,
              }}
            >
              {leadingIcon}
            </Box>
          )}

          {title && (
            <Box display="flex" gap={1} alignItems="center">
              <Box
                display="flex"
                gap={1}
                alignItems="center"
                position="relative"
                zIndex={2}
                {...titleContainerProps}
              >
                {icon}

                <Typography
                  align="left"
                  variant="body1"
                  fontWeight="bold"
                  color="background.paper"
                  className="tie-modal-title"
                >
                  {title}
                </Typography>
              </Box>

              {customHeaderContent ? (
                <Box flex={1} mr={2}>
                  {customHeaderContent}
                </Box>
              ) : (
                <Box
                  position="absolute"
                  right={0}
                  left={0}
                  display="flex"
                  flex={1}
                  justifyContent="center"
                  alignItems="center"
                  alignSelf="center"
                  minWidth={100}
                ></Box>
              )}
            </Box>
          )}

          {subTitle && (
            <Typography
              sx={{ mt: 1 }}
              color="background.paper"
              align="left"
              variant="body2"
              fontWeight="regular"
              className="tie-modal-sub-title"
            >
              {subTitle}
            </Typography>
          )}
        </Box>

        <Box display="flex" alignItems="center" gap={2}>
          {trailingAction}

          <ButtonBase
            onClick={onClose}
            sx={{ cursor: "pointer" }}
            className="tie-modal-close-button"
          >
            <CloseIcon color="secondary" />
          </ButtonBase>
        </Box>
      </Box>

      {children && (
        <>
          {!hideDivider && <Divider />}
          {children}
        </>
      )}
    </Dialog>
  );
};
