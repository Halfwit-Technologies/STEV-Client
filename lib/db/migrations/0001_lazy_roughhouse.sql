CREATE TABLE IF NOT EXISTS "user_labels" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"name" varchar(50) NOT NULL,
	"color" varchar(50) NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_labels" ADD CONSTRAINT "user_labels_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
