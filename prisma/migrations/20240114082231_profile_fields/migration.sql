/*
  Warnings:

  - You are about to drop the column `height` on the `Profiles` table. All the data in the column will be lost.
  - You are about to drop the column `interested_in_orientation` on the `Profiles` table. All the data in the column will be lost.
  - You are about to drop the column `lifestyle_preferences` on the `Profiles` table. All the data in the column will be lost.
  - You are about to drop the column `profile_photo_url` on the `Profiles` table. All the data in the column will be lost.
  - You are about to drop the column `video_url` on the `Profiles` table. All the data in the column will be lost.
  - You are about to alter the column `looking_for` on the `Profiles` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - Added the required column `drinks` to the `Profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `height_ft` to the `Profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `height_in` to the `Profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `smokes` to the `Profiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profiles" DROP COLUMN "height",
DROP COLUMN "interested_in_orientation",
DROP COLUMN "lifestyle_preferences",
DROP COLUMN "profile_photo_url",
DROP COLUMN "video_url",
ADD COLUMN     "drinks" BOOLEAN NOT NULL,
ADD COLUMN     "height_ft" INTEGER NOT NULL,
ADD COLUMN     "height_in" INTEGER NOT NULL,
ADD COLUMN     "profession" VARCHAR(255),
ADD COLUMN     "smokes" BOOLEAN NOT NULL,
ALTER COLUMN "looking_for" SET DATA TYPE VARCHAR(50);
