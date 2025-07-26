import { Router } from "express";
import * as patientController from "../controllers/patient";

const router = Router();

router.get("/", patientController.getAllPatients);
router.get("/:id", patientController.getPatientById);

export default router;
