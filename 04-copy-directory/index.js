const fs = require('fs');

fs.mkdir('04-copy-directory/files-copy',{recursive : true}, (error)=>{
  if(error) {
    throw error;
  }
});

fs.readdir('04-copy-directory/files-copy' , {withFileTypes : true}, (err,files)=>{
  for(let i = 0; i < files.length; i++) {
    fs.unlink( '04-copy-directory/files-copy/'+ files[i].name, ()=>{});
  }
})

fs.readdir('04-copy-directory/files' , {withFileTypes : true}, (err,files)=>{
  for(let i = 0; i < files.length; i++) {
    fs.copyFile('04-copy-directory/files/' + files[i].name, '04-copy-directory/files-copy/' + files[i].name,(err)=>{
      if(err) {
        console.log(err)
      }
    });
  }
})