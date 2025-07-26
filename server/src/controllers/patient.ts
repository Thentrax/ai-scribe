import { Request, Response } from "express";
import * as patientService from "../services/patient";

export const getAllPatients = async (_req: Request, res: Response) => {
  try {
    const patients = await patientService.getAllPatients();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch patients." });
  }
};

export const getPatientById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const patient = await patientService.getPatientById(id);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found." });
    }

    res.json(patient);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch patient." });
  }
};
