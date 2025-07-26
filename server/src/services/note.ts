import prisma from "../lib/prisma";
import { generateSectionG } from "../utils/generateSectionG";
import { transcribeAudio } from "../utils/whisper";

export const createNoteService = async (file: Express.MulterS3.File, patientId: string, ) => {
  const audioPath = file.location;

  const transcriptText = await transcribeAudio(audioPath);
  const sectionG = await generateSectionG(transcriptText);

  const note = await prisma.note.create({
    data: {
      audioPath,
      patientId,
      sectionG,
      transcript: {
        create: {
          text: transcriptText,
        },
      },
    },
    include: {
      transcript: true,
    },
  });

  return note;
};

export const getNotesByPatientIdService = async (patientId: string) => {
  const notes = await prisma.note.findMany({
    where: { patientId },
    include: {
      transcript: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return notes;
};