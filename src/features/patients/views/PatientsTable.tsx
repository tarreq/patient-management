import { useMemo, useState } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { Box, Button, DialogContent, MenuItem } from "@mui/material";
import { AisTypography } from "../../../core/components/AisTypography";
import { Modal } from "../../../core/components/AisModal";
import { ReportProblem } from "@mui/icons-material";
import supabase from "../../../core/providers/supabase";
import { useNotify } from "../../../core/hooks/useNotify";

export type Patient = {
  id: string;
  createdAt: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
};

interface PatientTableProps {
  data: Patient[];
  isAdmin: boolean;
  isLoading: boolean;
  setPatientId: (id: string) => void;
  setEditPatientModalOpen: (open: boolean) => void;
  refetchPatients: () => void;
}

const PatientsTable: React.FC<PatientTableProps> = ({
  isAdmin,
  data,
  isLoading,
  setPatientId,
  setEditPatientModalOpen,
  refetchPatients,
}) => {
  const { notify } = useNotify();

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [patientIdToDelete, setPatientIdToDelete] = useState<string | null>(
    null,
  );

  const columns = useMemo<MRT_ColumnDef<Patient>[]>(
    () => [
      {
        accessorKey: "firstName",
        header: "First Name",
        size: 150,
      },
      {
        accessorKey: "lastName",
        header: "Last Name",
        size: 150,
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 200,
      },
      {
        accessorKey: "phone",
        header: "Phone",
        size: 150,
      },
      {
        accessorKey: "dob",
        header: "Date of Birth",
        size: 150,
      },
    ],
    [],
  );

  const onEditPatient = (id: string) => {
    setPatientId(id);
    setEditPatientModalOpen(true);
  };

  const handleDeletePatient = (id: string) => {
    setPatientIdToDelete(id);
    setDeleteModalOpen(true);
  };

  const onConfirmDeletePatient = async () => {
    if (patientIdToDelete) {
      try {
        await supabase.from("patients").delete().eq("id", patientIdToDelete);
        setDeleteModalOpen(false);
        setPatientIdToDelete(null);
        refetchPatients();
        notify({
          title: "Success",
          message: "Patient deleted successfully",
          variant: "success",
        });
      } catch (error) {
        notify({
          title: "Error",
          message: "Error deleting patient",
          variant: "error",
        });
      }
    }
  };

  return (
    <>
      <MaterialReactTable
        columns={columns}
        data={data}
        displayColumnDefOptions={{
          "mrt-row-numbers": {
            size: 10,
          },
          "mrt-row-expand": {
            size: 10,
          },
        }}
        enableColumnActions
        enableColumnFilterModes
        enableColumnPinning
        enableRowNumbers
        initialState={{
          density: "comfortable",
          showGlobalFilter: true,
        }}
        muiSearchTextFieldProps={{
          placeholder: "Search All Props",
          sx: { minWidth: "18rem" },
          variant: "outlined",
        }}
        positionGlobalFilter="left"
        rowNumberDisplayMode="static"
        muiTableHeadRowProps={{
          sx: {
            backgroundColor: "bg.main",
          },
        }}
        muiTableBodyRowProps={{
          sx: {
            backgroundColor: "bg.main",
          },
        }}
        muiTablePaperProps={{
          sx: {
            borderRadius: 2,
          },
        }}
        state={{
          isLoading: isLoading,
        }}
        muiSkeletonProps={{
          animation: "pulse",
          height: 28,
        }}
        enableRowActions={isAdmin}
        positionActionsColumn="last"
        renderRowActionMenuItems={({ row }) => [
          <MenuItem key="edit" onClick={() => onEditPatient(row.original.id)}>
            Edit
          </MenuItem>,
          <MenuItem
            key="delete"
            onClick={() => handleDeletePatient(row.original.id)}
          >
            Delete
          </MenuItem>,
        ]}
      />
      <Modal
        size="small"
        title="Delete Patient"
        hideDivider
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
      >
        <DialogContent>
          <Box
            display="flex"
            flexDirection="column"
            gap={1}
            alignItems="center"
            justifyContent="center"
          >
            <ReportProblem fontSize="large" color="inherit" />
            <AisTypography
              variant="body1"
              fontFamily="Roboto"
              fontWeight="regular"
              color="primary"
            >
              Are you sure you want to delete this patient?
            </AisTypography>
          </Box>
          <Box mt={3} display="flex" justifyContent="space-between" gap={1}>
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              onClick={() => setDeleteModalOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "primary.dark",
                },
              }}
              onClick={onConfirmDeletePatient}
            >
              Delete
            </Button>
          </Box>
        </DialogContent>
      </Modal>
    </>
  );
};

export default PatientsTable;
