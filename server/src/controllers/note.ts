import { Request, Response } from "express";
import { createNoteService, getNotesByPatientIdService } from "../services/note";

export const createNote = async (req: Request, res: Response) => {
  try {
    const file = req.file as Express.MulterS3.File;
    const { patientId } = req.body;

    if (!file || !patientId) {
      return res.status(400).json({ error: "Missing audio file or patientId." });
    }

    const note = await createNoteService(file, patientId);
    return res.status(201).json(note);
  } catch (error) {
    console.error("Error creating note:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getNotesByPatientId = async (req: Request, res: Response) => {
  const { patientId } = req.params;

  try {
    const notes = await getNotesByPatientIdService(patientId);
    res.json(notes);
  } catch (error) {
    console.error("Erro ao buscar notes:", error);
    res.status(500).json({ error: "Erro ao buscar notes" });
  }
};