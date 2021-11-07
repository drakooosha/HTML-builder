const fs = require("fs");
const path = require("path");

fs.mkdir("06-build-page/project-dist", () => {});
fs.mkdir("06-build-page/project-dist/assets", () => {});

let distSrc = "06-build-page/project-dist/assets";
let src = "06-build-page/assets";

function deleteAssets(src) {
  fs.readdir(src, { withFileTypes: true }, (err, files) => {
    if (files.length == 0 && src != "06-build-page/project-dist/assets") {
      fs.rmdir(src, () => {});
      return null;
    }
    for (let i = 0; i < files.length; i++) {
      fs.stat(`${src}/${files[i].name}`, (err, stats) => {
        if (stats.isDirectory()) {
          deleteAssets(`${src}/${files[i].name}`);
        } else {
          fs.unlink(`${src}/${files[i].name}`, () => {});
        }
      });
    }
  });
}

function addAssets(src, newsrc) {
  fs.readdir(src, { withFileTypes: true }, (err, files) => {
    for (let i = 0; i < files.length; i++) {
      fs.stat(`${src}/${files[i].name}`, (err, stats) => {
        if (stats.isDirectory()) {
          fs.mkdir(`${newsrc}/${files[i].name}`, () => {});
          addAssets(`${src}/${files[i].name}`, `${newsrc}/${files[i].name}`);
        } else {
          fs.copyFile(`${src}/${files[i].name}`,`${newsrc}/${files[i].name}`,() => {}
          );
        }
      });
    }
  });
}

new Promise((resolve, reject) => {
  deleteAssets(distSrc);
  resolve();
}).then(() => {
  addAssets(src,distSrc);
});

fs.readdir("06-build-page/components", {withFileTypes : true}, (err,files)=>{
  let read = fs.createReadStream("06-build-page/template.html");
  new Promise((resolve,reject)=> {
    read.on("data", (chunk) => {
      html = chunk;
      resolve(html.toString());
    });
  }).then(async (html)=>{
    for(let i = 0; i < files.length; i++) {
      if(html.indexOf(`{{${path.basename(files[i].name, ".html")}}}`) != -1) {
        let component = await getComponent(files[i].name, 'components'); 
        req = new RegExp(`{{${path.basename(files[i].name, ".html")}}}`, 'gi');
        html = html.replace(req,component);
      }
    }
    return html;
  }).then((html) => {
    const write = fs.createWriteStream("06-build-page/project-dist/index.html");
    write.write(html);
  })

})

fs.readdir('06-build-page/styles',{withFileTypes : true},async (err,files) => {
  const write = fs.createWriteStream("06-build-page/project-dist/style.css")
  for(let i = 0; i < files.length; i++) {
    if(path.extname(files[i].name) == '.css') {
      let data = await getComponent(files[i].name,'styles');
      data.forEach(element => {
        write.write(element);
      });
    }
  }
})

function getComponent(url,part) {
  return new Promise((resolve,reject) => {
    const result = [];
    fs.createReadStream(`06-build-page/${part}/${url}`)
      .on("data", chunk => {
        result.push(chunk.toString());
      })
      .on("end",()=>{
        resolve(result)
      })
      .on("error", reject);
  })
}

