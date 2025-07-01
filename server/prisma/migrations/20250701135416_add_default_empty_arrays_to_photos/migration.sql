-- AlterTable
ALTER TABLE "Plan" ALTER COLUMN "photos_first_destination" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "photos_second_destination" SET DEFAULT ARRAY[]::TEXT[];
