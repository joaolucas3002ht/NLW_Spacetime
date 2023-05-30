/*
  Warnings:

  - You are about to drop the column `IsPublic` on the `memories` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_memories" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "coverUrl" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    CONSTRAINT "memories_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_memories" ("content", "coverUrl", "createdAt", "id", "userId") SELECT "content", "coverUrl", "createdAt", "id", "userId" FROM "memories";
DROP TABLE "memories";
ALTER TABLE "new_memories" RENAME TO "memories";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
