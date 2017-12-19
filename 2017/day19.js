const assert = require("assert");
const fs = require("fs");

const input = fs.readFileSync("day19.input.txt").toString("utf-8");

const testInput = `     |          
     |  +--+    
     A  |  C    
 F---|----E|--+ 
     |  |  |  D 
     +B-+  +--+ 
                 `;

const walkPath = path => {
  const board = path.split("\n").map(it => it.split(""));

  let letter = "|";
  let y = 0,
    x = board[0].indexOf(letter);
  let heading = "S";
  let word = "";
  let steps = 0;

  while (letter != " " && letter != undefined) {
    steps++;

    switch (heading) {
      case "N":
        y--;
        break;
      case "E":
        x++;
        break;
      case "S":
        y++;
        break;
      case "W":
        x--;
        break;
    }

    letter = board[y][x];

    if (letter == "+") {
      switch (heading) {
        case "N":
        case "S":
          heading = board[y][x + 1] == " " ? "W" : "E";
          break;
        case "E":
        case "W":
          heading = board[y + 1][x] == " " ? "N" : "S";
          break;
      }
    } else if (letter != "-" && letter != "|" && letter != " ") {
      word += letter;
    }
  }

  return [word, steps];
};

const [testWord, testSteps] = walkPath(testInput);
assert(testWord == "ABCDEF");
assert(testSteps == 38);

const [word, steps] = walkPath(input);
console.log(`Network package walked over '${word}' and took ${steps} steps`);
