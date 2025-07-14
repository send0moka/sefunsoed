-- Migration: Add Indonesian language fields to posts table
-- Date: 2025-01-14

-- Add title_id column for Indonesian title
ALTER TABLE public.posts 
ADD COLUMN title_id character varying;

-- Add content_id column for Indonesian content (same structure as content)
ALTER TABLE public.posts 
ADD COLUMN content_id jsonb;

-- Create index for title_id for better search performance
CREATE INDEX IF NOT EXISTS posts_title_id_idx ON public.posts USING btree (title_id);

-- Optional: Set default values for existing posts (you may want to update these manually)
-- UPDATE public.posts SET title_id = title WHERE title_id IS NULL;
-- UPDATE public.posts SET content_id = content WHERE content_id IS NULL;

-- Add comments for documentation
COMMENT ON COLUMN public.posts.title_id IS 'Post title in Indonesian language';
COMMENT ON COLUMN public.posts.content_id IS 'Post content in Indonesian language (JSON format)';
