import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Note } from "../../types/Note";
import { Patinent } from "../../types/Patient";
import UploadNoteModal from "./components/UploadNoteModal";
import api from "../../services/api";

const NotesPage = () => {
  const { id } = useParams();
  const [notes, setNotes] = useState<Note[]>([]);
  const [patient, setPatient] = useState<Patinent | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);

  const fetchNotes = useCallback(async () => {
    try {
      const response: Note[] = await api.get(`/notes/${id}`);
      setNotes(response);
    } catch (err) {
      console.error("Failed to load notes:", err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const fetchPatient = useCallback(async () => {
    try {
      const response: Patinent = await api.get(`/patients/${id}`);
      setPatient(response);
    } catch (err) {
      console.error("Failed to fetch patient info:", err);
    }
  }, [id]);

  useEffect(() => {
    fetchPatient();
    fetchNotes();
  }, [fetchPatient, fetchNotes]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container>
      <Container maxWidth="md" sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h4" gutterBottom>
          Notes for{" "}
          {patient ? `${patient.firstName} ${patient.lastName}` : "Patient"}
        </Typography>

        <Button
          variant="contained"
          onClick={() => setModalOpen(true)}
          sx={{ mb: 2 }}
          style={{ color: "#fff" }}
        >
          New Note
        </Button>
      </Container>

      <Container
        maxWidth="md"
        sx={{ mt: 4, mb: 4, height: "80vh", overflowY: "auto" }}
      >
        {notes.length === 0 ? (
          <Typography>No notes found.</Typography>
        ) : (
          notes.map((note) => (
            <Accordion key={note.id}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>
                  Note created on {new Date(note.createdAt).toLocaleString("en-US")}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box mb={2}>
                  <ReactMarkdown>{note.sectionG}</ReactMarkdown>
                </Box>
                <Box mb={2}>
                  Original Audio:
                </Box>
                <audio controls src={note.audioPath} style={{ width: "100%" }}>
                  Your browser does not support the audio element.
                </audio>
              </AccordionDetails>
            </Accordion>
          ))
        )}
      </Container>

      <UploadNoteModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        patientId={id!}
        onUploadSuccess={() => fetchNotes()}
      />
    </Container>
  );
};

export default NotesPage;
