import { Box } from "@mui/material";

const Patients = () => {
  return (
    <Box
      height="100%"
      width="100%"
      bgcolor="#F1F4F7"
      p={2}
      sx={{ flex: 1, overflowY: "overlay" }}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      Patients
    </Box>
  );
};

export default Patients;
