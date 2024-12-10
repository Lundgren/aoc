const fs = require("fs");
const path = require("path");

const { LoggedString, setPrintLength } = require("./trace");

// Try to guess the input file based on the initial scripts name
const dayInputFilePath = process.mainModule.filename.slice(0, -2) + "input";
const parentDir = path.resolve(path.dirname(require.main.filename), "..");

// Input can be placed in the file named input and it will be moved to the correct file
const sharedInputFilePath = path.join(parentDir, "input");

const readInput = () => {
  const inputPath = require.main.filename.slice(0, -2) + "input";
  if (!fs.existsSync(dayInputFilePath)) {
    const input = fs
      .readFileSync(sharedInputFilePath)
      .toString("utf-8")
      .replaceAll("\r\n", "\n");

    fs.writeFileSync(dayInputFilePath, input);
    fs.writeFileSync(sharedInputFilePath, "");
  }

  return fs.readFileSync(inputPath).toString("utf-8").replaceAll("\r\n", "\n");
};

module.exports.inputStr = readInput();

const origLogger = console.log;
module.exports.origLogger = origLogger;
let allLogs = [];
let cacheLogs = false;
console.log = (message, ...optionalParams) => {
  if (cacheLogs) {
    allLogs.push([message, ...optionalParams].join(", "));
  } else {
    origLogger(message, ...optionalParams);
  }
};

let examplesFailed = false;
let runPart2 = true;
module.exports.example = (name, fn, input, expected, verbose = true) => {
  allLogs = [];
  cacheLogs = true;
  setPrintLength(verbose ? 10_000 : 3);

  if (name === "Part2" && expected === 0) {
    runPart2 = false;
    origLogger(`Skipping part 2 due to expected result being 0`);
    return;
  }

  try {
    console.log(`===== Running test ${name} =====`);
    console.log(`${formatInput(input, verbose)}\n`);

    const result = fn(new LoggedString(input));

    console.log(`\n===== Run completed =====`);
    if (result != expected) {
      console.log(`Wrong answer "${result}" (expected ${expected})`);
      origLogger(
        `Example ${name} failed with result "${result}" (expected ${expected})`
      );
      examplesFailed = true;
    } else {
      console.log(`Correct answer "${result}"`);
      origLogger(`Example ${name} succeeded with result "${result}"`);
    }
  } finally {
    cacheLogs = false;
    fs.writeFileSync(parentDir + `/out/Test-${name}.txt`, allLogs.join("\n"));
  }
};

const answers = [];
module.exports.answer = (name, fn, verbose = false) => {
  if (!runPart2 && name === "Part2") {
    return;
  }

  allLogs = [];
  cacheLogs = true;
  setPrintLength(verbose ? 10_000 : 3);

  try {
    console.log(`===== Running live ${name} =====`);
    console.log(`${formatInput(this.inputStr, verbose)}\n\n`);

    const result = fn(new LoggedString(this.inputStr));

    console.log(`\n===== Run completed =====`);
    console.log(`${name} got answer "${result}"`);
    origLogger(`${name} got answer "${result}"`);
  } finally {
    cacheLogs = false;
    fs.writeFileSync(parentDir + `/out/${name}.txt`, allLogs.join("\n"));
  }
};

function formatInput(str, verbose) {
  const MAX_LINE_LENGTH = 50;
  const START_END_ROWS = 3;

  if (verbose) {
    if (!str.includes("\n")) {
      return `Input (length=${str.length}): "${str}"`;
    }
    return `Input (length=${str.length}, rows=${
      str.split("\n").length
    }):\n=== === ===\n${str}\n=== === ===`;
  }

  if (!str.includes("\n")) {
    return `Input (length=${str.length}): "${formatRow(str, MAX_LINE_LENGTH)}"`;
  }

  const rows = str.split("\n");

  let res = [
    `Input (length=${str.length}, rows=${rows.length}):`,
    "=== === ===",
  ];
  for (let i = 0; i < Math.min(START_END_ROWS, rows.length); i++) {
    res.push(formatRow(rows[i], MAX_LINE_LENGTH));
  }

  if (rows.length > MAX_LINE_LENGTH * 2) {
    res.push("...");
  }

  const from = Math.max(START_END_ROWS, rows.length - START_END_ROWS);
  for (let i = from; i < rows.length; i++) {
    res.push(formatRow(rows[i], MAX_LINE_LENGTH));
  }
  res.push("=== === ===");
  return res.join("\n");
}

function formatRow(row, maxLength) {
  if (row.length <= maxLength) {
    return row;
  }

  return `${row.slice(0, maxLength - 10)}...${row.slice(-7)}`;
}
