const fs = require('fs');
const result = fs.createReadStream('./01-read-file/text.txt');
result.addListener("data", function(chunk) {
    console.log(chunk.toString());
});