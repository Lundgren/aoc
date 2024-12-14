const fs = require("fs");

// Load session cookie from .env file
const envFilePath = ".env";
if (fs.existsSync(envFilePath)) {
  const envContent = fs.readFileSync(envFilePath, "utf8");
  envContent.split("\n").forEach((line) => {
    const [key, value] = line.split("=");
    if (key && value) {
      process.env[key.trim()] = value.trim();
    }
  });
}

module.exports = {
  sessionCookie: process.env.AOC_SESSION || "",
  leaderboardIds: (process.env.LEADERBOARDS || "").split(","),
};
