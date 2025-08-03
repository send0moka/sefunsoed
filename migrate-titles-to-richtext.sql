-- Migration SQL: Convert String Titles to Rich Text Format
-- 
-- This SQL script updates existing post titles from string format to rich text format
-- to fix the Lexical editor error when loading existing posts.
-- 
-- IMPORTANT: Run this ONCE after updating the Posts collection to use richText fields.
-- BACKUP your database before running this script!

-- Function to convert string to rich text JSON format
-- This creates a basic paragraph with the text content

-- Update English titles (title field)
UPDATE posts 
SET title = json_object(
  'root', json_object(
    'children', json_array(
      json_object(
        'children', json_array(
          json_object(
            'detail', 0,
            'format', 0,
            'mode', 'normal',
            'style', '',
            'text', COALESCE(title, ''),
            'type', 'text',
            'version', 1
          )
        ),
        'direction', 'ltr',
        'format', '',
        'indent', 0,
        'type', 'paragraph',
        'version', 1
      )
    ),
    'direction', 'ltr',
    'format', '',
    'indent', 0,
    'type', 'root',
    'version', 1
  )
)
WHERE title IS NOT NULL 
  AND json_valid(title) = 0  -- Only update if it's not already JSON
  AND title != '';

-- Update Indonesian titles (title_id field)  
UPDATE posts 
SET title_id = json_object(
  'root', json_object(
    'children', json_array(
      json_object(
        'children', json_array(
          json_object(
            'detail', 0,
            'format', 0,
            'mode', 'normal',
            'style', '',
            'text', COALESCE(title_id, ''),
            'type', 'text',
            'version', 1
          )
        ),
        'direction', 'ltr',
        'format', '',
        'indent', 0,
        'type', 'paragraph',
        'version', 1
      )
    ),
    'direction', 'ltr',
    'format', '',
    'indent', 0,
    'type', 'root',
    'version', 1
  )
)
WHERE title_id IS NOT NULL 
  AND json_valid(title_id) = 0  -- Only update if it's not already JSON
  AND title_id != '';

-- Verify the migration
SELECT 
  id,
  json_extract(title, '$.root.children[0].children[0].text') as title_text,
  json_extract(title_id, '$.root.children[0].children[0].text') as title_id_text,
  created_at
FROM posts 
WHERE title IS NOT NULL OR title_id IS NOT NULL
ORDER BY created_at DESC
LIMIT 10;
