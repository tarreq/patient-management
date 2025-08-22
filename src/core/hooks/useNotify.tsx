import { Box, IconButton, Typography } from "@mui/material";
import { useSnackbar, type VariantType } from "notistack";
import React from "react";
import { v4 as uuidv4 } from "uuid";

import {
  ReportProblem,
  CheckCircle,
  Close,
  ArrowCircleUp,
} from "@mui/icons-material";
export interface NotifyOptions {
  key?: string;
  title?: string;
  icon?: React.ReactNode;
  message?: string;
  variant: VariantType;
}
interface NotificationResult {
  notify: (options: NotifyOptions) => void;
  closeNotification: (key: string) => void;
}

interface NotificationIconProps {
  variant: VariantType;
  icon?: React.ReactNode;
}

interface NotificationIconVariant {
  bgcolor: string;
  borderColor: string;
  color: string;
  icon: React.ReactNode;
}

export const NotificationIcon: React.FC<NotificationIconProps> = ({
  variant,
  icon,
}) => {
  const ICONS: Record<VariantType, NotificationIconVariant> = {
    default: {
      bgcolor: "bg.main",
      borderColor: "bg.main",
      color: "",
      icon: <ReportProblem fontSize="large" />,
    },
    success: {
      bgcolor: "bg.main",
      borderColor: "success.dark",
      color: "success.light",
      icon: <CheckCircle fontSize="large" />,
    },
    info: {
      bgcolor: "info.main",
      borderColor: "info.main",
      color: "",
      icon: <ReportProblem fontSize="large" />,
    },
    warning: {
      bgcolor: "warning.main",
      borderColor: "warning.main",
      color: "typography.warning",
      icon: <ArrowCircleUp fontSize="large" />,
    },

    error: {
      bgcolor: "bg.main",
      borderColor: "error.main",
      color: "error.main",
      icon: <ReportProblem fontSize="large" />,
    },
  };

  return (
    <Box
      borderRadius="50%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      width={40}
      height={40}
      color={ICONS[variant].color}
      bgcolor={ICONS[variant].bgcolor}
    >
      {icon ?? ICONS[variant].icon}
    </Box>
  );
};

export const useNotify = (): NotificationResult => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleClose = React.useCallback(
    (key: string) => closeSnackbar(key),
    [closeSnackbar],
  );

  const notify = React.useCallback(
    (options: NotifyOptions): void => {
      const { title, message, variant, key = uuidv4(), icon } = options;

      enqueueSnackbar("", {
        key,
        preventDuplicate: true,
        content: (
          <Box
            display="flex"
            borderRadius={1}
            maxWidth={400}
            minWidth={400}
            sx={{
              bgcolor: "background.paper",
              boxShadow: 4,
              border: "1px solid",
              borderColor: "grey.300",
              padding: "8px 12px 16px 8px",
            }}
            alignItems="center"
          >
            <Box mr={2}>
              <NotificationIcon variant={variant} icon={icon} />
            </Box>
            <Box flex={1}>
              {title ? (
                <Typography
                  variant="body2"
                  fontWeight={500}
                  color="text.primary"
                  data-testid="notification-title"
                >
                  {title}
                </Typography>
              ) : null}

              {message ? (
                <Typography
                  variant="body2"
                  fontWeight={400}
                  color="text.secondary"
                  marginTop={0.5}
                  data-testid="notification-message"
                >
                  {message}
                </Typography>
              ) : null}
            </Box>
            <Box ml={2}>
              <IconButton
                size="large"
                sx={{ color: "grey.500" }}
                onClick={() => handleClose(key)}
                data-testid="close-notification-button"
              >
                <Close fontSize="inherit" />
              </IconButton>
            </Box>
          </Box>
        ),
      });
    },
    [enqueueSnackbar, handleClose],
  );

  return { notify, closeNotification: handleClose };
};
