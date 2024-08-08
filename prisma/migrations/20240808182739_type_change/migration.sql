/*
  Warnings:

  - Changed the type of `visitCount` on the `Url` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Url" DROP COLUMN "visitCount",
ADD COLUMN     "visitCount" INTEGER NOT NULL;
