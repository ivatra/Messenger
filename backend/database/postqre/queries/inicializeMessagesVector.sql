-- truncate table messages_vectors;
-- INSERT INTO messages_vectors ("messageId", "contentCopy")
-- SELECT id,
--        regexp_replace(lower(regexp_replace(content, '[[:punct:]]', ' ', 'g')),
--        '\s{2,}', ' ', 'g')
-- FROM messages;
-- drop index if EXISTS idx_gin_content;
-- CREATE INDEX idx_gin_content
-- ON messages_vectors USING gin("contentCopy" gin_trgm_ops);

-- select * from messages_vectors limit 1;
-- select email from users where login = 'Michael';

SELECT "chatId"
FROM "chatParticipants"
WHERE "userId" =
        ( SELECT id
         FROM users
         WHERE login = 'Michael' );