-- Supabase Migration: Add Indonesian language columns to FAQ block tables
-- Migration Name: add_faq_indonesian_columns
-- Description: Add question_id and answer_id columns for Indonesian translations

-- Add columns to version table
ALTER TABLE public._pages_v_blocks_faq_block_faq_items 
ADD COLUMN IF NOT EXISTS question_id character varying,
ADD COLUMN IF NOT EXISTS answer_id jsonb;

-- Add columns to main table  
ALTER TABLE public.pages_blocks_faq_block_faq_items 
ADD COLUMN IF NOT EXISTS question_id character varying,
ADD COLUMN IF NOT EXISTS answer_id jsonb;

-- Create comments for documentation
COMMENT ON COLUMN public._pages_v_blocks_faq_block_faq_items.question_id IS 'Indonesian version of the FAQ question';
COMMENT ON COLUMN public._pages_v_blocks_faq_block_faq_items.answer_id IS 'Indonesian version of the FAQ answer (rich text JSON)';
COMMENT ON COLUMN public.pages_blocks_faq_block_faq_items.question_id IS 'Indonesian version of the FAQ question';
COMMENT ON COLUMN public.pages_blocks_faq_block_faq_items.answer_id IS 'Indonesian version of the FAQ answer (rich text JSON)';

-- Update existing data with sample Indonesian translations
UPDATE public.pages_blocks_faq_block_faq_items 
SET 
  question_id = CASE 
    WHEN question = 'What is SEF Unsoed?' THEN 'Apa itu SEF Unsoed?'
    WHEN question = 'Who can join SEF Unsoed?' THEN 'Siapa yang bisa bergabung dengan SEF Unsoed?'
    WHEN question = 'What are the benefits of joining SEF?' THEN 'Apa manfaat bergabung dengan SEF?'
    WHEN question = 'What programs does SEF offer?' THEN 'Program apa saja yang ditawarkan SEF?'
    WHEN question = 'How can I enroll in SEF''s TOEFL Class?' THEN 'Bagaimana cara mendaftar di Kelas TOEFL SEF?'
    WHEN question = 'Are SEF classes free?' THEN 'Apakah kelas SEF gratis?'
    WHEN question = 'What events does SEF organize?' THEN 'Acara apa saja yang diselenggarakan SEF?'
    WHEN question = 'How can I join SEF''s debate team?' THEN 'Bagaimana cara bergabung dengan tim debat SEF?'
    WHEN question = 'What achievements has SEF''s debate team earned?' THEN 'Prestasi apa saja yang telah diraih tim debat SEF?'
    ELSE NULL
  END,
  answer_id = CASE 
    WHEN question = 'What is SEF Unsoed?' THEN 
    '{"root":{"type":"root","format":"","indent":0,"version":1,"children":[{"type":"paragraph","format":"","indent":0,"version":1,"children":[{"mode":"normal","text":"Student English Forum (SEF) Unsoed, didirikan pada tahun 1979, adalah unit kegiatan mahasiswa berbasis bahasa Inggris terbesar di Universitas Jenderal Soedirman di Purwokerto, Jawa Tengah. SEF didedikasikan untuk mengembangkan kemampuan bahasa Inggris dan keterampilan interpersonal di kalangan mahasiswa dan masyarakat luas. SEF menyediakan platform dinamis bagi mahasiswa dari berbagai fakultas untuk berkolaborasi, menawarkan program seperti kelas bahasa Inggris, pelatihan debat, persiapan TOEFL, dan kegiatan pengembangan bakat seperti storytelling dan pidato. Dengan misi mempertahankan atmosfer berbahasa Inggris, SEF mendorong pertumbuhan pribadi dan akademik melalui berbagai inisiatifnya.","type":"text","style":"","detail":0,"format":0,"version":1}],"direction":"ltr","textStyle":"","textFormat":0}],"direction":"ltr"}}'::jsonb
    WHEN question = 'Who can join SEF Unsoed?' THEN 
    '{"root":{"type":"root","format":"","indent":0,"version":1,"children":[{"type":"paragraph","format":"","indent":0,"version":1,"children":[{"mode":"normal","text":"SEF Unsoed terbuka untuk semua mahasiswa Universitas Jenderal Soedirman dari fakultas manapun, tanpa memandang tingkat kemampuan bahasa Inggris mereka. Baik Anda pemula yang ingin meningkatkan kemampuan atau pembelajar tingkat lanjut yang ingin mengasah kemampuan, SEF menyambut semua yang bersemangat belajar bahasa Inggris dan terlibat dalam programnya. Mahasiswa non-Unsoed atau anggota masyarakat juga dapat berpartisipasi dalam program tertentu seperti kelas bahasa Inggris online gratis SEF Social Action (SSA), yang diperkenalkan selama pandemi untuk memperluas akses pembelajaran bahasa Inggris. Periksa Instagram SEF (@sef.unsoed) untuk update program terbuka.","type":"text","style":"","detail":0,"format":0,"version":1}],"direction":"ltr","textStyle":"","textFormat":0}],"direction":"ltr"}}'::jsonb
    WHEN question = 'What are the benefits of joining SEF?' THEN
    '{"root":{"type":"root","format":"","indent":0,"version":1,"children":[{"type":"paragraph","format":"","indent":0,"version":1,"children":[{"mode":"normal","text":"Bergabung dengan SEF Unsoed menawarkan banyak keuntungan, termasuk peningkatan kemampuan bahasa Inggris dalam berbicara, menulis, membaca, dan mendengar melalui kelas terstruktur dan sesi latihan. Anggota mendapat akses ke peluang kompetitif seperti debat bahasa Inggris nasional dan internasional, di mana SEF memiliki rekam jejak yang kuat, termasuk penghargaan dari acara seperti Asian English Olympic dan National University Debate Competition. Selain itu, SEF mengembangkan keterampilan organisasi dan interpersonal melalui perencanaan acara dan kerja tim, mempersiapkan anggota untuk kesuksesan akademik dan profesional. Forum ini juga membangun komunitas yang dinamis, menghubungkan Anda dengan rekan-rekan untuk berlatih bahasa Inggris setiap hari dan tetap mengikuti tren global.","type":"text","style":"","detail":0,"format":0,"version":1}],"direction":"ltr","textStyle":"","textFormat":0}],"direction":"ltr"}}'::jsonb
    ELSE NULL
  END
