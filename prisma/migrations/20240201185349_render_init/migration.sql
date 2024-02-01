-- CreateTable
CREATE TABLE "Hobbies" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "raw_hobbies" VARCHAR(255),
    "cleaned_hobbies" VARCHAR(255),

    CONSTRAINT "Hobbies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Likes" (
    "like_id" UUID NOT NULL,
    "liker_id" UUID NOT NULL,
    "liked_id" UUID NOT NULL,
    "timestamp" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Likes_pkey" PRIMARY KEY ("like_id")
);

-- CreateTable
CREATE TABLE "Messages" (
    "message_id" UUID NOT NULL,
    "sender_id" UUID NOT NULL,
    "receiver_id" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "timestamp" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "read_status" BOOLEAN DEFAULT false,

    CONSTRAINT "Messages_pkey" PRIMARY KEY ("message_id")
);

-- CreateTable
CREATE TABLE "Profiles" (
    "profile_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "picture_url" VARCHAR(255),
    "video_url" VARCHAR(255),
    "username" VARCHAR(50),
    "name" VARCHAR(255) NOT NULL,
    "birthdate" DATE NOT NULL,
    "gender" VARCHAR(50) NOT NULL,
    "orientation" VARCHAR(50) NOT NULL,
    "height_ft" INTEGER NOT NULL,
    "height_in" INTEGER NOT NULL,
    "body_type" VARCHAR(50),
    "ethnicity" VARCHAR(50),
    "smokes" BOOLEAN NOT NULL,
    "drinks" BOOLEAN NOT NULL,
    "profession" VARCHAR(255),
    "current_location" VARCHAR(255),
    "hometown" VARCHAR(255),
    "bio" TEXT,
    "looking_for" VARCHAR(50) NOT NULL,
    "age_range_preference" VARCHAR(50),
    "privacy_settings" JSONB,
    "notification_settings" JSONB,

    CONSTRAINT "Profiles_pkey" PRIMARY KEY ("profile_id")
);

-- CreateTable
CREATE TABLE "UserBehavior" (
    "behavior_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "action_type" VARCHAR(255) NOT NULL,
    "action_details" TEXT NOT NULL,
    "timestamp" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserBehavior_pkey" PRIMARY KEY ("behavior_id")
);

-- CreateTable
CREATE TABLE "Users" (
    "user_id" UUID NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "last_login" TIMESTAMP(0),

    CONSTRAINT "Users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "notification_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "message" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "timestamp" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("notification_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

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

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
