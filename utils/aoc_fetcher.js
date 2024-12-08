const https = require("https");

class AdventOfCodeFetcher {
  constructor(sessionCookie) {
    this.sessionCookie = sessionCookie;
  }

  async fetchInput(year, day) {
    if (!this.sessionCookie || !year || !day) {
      console.log("Session cookie, year and day are required to fetch input.");
      return "";
    }

    const url = `https://adventofcode.com/${year}/day/${day}/input`;
    const currentTime = new Date();

    const releaseTime = new Date(Date.UTC(year, 11, day - 1, 5, 0, 0));
    if (currentTime < releaseTime) {
      const waitTime = releaseTime - currentTime + 15000;
      await this.#sleep(waitTime);
    }

    return await this.#fetchData(url);
  }

  async fetchLeaderboard(id, year) {
    if (!this.sessionCookie || !id || !year) {
      throw new Error(
        "Session cookie, id and year are required to fetch leaderboard data."
      );
    }
    const url = `https://adventofcode.com/${year}/leaderboard/private/view/${id}.json`;
    return this.#fetchData(url);
  }

  #fetchData(url) {
    return new Promise((resolve, reject) => {
      const options = {
        headers: {
          Cookie: `session=${this.sessionCookie}`,
        },
      };

      https
        .get(url, options, (res) => {
          if (res.statusCode !== 200) {
            reject(
              new Error(`Request failed with status code ${res.statusCode}`)
            );
            return;
          }

          let data = "";
          res.on("data", (chunk) => {
            data += chunk;
          });

          res.on("end", () => resolve(JSON.parse(data)));
        })
        .on("error", (err) => reject(err));
    });
  }

  #sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

module.exports = AdventOfCodeFetcher;
