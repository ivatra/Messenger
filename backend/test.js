require('dotenv').config()
const { QueryTypes } = require("sequelize");
const sequelize = require('./database/postqre/postgre')
const fs = require('fs')

const prompt = msg => {
  fs.writeSync(1, String(msg));
  let s = '', buf = Buffer.alloc(1);
  while (buf[0] - 10 && buf[0] - 13)
    s += buf, fs.readSync(0, buf, 0, 1, 0);
  return s.slice(1);
};


const message = 'такая'
const keywords = message.toLowerCase().split(' ')
const tsquery = keywords

const query = `
 SELECT messages.id,
       messages.content,
FROM messages
LEFT JOIN messages_vector ON messages.id = messages_vector.content_id
WHERE to_tsvector(messages_vector.content2) @@ to_tsquery(:tsquery)
ORDER BY ts_rank(to_tsvector(messages_vector.content2), plainto_tsquery(:tsquery)) DESC
LIMIT 10;
`;

const result = async () => {
  await sequelize.authenticate()
  await sequelize.sync()
  const result = await sequelize.query(query, {
    replacements: { tsquery },
    type: QueryTypes.SELECT,
  })
  console.log(result)
}

result()