-- truncate table users_vectors;
-- INSERT INTO users_vectors ("userId", "nameCopy","loginCopy")
-- SELECT id,
--        regexp_replace(lower(regexp_replace(name, '[[:punct:]]', ' ', 'g')),
--        '\s{2,}', ' ', 'g'),
--        regexp_replace(lower(regexp_replace(login, '[[:punct:]]', ' ', 'g')),
--         '\s{2,}', ' ', 'g')
-- FROM users;

-- drop index if EXISTS idx_gin_name;
-- drop index if EXISTS idx_gin_login;

-- CREATE INDEX idx_gin_name
-- ON users_vectors USING gin("nameCopy" gin_trgm_ops);

-- CREATE INDEX idx_gin_login
-- ON users_vectors USING gin("loginCopy" gin_trgm_ops);


-- -- SELECT table_name
-- -- FROM information_schema.tables
-- -- WHERE table_schema = 'public';


select * from users_vectors limit 1;