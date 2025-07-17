/*
  Warnings:

  - You are about to drop the column `was_modified` on the `Plan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Plan" DROP COLUMN "was_modified",
ADD COLUMN     "was_modified_first_destination" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "was_modified_second_destination" BOOLEAN NOT NULL DEFAULT false;
