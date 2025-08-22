import React from "react";
import { Typography, type TypographyProps } from "@mui/material";
import type theme from "../theme/theme";
// import { lightTheme } from "../../theme/lightTheme";

type FontWeight = "regular" | "medium" | "semiBold" | "bold" | "black";

export const fontWeightMap: Record<FontWeight, number> = {
  regular: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
  black: 900,
};

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

export interface AisTypographyProps
  extends Omit<TypographyProps, "color" | "fontFamily"> {
  fontWeight?: FontWeight;
  //   fontFamily?: "Inter Tight" | "gustavo" | "Hello America";
  fontFamily?: "Roboto";
  //   color?: NestedKeyOf<typeof lightTheme.text>;
  color?: NestedKeyOf<typeof theme.palette.text>;
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