WHERE question IN (
  'What is SEF Unsoed?',
  'Who can join SEF Unsoed?',
  'What are the benefits of joining SEF?',
  'What programs does SEF offer?',
  'How can I enroll in SEF''s TOEFL Class?',
  'Are SEF classes free?',
  'What events does SEF organize?',
  'How can I join SEF''s debate team?',
  'What achievements has SEF''s debate team earned?'
);

-- Also update the version table with the same data
UPDATE public._pages_v_blocks_faq_block_faq_items 
SET 
  question_id = CASE 
    WHEN question = 'What is SEF Unsoed?' THEN 'Apa itu SEF Unsoed?'
    WHEN question = 'Who can join SEF Unsoed?' THEN 'Siapa yang bisa bergabung dengan SEF Unsoed?'
    WHEN question = 'What are the benefits of joining SEF?' THEN 'Apa manfaat bergabung dengan SEF?'
    WHEN question = 'What programs does SEF offer?' THEN 'Program apa saja yang ditawarkan SEF?'
    WHEN question = 'How can I enroll in SEF''s TOEFL Class?' THEN 'Bagaimana cara mendaftar di Kelas TOEFL SEF?'
    WHEN question = 'Are SEF classes free?' THEN 'Apakah kelas SEF gratis?'
    WHEN question = 'What events does SEF organize?' THEN 'Acara apa saja yang diselenggarakan SEF?'
    WHEN question = 'How can I join SEF''s debate team?' THEN 'Bagaimana cara bergabung dengan tim debat SEF?'
    WHEN question = 'What achievements has SEF''s debate team earned?' THEN 'Prestasi apa saja yang telah diraih tim debat SEF?'
    ELSE NULL
  END,
  answer_id = CASE 
    WHEN question = 'What is SEF Unsoed?' THEN 
    '{"root":{"type":"root","format":"","indent":0,"version":1,"children":[{"type":"paragraph","format":"","indent":0,"version":1,"children":[{"mode":"normal","text":"Student English Forum (SEF) Unsoed, didirikan pada tahun 1979, adalah unit kegiatan mahasiswa berbasis bahasa Inggris terbesar di Universitas Jenderal Soedirman di Purwokerto, Jawa Tengah. SEF didedikasikan untuk mengembangkan kemampuan bahasa Inggris dan keterampilan interpersonal di kalangan mahasiswa dan masyarakat luas. SEF menyediakan platform dinamis bagi mahasiswa dari berbagai fakultas untuk berkolaborasi, menawarkan program seperti kelas bahasa Inggris, pelatihan debat, persiapan TOEFL, dan kegiatan pengembangan bakat seperti storytelling dan pidato. Dengan misi mempertahankan atmosfer berbahasa Inggris, SEF mendorong pertumbuhan pribadi dan akademik melalui berbagai inisiatifnya.","type":"text","style":"","detail":0,"format":0,"version":1}],"direction":"ltr","textStyle":"","textFormat":0}],"direction":"ltr"}}'::jsonb
    WHEN question = 'Who can join SEF Unsoed?' THEN 
    '{"root":{"type":"root","format":"","indent":0,"version":1,"children":[{"type":"paragraph","format":"","indent":0,"version":1,"children":[{"mode":"normal","text":"SEF Unsoed terbuka untuk semua mahasiswa Universitas Jenderal Soedirman dari fakultas manapun, tanpa memandang tingkat kemampuan bahasa Inggris mereka. Baik Anda pemula yang ingin meningkatkan kemampuan atau pembelajar tingkat lanjut yang ingin mengasah kemampuan, SEF menyambut semua yang bersemangat belajar bahasa Inggris dan terlibat dalam programnya. Mahasiswa non-Unsoed atau anggota masyarakat juga dapat berpartisipasi dalam program tertentu seperti kelas bahasa Inggris online gratis SEF Social Action (SSA), yang diperkenalkan selama pandemi untuk memperluas akses pembelajaran bahasa Inggris. Periksa Instagram SEF (@sef.unsoed) untuk update program terbuka.","type":"text","style":"","detail":0,"format":0,"version":1}],"direction":"ltr","textStyle":"","textFormat":0}],"direction":"ltr"}}'::jsonb
    WHEN question = 'What are the benefits of joining SEF?' THEN
    '{"root":{"type":"root","format":"","indent":0,"version":1,"children":[{"type":"paragraph","format":"","indent":0,"version":1,"children":[{"mode":"normal","text":"Bergabung dengan SEF Unsoed menawarkan banyak keuntungan, termasuk peningkatan kemampuan bahasa Inggris dalam berbicara, menulis, membaca, dan mendengar melalui kelas terstruktur dan sesi latihan. Anggota mendapat akses ke peluang kompetitif seperti debat bahasa Inggris nasional dan internasional, di mana SEF memiliki rekam jejak yang kuat, termasuk penghargaan dari acara seperti Asian English Olympic dan National University Debate Competition. Selain itu, SEF mengembangkan keterampilan organisasi dan interpersonal melalui perencanaan acara dan kerja tim, mempersiapkan anggota untuk kesuksesan akademik dan profesional. Forum ini juga membangun komunitas yang dinamis, menghubungkan Anda dengan rekan-rekan untuk berlatih bahasa Inggris setiap hari dan tetap mengikuti tren global.","type":"text","style":"","detail":0,"format":0,"version":1}],"direction":"ltr","textStyle":"","textFormat":0}],"direction":"ltr"}}'::jsonb
    ELSE NULL
  END
WHERE question IN (
  'What is SEF Unsoed?',
  'Who can join SEF Unsoed?',
  'What are the benefits of joining SEF?',
  'What programs does SEF offer?',
  'How can I enroll in SEF''s TOEFL Class?',
  'Are SEF classes free?',
  'What events does SEF organize?',
  'How can I join SEF''s debate team?',
  'What achievements has SEF''s debate team earned?'
);

-- Verify the changes
SELECT 
  question, 
  question_id,
  CASE 
    WHEN answer_id IS NOT NULL THEN 'Has Indonesian translation'
    ELSE 'No Indonesian translation'
  END as indonesian_status
FROM public.pages_blocks_faq_block_faq_items
ORDER BY _order;
