-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Fidele" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "dateNaissance" DATETIME,
    "sexe" TEXT NOT NULL,
    "grade" TEXT NOT NULL,
    "jourPermanence" TEXT NOT NULL,
    "poste" TEXT NOT NULL,
    "imageUrl" TEXT,
    "observation" TEXT,
    "membreChorale" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Attendance" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "scope" TEXT NOT NULL,
    "fideleId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Attendance_fideleId_fkey" FOREIGN KEY ("fideleId") REFERENCES "Fidele" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Attendance_date_scope_idx" ON "Attendance"("date", "scope");

-- CreateIndex
CREATE UNIQUE INDEX "Attendance_date_scope_fideleId_key" ON "Attendance"("date", "scope", "fideleId");
