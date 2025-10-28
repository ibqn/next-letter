CREATE SCHEMA if not exists "drizzle";
--> statement-breakpoint
CREATE TABLE "drizzle"."subscription" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "subscription_email_unique" UNIQUE("email")
);
