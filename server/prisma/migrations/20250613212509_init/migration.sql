/*
  Warnings:

  - A unique constraint covering the columns `[plan_id,email]` on the table `PlanShares` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PlanShares_plan_id_email_key" ON "PlanShares"("plan_id", "email");
