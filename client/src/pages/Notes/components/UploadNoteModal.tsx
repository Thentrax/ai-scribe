import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Input,
  CircularProgress,
} from "@mui/material";
import { ChangeEvent, FC, useState } from "react";
import api from "../../../services/api";

interface UploadNoteModalProps {
  open: boolean;
  onClose: () => void;
  patientId: string;
  onUploadSuccess?: () => void;
}

const UploadNoteModal: FC<UploadNoteModalProps> = ({
  open,
  onClose,
  patientId,
  onUploadSuccess,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === "audio/mpeg") {
      setFile(selectedFile);
      setError("");
    } else {
      setFile(null);
      setError("Only .mp3 files are allowed.");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a valid .mp3 file.");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("audio", file);
    formData.append("patientId", patientId);

    try {
      await api.post("/notes/upload", formData);
      onUploadSuccess?.();
      onClose();
      setFile(null);
    } catch (err) {
      setError("Upload failed. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Upload New Note</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <Input
            type="file"
            inputProps={{ accept: ".mp3" }}
            onChange={handleFileChange}
            disabled={isLoading}
          />
          {error && (
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isLoading} style={{ color: "#fff" }}>
          Cancel
        </Button>
        <Button
          onClick={handleUpload}
          variant="contained"
          disabled={!file || isLoading}
          startIcon={isLoading ? <CircularProgress size={20} /> : undefined}
        >
          {isLoading ? "Uploading..." : "Upload"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadNoteModal;
