/*
  Warnings:

  - You are about to drop the `OasisFormSectionG` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OasisFormSectionG" DROP CONSTRAINT "OasisFormSectionG_noteId_fkey";

-- DropTable
DROP TABLE "OasisFormSectionG";
