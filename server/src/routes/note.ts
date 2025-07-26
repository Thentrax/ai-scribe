import { Router } from "express";
import { createNote, getNotesByPatientId } from "../controllers/note";
import upload from "../middleware/upload";

const router = Router();

router.post("/upload", upload.single("audio"), createNote);
router.get("/:patientId", getNotesByPatientId);

export default router;
