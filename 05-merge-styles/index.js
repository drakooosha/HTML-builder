const fs = require('fs');
const path = require('path');

const write = fs.createWriteStream('05-merge-styles/project-dist/bundle.css');

fs.readdir('05-merge-styles/styles',{withFileTypes : true},async (err,files) => {
  for(let i = 0; i < files.length; i++) {
    if(path.extname(files[i].name) == '.css') {
      let data = await makeResult(files[i].name);
      data.forEach(element => {
        console.log(element);
        write.write(element);
      });
    }
  }
})


async function makeResult(url) {
  return new Promise((resolve,reject) => {
    const result = [];
    fs.createReadStream('05-merge-styles/styles/' + url)
      .on("data", chunk => {
        result.push(chunk.toString());
      })
      .on("end",()=>{
        resolve(result)
      })
      .on("error", reject);
  })
}

