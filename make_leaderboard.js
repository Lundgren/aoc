const fs = require("fs");
const path = require("path");

const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, "leaderboard.json"), "utf8")
);

const players = Object.values(data.members);
const day1StartTime = data.day1_ts;

const currentDay =
  Math.floor((Date.now() / 1000 - day1StartTime) / (24 * 60 * 60)) + 1;

function getTime(seconds) {
  if (seconds === Infinity) {
    return "N/A";
  }
  if (seconds == 0) {
    return "-";
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

const playerPoints = {};
for (const player of players) {
  playerPoints[player.name || `Anonymous (${player.id})`] = 0;
}

let outputMd = "";

for (let day = 1; day <= currentDay; day++) {
  const startTime = day1StartTime + (day - 1) * 24 * 60 * 60;

  outputMd += `## Day ${day}\n`;
  outputMd += `| Rank | Name | Star 1 Time | Star 2 Time | Time After Winner | Star 1 -> Star 2 | Day Points | Total Points |\n`;
  outputMd += `|------|------|------------|-------------|------------------|------------------|------------|-------------|\n`;

  const dayStats = [];
  for (const player of players) {
    const name = player.name || `Anonymous (${player.id})`;
    const stars = player.completion_day_level[`${day}`];

    if (stars && stars["1"]) {
      const star1Time = stars["1"].get_star_ts - startTime;
      const star2Time = (stars["2"]?.get_star_ts || Infinity) - startTime;

      dayStats.push({
        name,
        star1Time,
        star2Time,
        star2Delay: star2Time ? star2Time - star1Time : Infinity,
      });
    }
  }

  // Calculate star 2
  dayStats.sort((a, b) => a.star2Time - b.star2Time);
  for (let i = 0; i < dayStats.length; i++) {
    const player = dayStats[i];
    player.star2Points = player.star2Time == Infinity ? 0 : players.length - i;
    player.star1RelativeTime = player.star2Time - dayStats[0].star2Time;
  }

  // Calculate star 1
  dayStats.sort((a, b) => a.star1Time - b.star1Time);
  for (let i = 0; i < dayStats.length; i++) {
    const player = dayStats[i];
    player.star1Points = players.length - i;
    player.star1RelativeTime = player.star1Time - dayStats[0].star1Time;

    playerPoints[player.name] += player.star1Points + player.star2Points;

    outputMd += `| ${i + 1} | ${player.name} | ${getTime(
      player.star1Time
    )} | ${getTime(player.star2Time)} | ${getTime(
      player.star1RelativeTime
    )} | ${getTime(player.star2Delay)} | ${
      player.star1Points + player.star2Points
    } | ${playerPoints[player.name]} |\n`;
  }

  outputMd += `\n\n`;
}

fs.writeFileSync("leaderboard.md", outputMd);
