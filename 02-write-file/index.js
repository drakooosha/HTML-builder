const fs = require("fs");
const readline = require("readline");
const {stdin : input, stdout : output} = require("process");

const rl = readline.createInterface({input,output});
const writeStream = fs.createWriteStream("./02-write-file/readFile.txt");

console.log("Введите строку");


rl.on("SIGINT", () => {
  sayBye();
  rl.close();
});

rl.on("line", (answer) => {
  if (answer == "exit") {
    sayBye();
    rl.close();
  } else {
    writeStream.write(answer);
  }
});

function sayBye() {
  console.log("Конец ввода");
}
