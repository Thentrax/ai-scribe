import patientRoutes from "./routes/patient";
import notesRoutes from './routes/note';
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.use("/patients", patientRoutes);
app.use('/notes', notesRoutes);
