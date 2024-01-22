/*
  Warnings:

  - The primary key for the `Hobbies` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Likes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Messages` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Profiles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UserBehavior` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `id` on the `Hobbies` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `user_id` on the `Hobbies` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `like_id` on the `Likes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `liker_id` on the `Likes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `liked_id` on the `Likes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `message_id` on the `Messages` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `sender_id` on the `Messages` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `receiver_id` on the `Messages` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `profile_id` on the `Profiles` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `user_id` on the `Profiles` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `behavior_id` on the `UserBehavior` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `user_id` on the `UserBehavior` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `user_id` on the `Users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Hobbies" DROP CONSTRAINT "hobbies_user_id_foreign";

-- DropForeignKey
ALTER TABLE "Likes" DROP CONSTRAINT "likes_liked_id_foreign";

-- DropForeignKey
ALTER TABLE "Likes" DROP CONSTRAINT "likes_liker_id_foreign";

-- DropForeignKey
ALTER TABLE "Messages" DROP CONSTRAINT "messages_receiver_id_foreign";

-- DropForeignKey
ALTER TABLE "Messages" DROP CONSTRAINT "messages_sender_id_foreign";

-- DropForeignKey
ALTER TABLE "Profiles" DROP CONSTRAINT "profiles_user_id_foreign";

-- DropForeignKey
ALTER TABLE "UserBehavior" DROP CONSTRAINT "userbehavior_user_id_foreign";

-- AlterTable
ALTER TABLE "Hobbies" DROP CONSTRAINT "Hobbies_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "user_id",
ADD COLUMN     "user_id" UUID NOT NULL,
ADD CONSTRAINT "Hobbies_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Likes" DROP CONSTRAINT "Likes_pkey",
DROP COLUMN "like_id",
ADD COLUMN     "like_id" UUID NOT NULL,
DROP COLUMN "liker_id",
ADD COLUMN     "liker_id" UUID NOT NULL,
DROP COLUMN "liked_id",
ADD COLUMN     "liked_id" UUID NOT NULL,
ADD CONSTRAINT "Likes_pkey" PRIMARY KEY ("like_id");

-- AlterTable
ALTER TABLE "Messages" DROP CONSTRAINT "Messages_pkey",
DROP COLUMN "message_id",
ADD COLUMN     "message_id" UUID NOT NULL,
DROP COLUMN "sender_id",
ADD COLUMN     "sender_id" UUID NOT NULL,
DROP COLUMN "receiver_id",
ADD COLUMN     "receiver_id" UUID NOT NULL,
ADD CONSTRAINT "Messages_pkey" PRIMARY KEY ("message_id");

-- AlterTable
ALTER TABLE "Profiles" DROP CONSTRAINT "Profiles_pkey",
DROP COLUMN "profile_id",
ADD COLUMN     "profile_id" UUID NOT NULL,
DROP COLUMN "user_id",
ADD COLUMN     "user_id" UUID NOT NULL,
ADD CONSTRAINT "Profiles_pkey" PRIMARY KEY ("profile_id");

-- AlterTable
ALTER TABLE "UserBehavior" DROP CONSTRAINT "UserBehavior_pkey",
DROP COLUMN "behavior_id",
ADD COLUMN     "behavior_id" UUID NOT NULL,
DROP COLUMN "user_id",
ADD COLUMN     "user_id" UUID NOT NULL,
ADD CONSTRAINT "UserBehavior_pkey" PRIMARY KEY ("behavior_id");

-- AlterTable
ALTER TABLE "Users" DROP CONSTRAINT "Users_pkey",
DROP COLUMN "user_id",
ADD COLUMN     "user_id" UUID NOT NULL,
ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("user_id");

-- AddForeignKey
ALTER TABLE "Hobbies" ADD CONSTRAINT "Hobbies_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_liker_id_fkey" FOREIGN KEY ("liker_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_liked_id_fkey" FOREIGN KEY ("liked_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profiles" ADD CONSTRAINT "Profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBehavior" ADD CONSTRAINT "UserBehavior_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "users_email_unique" RENAME TO "Users_email_key";

-- RenameIndex
ALTER INDEX "users_username_unique" RENAME TO "Users_username_key";
