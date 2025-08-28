/*
  Warnings:

  - Changed the type of `date` on the `rooms` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `start_at` on the `rooms` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `end_at` on the `rooms` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."rooms" DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
DROP COLUMN "start_at",
ADD COLUMN     "start_at" TIMESTAMP(3) NOT NULL,
DROP COLUMN "end_at",
ADD COLUMN     "end_at" TIMESTAMP(3) NOT NULL;
