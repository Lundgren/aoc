#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const AdventOfCodeFetcher = require("./utils/aoc_fetcher");
const { sessionCookie } = require("./utils/envvars");

const args = process.argv.slice(2);
const now = new Date();

const year = args[0] || now.getFullYear();
const day = args[1] || now.getDate();

const dayFolder = `${year}`;
const dayFile = `${year}/day${day}.js`;
const inputFile = `${year}/day${day}.input`;
const templateFile = "template.js";

const fetcher = new AdventOfCodeFetcher(sessionCookie);

function ensureDayFile() {
  if (!fs.existsSync(dayFolder)) {
    fs.mkdirSync(dayFolder, { recursive: true });
  }

  if (!fs.existsSync(dayFile)) {
    fs.copyFileSync(templateFile, dayFile);
    fs.writeFileSync(inputFile, "");
    console.log(`Template copied to ${dayFile}`);
  }

  if (
    fs.existsSync(inputFile) &&
    fs.readFileSync(inputFile, "utf8").trim() === ""
  ) {
    fetcher
      .fetchInput(year, day)
      .then((data) => {
        fs.writeFileSync(inputFile, data);
        console.log(`Input data fetched and written to ${inputFile}`);
      })
      .catch((err) => {
        console.error(`Failed to fetch input data: ${err.message}`);
      });
  }
}

let currentProcess = null;
let timerStart = null;

function killCurrentProcess() {
  if (currentProcess) {
    currentProcess.removeAllListeners();
    currentProcess.kill("SIGKILL");
    currentProcess = null;
  }
}

function startWatching() {
  console.log(`Running ${dayFile} in watch mode...\n`);
  killCurrentProcess();

  currentProcess = spawn("node", ["--watch", dayFile], { stdio: "inherit" });
  currentProcess.on("exit", () => console.log("Watch process exited."));
}

function startManual() {
  console.log(`Running ${dayFile} in manual mode. Press any key to re-run.\n`);
  killCurrentProcess();

  function runWithTimer() {
    killCurrentProcess();

    timerStart = Date.now();
    currentProcess = spawn("node", [dayFile], { stdio: "inherit" });
    console.log(`\n===== ===== =====`);

    currentProcess.on("exit", () => {
      const duration = ((Date.now() - timerStart) / 1000).toFixed(2);
      console.log(`\nExecution completed in ${duration} seconds.`);
    });
  }

  runWithTimer();

  const onData = (key) => {
    if (key.toString() === "\u0003" || key.toString() === "\u001b") {
      console.log("\nExiting...");
      process.stdin.removeListener("data", onData);
      process.exit();
    }

    runWithTimer();
  };

  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.removeAllListeners("data");
  process.stdin.on("data", onData);
}

function handleExit() {
  console.log("\nExiting...");
  killCurrentProcess();
  process.exit();
}

function main() {
  ensureDayFile();

  startWatching();

  const onKeyPress = (key) => {
    if (key.toString() === "\u0003" || key.toString() === "\u001b") {
      handleExit();
    }

    process.stdin.setRawMode(false);
    process.stdin.pause();
    process.stdin.removeListener("data", onKeyPress);
    startManual();
  };

  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.on("data", onKeyPress);

  process.on("SIGINT", handleExit); // Handle Ctrl+C globally
  process.on("SIGTERM", handleExit); // Handle termination signal
}

main();
