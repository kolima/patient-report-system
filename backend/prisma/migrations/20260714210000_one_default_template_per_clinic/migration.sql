-- Enforce at most one default template per clinic (partial unique index).
CREATE UNIQUE INDEX "templates_one_default_per_clinic"
ON "templates" ("clinic_id")
WHERE "is_default" = true;
