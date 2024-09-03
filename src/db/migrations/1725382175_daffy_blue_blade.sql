DO $$ BEGIN
 CREATE TYPE "public"."post_status" AS ENUM('DRAFT', 'PUBLISHED', 'DELETED');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "posts" (
	"id" integer PRIMARY KEY NOT NULL,
	"title" varchar(255),
	"content" text,
	"created_at" timestamp NOT NULL,
	"post_status" "post_status" DEFAULT 'DRAFT'
);
