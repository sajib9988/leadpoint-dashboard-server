/*
  Warnings:

  - You are about to drop the column `dataAiHint` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `dataAiHint` on the `TeamMember` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Service" DROP COLUMN "dataAiHint";

-- AlterTable
ALTER TABLE "TeamMember" DROP COLUMN "dataAiHint";
