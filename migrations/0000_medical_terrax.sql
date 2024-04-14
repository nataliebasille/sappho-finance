CREATE TABLE IF NOT EXISTS "sappho-finance_product_price" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" integer NOT NULL,
	"price" varchar(256),
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp,
	"active_on" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sappho-finance_product" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "product_id_idx" ON "sappho-finance_product_price" ("product_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_idx" ON "sappho-finance_product" ("name");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sappho-finance_product_price" ADD CONSTRAINT "sappho-finance_product_price_product_id_sappho-finance_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "sappho-finance_product"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
