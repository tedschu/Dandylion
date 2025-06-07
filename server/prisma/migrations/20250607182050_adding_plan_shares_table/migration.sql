-- CreateTable
CREATE TABLE "PlanShares" (
    "id" SERIAL NOT NULL,
    "plan_id" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "invited_by_user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlanShares_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PlanShares" ADD CONSTRAINT "PlanShares_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanShares" ADD CONSTRAINT "PlanShares_invited_by_user_id_fkey" FOREIGN KEY ("invited_by_user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
