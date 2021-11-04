const fs = require("fs");
const path = require("path");

fs.readdir('03-files-in-folder/secret-folder' , {withFileTypes : true}, (err,files)=>{
  for(let i = 0; i < files.length; i++) {
    fs.stat('03-files-in-folder/secret-folder/' + files[i].name, (err,stats)=>{
      if(!stats.isDirectory()) {
        console.log(`${files[i].name.split('.')[0]} - ${path.extname(files[i].name).split('.')[1]} - ${(stats.size)/1000}kb`)
      }
    });
  }
})
