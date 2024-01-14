-- CreateTable
CREATE TABLE "Hobbies" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "raw_hobbies" VARCHAR(255),
    "cleaned_hobbies" VARCHAR(255),

    CONSTRAINT "Hobbies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Likes" (
    "like_id" SERIAL NOT NULL,
    "liker_id" INTEGER NOT NULL,
    "liked_id" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Likes_pkey" PRIMARY KEY ("like_id")
);

-- CreateTable
CREATE TABLE "Messages" (
    "message_id" SERIAL NOT NULL,
    "sender_id" INTEGER NOT NULL,
    "receiver_id" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "timestamp" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "read_status" BOOLEAN DEFAULT false,

    CONSTRAINT "Messages_pkey" PRIMARY KEY ("message_id")
);

-- CreateTable
CREATE TABLE "Profiles" (
    "profile_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "birthdate" DATE NOT NULL,
    "gender" VARCHAR(50) NOT NULL,
    "orientation" VARCHAR(50) NOT NULL,
    "interested_in_orientation" VARCHAR(50) NOT NULL,
    "height" VARCHAR(50),
    "body_type" VARCHAR(50),
    "ethnicity" VARCHAR(50),
    "lifestyle_preferences" TEXT,
    "profile_photo_url" TEXT,
    "video_url" TEXT,
    "current_location" VARCHAR(255),
    "hometown" VARCHAR(255),
    "bio" TEXT,
    "looking_for" TEXT NOT NULL,
    "age_range_preference" VARCHAR(50),
    "privacy_settings" JSONB,
    "notification_settings" JSONB,

    CONSTRAINT "Profiles_pkey" PRIMARY KEY ("profile_id")
);

-- CreateTable
CREATE TABLE "UserBehavior" (
    "behavior_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "action_type" VARCHAR(255) NOT NULL,
    "action_details" TEXT NOT NULL,
    "timestamp" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserBehavior_pkey" PRIMARY KEY ("behavior_id")
);

-- CreateTable
CREATE TABLE "Users" (
    "user_id" SERIAL NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "last_login" TIMESTAMP(0),

    CONSTRAINT "Users_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_unique" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_unique" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "Hobbies" ADD CONSTRAINT "hobbies_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "likes_liked_id_foreign" FOREIGN KEY ("liked_id") REFERENCES "Users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "likes_liker_id_foreign" FOREIGN KEY ("liker_id") REFERENCES "Users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "messages_receiver_id_foreign" FOREIGN KEY ("receiver_id") REFERENCES "Users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "messages_sender_id_foreign" FOREIGN KEY ("sender_id") REFERENCES "Users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Profiles" ADD CONSTRAINT "profiles_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserBehavior" ADD CONSTRAINT "userbehavior_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
