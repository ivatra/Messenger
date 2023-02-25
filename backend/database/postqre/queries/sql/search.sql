-- SELECT messages.id,
--        messages.content
-- FROM messages
-- WHERE to_tsvector(messages.content) @@ to_tsquery('опытом:* & при:*')
-- ORDER BY ts_rank(to_tsvector(messages.content), to_tsquery('опытом:* & при:*')) DESC
-- LIMIT 10;

-- SELECT messages.id,
--        messages.content
-- FROM messages
-- LEFT JOIN messages_vectors ON messages.id = messages_vectors."messageId"
-- WHERE messages_vectors."contentCopy" LIKE '%postgresql% appl%'
-- ORDER BY ts_rank(to_tsvector(messages_vectors."contentCopy"), plainto_tsquery('postgresql appl')) DESC
-- LIMIT 10;

-- SELECT "message"."id",
--        "message"."content",
--        "messages_vector"."id" AS "messages_vector.id",
--        "messages_vector"."contentCopy" AS "messages_vector.contentCopy",
--        "messages_vector"."messageId" AS "messages_vector.messageId"
-- FROM "messages" AS "message"
-- INNER JOIN "messages_vectors" AS "messages_vector" ON "message"."id" = "messages_vector"."messageId"
-- AND "messages_vector"."contentCopy" LIKE '%postgresql% appl%'
-- ORDER BY ts_rank(to_tsvector("messages_vectors"."contentCopy"), plainto_tsquery('postgresql appl')) DESC
-- LIMIT 10;

-- select users.id,name,login from users
-- left join inboxes on inboxes."userId" = users.id
-- where inboxes.id = 13746;

select * from users limit 1;