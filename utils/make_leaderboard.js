const fs = require("fs");
const path = require("path");

const AdventOfCodeFetcher = require("./aoc_fetcher");
const { sessionCookie, leaderboardIds } = require("./envvars");

const args = process.argv.slice(2);

if (args.length === 1) {
  const filePath = args[0];
  if (
    !fs.existsSync(filePath) ||
    fs.readFileSync(filePath, "utf8").trim() === ""
  ) {
    throw new Error("Provided file path is empty or doesn't exist.");
  }

  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  printLeaderboard(data);
} else {
  const fetcher = new AdventOfCodeFetcher(sessionCookie);
  const currentYear = new Date().getFullYear();
  for (const id of leaderboardIds) {
    fetcher.fetchLeaderboard(id, currentYear).then(printLeaderboard);
  }
}

function printLeaderboard(data) {
  const players = Object.values(data.members);
  const day1StartTime = data.day1_ts;
  const leaderboardId = data.owner_id;

  const currentDay =
    Math.floor((Date.now() / 1000 - day1StartTime) / (24 * 60 * 60)) + 1;

  function getTime(seconds) {
    if (seconds === Infinity) {
      return "N/A";
    }
    if (seconds == 0) {
      return "-";
    }
    if (seconds > 24 * 60 * 60) {
      return `${Math.round(seconds / (24 * 60 * 60))} day(s)`;
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

  const playerStar2Deltas = {};
  for (let day = 1; day <= currentDay; day++) {
    const startTime = day1StartTime + (day - 1) * 24 * 60 * 60;

    outputMd += `## Day ${day}\n`;
    outputMd += `| Rank | Name | Star 1 Time | Star 2 Time | Time After Winner | Star 1 -> Star 2 | Day Points | Total Points |\n`;
    outputMd += `|------|------|-------------|-------------|-------------------|------------------|------------|--------------|\n`;

    const dayStats = [];
    for (const player of players) {
      const name = player.name || `Anonymous (${player.id})`;
      const stars = player.completion_day_level[`${day}`];

      if (stars && stars["1"]) {
        const star1Time = stars["1"].get_star_ts - startTime;
        const star2Time = (stars["2"]?.get_star_ts || Infinity) - startTime;
        const star2Delta = star2Time - star1Time;

        if (star2Delta !== Infinity) {
          playerStar2Deltas[name] = playerStar2Deltas[name] || {
            name,
            tot: 0,
            deltas: [],
          };
          playerStar2Deltas[name].deltas.push(star2Delta);
          playerStar2Deltas[name].tot += star2Delta;
        }

        dayStats.push({
          name,
          star1Time,
          star2Time,
          star2Delta,
        });
      }
    }

    // Calculate star 2
    dayStats.sort((a, b) => a.star2Time - b.star2Time);
    for (let i = 0; i < dayStats.length; i++) {
      const player = dayStats[i];
      player.star2Points =
        player.star2Time == Infinity ? 0 : players.length - i;
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
      )} | ${getTime(player.star2Delta)} | ${
        player.star1Points + player.star2Points
      } | ${playerPoints[player.name]} |\n`;
    }

    outputMd += `\n\n`;
  }

  outputMd += `## Star 2 Leaderboard\n`;
  outputMd += `| Rank | Name | Time to Star 2 | Time n-1 | Time n-2 | Time n-3 | Time n-4 |\n`;
  outputMd += `|------|------|----------------|----------|----------|----------|----------|\n`;

  const completedAll = Object.values(playerStar2Deltas).filter(
    (p) => p.deltas.length >= currentDay - 2
  );
  completedAll.sort((a, b) => {
    if (a.deltas.length === b.deltas.length) {
      return a.tot - b.tot;
    }
    return b.deltas.length - a.deltas.length;
  });

  for (let i = 0; i < completedAll.length; i++) {
    const p = completedAll[i];
    p.deltas.sort((a, b) => a - b);

    const gt = (arr, count) => {
      if (arr.length < count) {
        return "-";
      }
      const tot = arr.slice(0, count).reduce((a, b) => a + b, 0);
      return getTime(tot);
    };

    const t1 = gt(p.deltas, currentDay);
    const t2 = gt(p.deltas, currentDay - 1);
    const t3 = gt(p.deltas, currentDay - 2);
    const t4 = gt(p.deltas, currentDay - 3);
    const t5 = gt(p.deltas, currentDay - 4);

    outputMd += `| ${i + 1} | ${
      p.name
    } | ${t1} | ${t2} | ${t3} | ${t4} | ${t5} |\n`;
  }

  outputMd += `\n\n`;
  outputMd += `*Column 3 is the total time taken between star 1 & 2 independent of start time. Columns 4-7 shows the same with the worst 1-4 days removed from the sum.*`;

  fs.writeFileSync(`leaderboard-${leaderboardId}.md`, outputMd);
}
