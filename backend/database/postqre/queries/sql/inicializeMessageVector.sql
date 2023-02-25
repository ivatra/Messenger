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
-- select id from users where login = 'Michael';
-- select "chatId" from inboxes
-- where "userId" = '00227f96-f152-450f-a57d-eabc7bc7a43a';

-- select name,login from users
-- LEFT JOIN "chatParticipants" ON "chatParticipants"."userId" = users.id
-- where "chatId" = 3267 OR "chatId" = 6875;
select count(*) from users_vectors;
