import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Stack,
  Container,
} from "@mui/material";
import { Patinent } from "../../types/Patient";
import api from "../../services/api";

const PatientsPage = () => {
  const [patients, setPatients] = useState<Patinent[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const data = await api.get<Patinent[]>("/patients");
      setPatients(data);
    } catch (error) {
      console.error("Failed to fetch patients", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ mb: 4,}}>
      <Typography variant="h4" gutterBottom>
        Patients
      </Typography>

      <Stack spacing={2}>
        {patients.map((patient) => (
          <Card key={patient.id}>
            <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box>
                <Typography variant="h6">
                  {patient.firstName} {patient.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  DOB: {new Date(patient.dob).toLocaleDateString("en-US")}
                </Typography>
              </Box>
              <Button
                variant="contained"
                onClick={() => navigate(`/notes/${patient.id}`)}
                style={{ color: "#fff" }}
              >
                View Notes
              </Button>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Container>
  );
};

export default PatientsPage;
