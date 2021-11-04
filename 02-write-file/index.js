const fs = require("fs");
const readline = require("readline");
const {stdin : input} = require("process");

const rl = readline.createInterface(input);
const writeStream = fs.createWriteStream("./02-write-file/readFile.txt");

console.log("Введите строку");

rl.addListener("SIGINT", () => {
  sayBye();
  rl.close();
});

rl.addListener("line", (answer) => {
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
