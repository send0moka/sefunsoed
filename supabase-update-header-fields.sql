-- Supabase Migration: Update Header table with new fields
-- Migration Name: update_header_with_new_fields
-- Description: Add logo, showSearch, showLanguageSwitcher fields and labelIndonesian to nav items

-- Add new fields to header table
ALTER TABLE public.header 
ADD COLUMN IF NOT EXISTS logo character varying,
ADD COLUMN IF NOT EXISTS "showSearch" boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS "showLanguageSwitcher" boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS "logoSize" character varying DEFAULT 'medium';

-- Add comments for documentation
COMMENT ON COLUMN public.header.logo IS 'Media ID for header logo';
COMMENT ON COLUMN public.header."showSearch" IS 'Enable/disable search functionality in header';
COMMENT ON COLUMN public.header."showLanguageSwitcher" IS 'Enable/disable language switcher in header';
COMMENT ON COLUMN public.header."logoSize" IS 'Size of the logo: small, medium, or large';

-- Add foreign key for logo (if it doesn't exist)
-- Note: This assumes media table exists with id as primary key
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'header_logo_fk'
    ) THEN
        ALTER TABLE public.header 
        ADD CONSTRAINT header_logo_fk 
        FOREIGN KEY (logo) REFERENCES media(id) ON DELETE SET NULL;
    END IF;
END $$;

-- Update the existing header_nav_items table structure
-- Add labelIndonesian column
ALTER TABLE public.header_nav_items 
ADD COLUMN IF NOT EXISTS "labelIndonesian" character varying;

-- Add comment for the new column
COMMENT ON COLUMN public.header_nav_items."labelIndonesian" IS 'Indonesian version of the navigation label';

-- Update existing nav items with Indonesian translations (sample data)
UPDATE public.header_nav_items 
SET "labelIndonesian" = CASE 
    WHEN link_label = 'Home' THEN 'Beranda'
    WHEN link_label = 'About Us' THEN 'Tentang Kami'
    WHEN link_label = 'Registration' THEN 'Pendaftaran'
    WHEN link_label = 'Posts' THEN 'Artikel'
    WHEN link_label = 'Contact' THEN 'Kontak'
    ELSE NULL
END
WHERE link_label IN ('Home', 'About Us', 'Registration', 'Posts', 'Contact');

-- Set default values for existing header record (if exists)
UPDATE public.header 
SET 
    "showSearch" = true,
    "showLanguageSwitcher" = true,
    "logoSize" = 'medium'
WHERE "showSearch" IS NULL OR "showLanguageSwitcher" IS NULL OR "logoSize" IS NULL;

-- Verify the changes
SELECT 
    id,
    logo,
    "showSearch",
    "showLanguageSwitcher",
    "logoSize"
FROM public.header;

SELECT 
    link_label,
    "labelIndonesian"
FROM public.header_nav_items
ORDER BY _order;
