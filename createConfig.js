const fs = require("fs");
const data = `const serverConfig = {
    "ssl": ${process.env.NODE_SSL},
    "host": "${process.env.NODE_HOST}",
    "port": ${process.env.NODE_PORT}
    },
    elasticSearch = {
        "ssl": ${process.env.ES_SSL},
        "host": "${process.env.ES_HOST}",
        "port": ${process.env.ES_PORT},
        "index": "${process.env.ES_INDEX}"
    }
export {
    serverConfig,
    elasticSearch
}`;
fs.writeFileSync('./src/config/index.js',data);