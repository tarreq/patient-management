import { Box, Button, Typography } from "@mui/material";
import PatientsTable, { type Patient } from "./PatientsTable";
import { useState, useEffect } from "react";
import AddPatientModal from "./AddPatientModal";
import supabase from "../../../core/providers/supabase";
import { useNotify } from "../../../core/hooks/useNotify";

const Patients = () => {
  const { notify } = useNotify();

  const [addPatientModalOpen, setAddPatientModalOpen] = useState(false);
  const [editPatientModalOpen, setEditPatientModalOpen] = useState(false);
  const [patientId, setPatientId] = useState<string | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [count, setCount] = useState(0);
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const [isLoading, setIsLoading] = useState(true);

  const fetchPatients = async () => {
    // TODO: All API services (query/mutation) should be in its own service file
    // We do this here for simplicty and depending on what backend is used.
    setIsLoading(true);
    const { data, error, count } = await supabase
      .from("patients")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false });
    if (error) {
      console.error("Error fetching data:", error);
    } else {
      setPatients(data || []);
      setCount(count || 0);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const onAddPatient = (success: boolean, operation: "add" | "update") => {
    if (success) {
      fetchPatients();
      notify({
        title: "Success",
        message:
          operation === "add"
            ? "Patient created successfully"
            : "Patient updated successfully",
        variant: "success",
      });
    } else {
      notify({
        title: "Error",
        message:
          operation === "add"
            ? "Error creating patient"
            : "Error updating patient",
        variant: "error",
      });
    }
    setAddPatientModalOpen(false);
  };

  return (
    <Box
      height="100%"
      width="100%"
      bgcolor="bg.main"
      py={4}
      px={4}
      sx={{ flex: 1, overflowY: "overlay" }}
      display="flex"
      flexDirection="column"
    >
      <Box
        mb={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="subtitle2">{`Patients (${count})`}</Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{
            textTransform: "none",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          }}
          onClick={() => setAddPatientModalOpen(true)}
          disabled={!isAdmin}
        >
          Add Patient
        </Button>
      </Box>
      <PatientsTable
        isAdmin={isAdmin}
        data={patients}
        isLoading={isLoading}
        setPatientId={setPatientId}
        setEditPatientModalOpen={setEditPatientModalOpen}
        refetchPatients={fetchPatients}
      />
      <AddPatientModal
        key="1"
        open={addPatientModalOpen}
        onClose={() => setAddPatientModalOpen(false)}
        onAddPatient={onAddPatient}
      />
      <AddPatientModal
        key="2"
        open={editPatientModalOpen}
        onClose={() => setEditPatientModalOpen(false)}
        onAddPatient={onAddPatient}
        patientId={patientId}
      />
    </Box>
  );
};

export default Patients;
