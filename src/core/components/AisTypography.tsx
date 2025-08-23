import React from "react";
import { Typography, type TypographyProps } from "@mui/material";

type FontWeight = "regular" | "medium" | "semiBold" | "bold" | "black";

export const fontWeightMap: Record<FontWeight, number> = {
  regular: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
  black: 900,
};

export interface AisTypographyProps
  extends Omit<TypographyProps, "color" | "fontFamily"> {
  fontWeight?: FontWeight;
  fontFamily?: "Roboto";
  color?: string;
  whiteSpace?: "normal" | "nowrap" | "pre" | "pre-line" | "pre-wrap";
}

export const AisTypography: React.FC<AisTypographyProps> = ({
  children,
  fontWeight = "regular",
  color = "default",
  fontFamily = "Inter Tight",
  whiteSpace = "pre-line",
  ...rest
}) => {
  return (
    <Typography
      color={`tie.text.${color}`}
      fontWeight={fontWeightMap[fontWeight]}
      fontFamily={fontFamily}
      whiteSpace={whiteSpace}
      {...rest}
    >
      {children}
    </Typography>
  );
};
