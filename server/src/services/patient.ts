import prisma from "../lib/prisma";

export const getAllPatients = async () => {
  return await prisma.patient.findMany({
    orderBy: { createdAt: "desc" },
  });
};

export const getPatientById = async (id: string) => {
  return await prisma.patient.findUnique({
    where: { id },
  });
};
