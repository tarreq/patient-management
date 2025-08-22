import {
  Alert,
  Box,
  Button,
  Paper,
  Snackbar,
  TextField,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { loginGradient, logo, tree2 } from "../../../assets/images";
import { AisTypography } from "../../../core/components/AisTypography";
import supabase from "../../../core/providers/supabase";

type FormValues = {
  email: string;
  password: string;
};

const Register = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const formik = useFormik<FormValues>({
    enableReinitialize: true,
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .matches(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Please enter a valid email address.",
        )
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      const { error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });
      if (error) {
        console.log(error);
      } else {
        navigate("/login");
        setSnackbarOpen(true);
      }
      setIsLoading(false);
    },
  });

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
        "& > *:first-of-type": {
          display: { xs: "none", md: "flex" },
        },
        gap: 0,
        height: "100vh",
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
      }}
    >
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Sign up successful, you may now login!
        </Alert>
      </Snackbar>
      {/* Left Side - gradient & Illustration */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "end",
          height: "100%",
          textAlign: "center",
          background: `linear-gradient(180deg, #ffffff 0%, #f1f3f4 50%, #e8eaed 100%)`,
          borderRadius: { xs: "16px 16px 0 0", md: "16px 0 0 16px" },
        }}
      >
        <Box position="absolute" top={30} left={30}>
          <img src={logo} width={80} height={40} />
        </Box>
        <Box position="absolute" bottom={0} left={0}>
          <img src={tree2} width="250px" style={{ objectFit: "cover" }} />
        </Box>
        <Box>
          <img
            src={loginGradient}
            alt="logo"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </Box>
      </Box>

      {/* Right Side - Register Form */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          background: "white",
          borderRadius: { xs: "0 0 16px 16px", md: "0 16px 16px 0" },
          p: 4,
          borderLeft: {
            xs: "none",
            md: `1px solid ${theme.palette.border.light}`,
          },
          borderTop: {
            xs: `1px solid ${theme.palette.border.light}`,
            md: "none",
          },
        }}
      >
        <Paper
          elevation={0}
          sx={{
            marginTop: 12,
            p: 6,
            borderRadius: 4,
            background: "transparent",
            border: "none",
            maxWidth: 480,
            width: "100%",
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: 4, color: "primary.main" }}>
            <AisTypography
              variant="body1"
              fontFamily="Roboto"
              fontWeight="bold"
            >
              Create an account
            </AisTypography>
          </Box>

          {/* Register Form */}
          <Box>
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                size="small"
                name="email"
                label="Email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                error={Boolean(formik.touched.email && formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    backgroundColor: theme.palette.background.paper,
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.primary.main,
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.primary.main,
                      borderWidth: 2,
                    },
                  },
                }}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                size="small"
                name="password"
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(
                  formik.touched.password && formik.errors.password,
                )}
                helperText={formik.touched.password && formik.errors.password}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    backgroundColor: theme.palette.background.paper,
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.primary.main,
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.primary.main,
                      borderWidth: 2,
                    },
                  },
                }}
              />
            </Box>

            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "primary.dark",
                },
              }}
              disabled={isLoading}
              loading={isLoading}
              onClick={() => formik.handleSubmit()}
            >
              Sign up
            </Button>

            <Box sx={{ textAlign: "center", mt: 4 }}>
              <Link to="/login">
                <AisTypography
                  variant="body1"
                  fontWeight="bold"
                  fontFamily="Roboto"
                >
                  Have an account? Log in
                </AisTypography>
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Register;
