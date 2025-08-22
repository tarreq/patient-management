import {
  Box,
  TextField,
  type TextFieldProps,
  formHelperTextClasses,
  outlinedInputClasses,
  useTheme,
} from "@mui/material";
import React from "react";
import { AisTypography, type AisTypographyProps } from "../AisTypography";

export type AisTextFieldProps = Omit<TextFieldProps, "label" | "size"> & {
  label?: string;
  optional?: string;
  clearable?: boolean;
  prefixText?: string;
  suffixText?: string;
  size?: "medium" | "large";
  labelInverse?: boolean;
  errorHelperText?: string;
  onClear?: () => void;
};

export const AisTextField: React.FC<AisTextFieldProps> = ({
  value,
  label,
  optional,
  sx,
  size = "medium",
  error,
  focused,
  clearable,
  prefixText,
  suffixText,
  labelInverse = false,
  InputProps,
  fullWidth,
  errorHelperText,
  onFocus,
  onBlur,
  onChange,
  onClear,
  inputProps,
  ...rest
}) => {
  const theme = useTheme();

  const [, setFocusedValue] = React.useState(focused);

  const LABEL_COLOR: Record<
    "inverse" | "default",
    { color: AisTypographyProps["color"]; helperIconColor: string }
  > = {
    inverse: {
      color: "primary",
      helperIconColor: theme.palette.text.primary,
    },
    default: {
      color: "secondary",
      helperIconColor: theme.palette.text.secondary,
    },
  };

  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleOnFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
  ) => {
    onFocus?.(e);
    setFocusedValue(true);
  };

  const handleOnBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
  ) => {
    onBlur?.(e);
    setFocusedValue(false);
  };

  const { startAdornment, endAdornment, ...restInputProps } = InputProps || {};

  return (
    <Box sx={sx} width={fullWidth ? "100%" : "auto"}>
      {(label || optional) && (
        <Box mb={0.5} display="flex" alignItems="center" gap={0.5}>
          <Box flex={1} display="flex" alignItems="center" gap={0.5}>
            {label && (
              <AisTypography
                variant="body2"
                color={LABEL_COLOR[labelInverse ? "inverse" : "default"].color}
                fontWeight="bold"
                fontFamily="Roboto"
              >
                {label}
              </AisTypography>
            )}
          </Box>

          {optional && (
            <AisTypography
              variant="overline"
              color={LABEL_COLOR[labelInverse ? "inverse" : "default"].color}
              fontWeight="regular"
            >
              {optional}
            </AisTypography>
          )}
        </Box>
      )}

      <TextField
        fullWidth={fullWidth}
        value={value}
        error={error}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        onChange={onChange}
        inputProps={{
          ref: inputRef,
          ...inputProps,
        }}
        InputProps={{
          startAdornment: (
            <>
              {prefixText && (
                <Box
                  display="flex"
                  alignItems="center"
                  gap={1}
                  mr={1}
                  color="inherit"
                >
                  {prefixText && (
                    <AisTypography
                      variant="body1"
                      fontWeight="regular"
                      color="secondary"
                    >
                      {prefixText}
                    </AisTypography>
                  )}
                </Box>
              )}

              {startAdornment}
            </>
          ),

          ...restInputProps,
        }}
        sx={{
          [`.${outlinedInputClasses.root}`]: {
            borderRadius: "8px",
            boxShadow: "none",
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            [`.${outlinedInputClasses.input}`]: {
              paddingTop: 0,
              paddingBottom: 0,
              height: size === "medium" ? 40 : 48,
            },
            [`.${outlinedInputClasses.notchedOutline}`]: {
              border: `1px solid ${theme.palette.border.light}`,
            },

            "input:-webkit-autofill": {
              boxShadow: "0 0 0px 100px white inset !important",
            },
            [`&.${outlinedInputClasses.focused}`]: {
              boxShadow: "none",
            },

            [`&.${outlinedInputClasses.error}`]: {
              [`.${outlinedInputClasses.notchedOutline}`]: {
                border: `1px solid ${theme.palette.text.primary}`,
              },
            },
            [`&.${outlinedInputClasses.disabled}`]: {
              color: theme.palette.text.secondary,
              backgroundColor: theme.palette.bg.main,
              [`.${outlinedInputClasses.notchedOutline}`]: {
                border: `1px solid ${theme.palette.bg.dark}`,
              },
            },
          },
          [`& .${formHelperTextClasses.root}.${formHelperTextClasses.error}`]: {
            color: theme.palette.error.main,
          },
        }}
        {...rest}
      />
    </Box>
  );
};
