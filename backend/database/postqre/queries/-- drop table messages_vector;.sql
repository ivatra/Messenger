-- SELECT messages.id,
--        messages.content
-- FROM messages
-- WHERE to_tsvector(messages.content) @@ to_tsquery('опытом:* & при:*')
-- ORDER BY ts_rank(to_tsvector(messages.content), to_tsquery('опытом:* & при:*')) DESC
-- LIMIT 10;

SELECT messages.id,
       messages.content
FROM messages
LEFT JOIN messages_vectors ON messages.id = messages_vectors."messageId"
WHERE messages_vectors."contentCopy" LIKE '%postgresql% appl%'
ORDER BY ts_rank(to_tsvector(messages_vectors."contentCopy"), 
plainto_tsquery('postgresql appl')) DESC
LIMIT 10;