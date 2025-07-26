import { Transcript } from "./Transcript";

export interface Note {
  id: string;
  audioPath: string;
  createdAt: string;
  patientId: string;
  sectionG: string;
  transcript: Transcript;
}