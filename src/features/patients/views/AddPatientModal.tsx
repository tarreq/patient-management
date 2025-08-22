import { Box, Button, CircularProgress, DialogContent } from "@mui/material";
import { Modal } from "../../../core/components/AisModal";
import { AisTextField } from "../../../core/components/layout/AisTextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useFormik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import supabase from "../../../core/providers/supabase";
import { useEffect, useState } from "react";
import type { Patient } from "./PatientsTable";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string | null;
};

interface AddPatientModalProps {
  open: boolean;
  onClose: () => void;
  onAddPatient: (success: boolean, operation: "add" | "update") => void;
  patientId?: string | null;
}

const AddPatientModal = ({
  open,
  onClose,
  onAddPatient,
  patientId,
}: AddPatientModalProps) => {
  const [patientData, setPatientData] = useState<Patient | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // fetch patient data if patientId is provided
  useEffect(() => {
    if (patientId) {
      setIsLoading(true);
      const fetchPatient = async () => {
        const { data, error } = await supabase
          .from("patients")
          .select("*")
          .eq("id", patientId)
          .single();
        if (error) {
          console.error("Error fetching patient:", error.message);
          setIsLoading(false);
        } else {
          setPatientData(data);
          setIsLoading(false);
        }
      };
      fetchPatient();
    }
  }, [patientId]);

  const formik = useFormik<FormValues>({
    enableReinitialize: true,
    validateOnMount: true,
    initialValues: {
      firstName: patientData?.firstName || "",
      lastName: patientData?.lastName || "",
      email: patientData?.email || "",
      phone: patientData?.phone || "",
      dob: patientData?.dob || null,
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(2, "First name must be at least 2 characters")
        .required("First name is required"),
      lastName: Yup.string()
        .min(2, "Last name must be at least 2 characters")
        .required("Last name is required"),
      email: Yup.string()
        .matches(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Please enter a valid email address.",
        )
        .required("Email is required"),
      phone: Yup.string()
        .matches(/^\+?[\d\s\-\(\)]+$/, "Please enter a valid phone number")
        .required("Phone number is required"),
      dob: Yup.date()
        .max(new Date(), "Date of birth cannot be in the future")
        .nullable(),
    }),
    onSubmit: async (values) => {
      if (patientId) {
        // update patient
        try {
          await supabase
            .from("patients")
            .update({
              firstName: values.firstName,
              lastName: values.lastName,
              email: values.email,
              phone: values.phone,
              ...(values.dob && {
                dob: dayjs(values.dob).format("YYYY-MM-DD"),
              }),
            })
            .eq("id", patientId);
          onClose();
          onAddPatient(true, "update");
        } catch (error) {
          onAddPatient(false, "update");
        }
      } else {
        // add patient
        try {
          await supabase.from("patients").insert({
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            phone: values.phone,
            ...(values.dob && { dob: dayjs(values.dob).format("YYYY-MM-DD") }),
          });

          onClose();
          onAddPatient(true, "add");
          // Reset form
          formik.resetForm();
        } catch (error) {
          onAddPatient(false, "add");
        }
      }
    },
  });

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={patientId ? "Edit Patient" : "Add Patient"}
    >
      <DialogContent
        sx={{
          minHeight: "292px",
          p: 3,
          backgroundColor: "bg.main",
        }}
      >
        {isLoading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <CircularProgress />
          </Box>
        ) : (
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            display="flex"
            flexDirection="column"
          >
            {/* input fields here */}
            <Box display="flex" flexDirection="column" gap={1}>
              <Box display="flex" flexDirection="row" gap={1}>
                <AisTextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={formik.values.firstName}
                  error={Boolean(
                    formik.touched.firstName && formik.errors.firstName,
                  )}
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  inputProps={{
                    "data-testid": "first-name-input",
                  }}
                />
                <AisTextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={formik.values.lastName}
                  error={Boolean(
                    formik.touched.lastName && formik.errors.lastName,
                  )}
                  helperText={formik.touched.lastName && formik.errors.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  inputProps={{
                    "data-testid": "last-name-input",
                  }}
                />
              </Box>
              <Box display="flex" flexDirection="row" gap={1}>
                <AisTextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formik.values.email}
                  error={Boolean(formik.touched.email && formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  inputProps={{
                    "data-testid": "email-input",
                  }}
                />
                <AisTextField
                  fullWidth
                  label="Phone number"
                  name="phone"
                  value={formik.values.phone}
                  error={Boolean(formik.touched.phone && formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  inputProps={{
                    "data-testid": "phone-input",
                  }}
                />
              </Box>
              <Box display="flex" flexDirection="row" gap={1}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      label="Date of birth"
                      value={
                        formik.values.dob ? dayjs(formik.values.dob) : null
                      }
                      onChange={(value) => {
                        formik.setFieldValue(
                          "dob",
                          value ? value.toISOString() : null,
                        );
                      }}
                      slotProps={{
                        textField: {
                          size: "small",
                          error: Boolean(
                            formik.touched.dob && formik.errors.dob,
                          ),
                          helperText: formik.touched.dob && formik.errors.dob,
                          onBlur: () => formik.setFieldTouched("dob", true),
                        },
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Box>
            </Box>

            {/* actions here  */}
            <Box
              display="flex"
              flexDirection="row"
              gap={1}
              mt={2}
              justifyContent="end"
            >
              <Button
                variant="outlined"
                color="primary"
                onClick={handleClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!formik.isValid || formik.isSubmitting || isLoading}
                sx={{
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                  },
                }}
              >
                SAVE
              </Button>
            </Box>
          </Box>
        )}
      </DialogContent>
    </Modal>
  );
};

export default AddPatientModal;
