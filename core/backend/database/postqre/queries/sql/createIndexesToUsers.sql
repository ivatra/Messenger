-- CREATE INDEX idx_gin_name
-- ON users USING gin("name" gin_trgm_ops);

-- CREATE INDEX idx_gin_login ON users 
-- USING gin("login" gin_trgm_ops);

-- select id from users where login = 'Judie';

-- select "contentCopy" from messages_vectors where "messageId" = 
select name from users where id = '54f94374-e6b2-49e8-a589-188afa83a75a';