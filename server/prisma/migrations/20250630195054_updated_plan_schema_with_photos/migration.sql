/*
  Warnings:

  - You are about to drop the column `photos` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `result_data` on the `Plan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Plan" DROP COLUMN "photos",
DROP COLUMN "result_data",
ADD COLUMN     "photos_first_destination" TEXT[],
ADD COLUMN     "photos_second_destination" TEXT[],
ADD COLUMN     "plan_data" JSONB;
