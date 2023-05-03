truncate table messages_vectors;
INSERT INTO messages_vectors ("messageId", "contentCopy")
SELECT id,
       regexp_replace(lower(regexp_replace(content, '[[:punct:]]', ' ', 'g')),
       '\s{2,}', ' ', 'g')
FROM messages;
drop index if EXISTS idx_gin_content;
CREATE INDEX idx_gin_content
ON messages_vectors USING gin("contentCopy" gin_trgm_ops);
