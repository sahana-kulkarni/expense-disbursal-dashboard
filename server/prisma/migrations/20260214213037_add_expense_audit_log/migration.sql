-- CreateTable
CREATE TABLE "ExpenseAudit" (
    "id" TEXT NOT NULL,
    "expenseId" TEXT NOT NULL,
    "actorId" TEXT NOT NULL,
    "fromStatus" "Status" NOT NULL,
    "toStatus" "Status" NOT NULL,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExpenseAudit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ExpenseAudit_expenseId_idx" ON "ExpenseAudit"("expenseId");

-- CreateIndex
CREATE INDEX "ExpenseAudit_actorId_idx" ON "ExpenseAudit"("actorId");

-- AddForeignKey
ALTER TABLE "ExpenseAudit" ADD CONSTRAINT "ExpenseAudit_expenseId_fkey" FOREIGN KEY ("expenseId") REFERENCES "Expense"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpenseAudit" ADD CONSTRAINT "ExpenseAudit_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
