const { example, answer, inputStr } = require("../utils/helper.js");

const testInput = `ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm

iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929

hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm

hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in`;

const testInput2 = `eyr:1972 cid:100
hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926

iyr:2019
hcl:#602927 eyr:1967 hgt:170cm
ecl:grn pid:012533040 byr:1946

hcl:dab227 iyr:2012
ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277

hgt:59cm ecl:zzz
eyr:2038 hcl:74454a iyr:2023
pid:3556412378 byr:2007

pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980
hcl:#623a2f

eyr:2029 ecl:blu cid:129 byr:1989
iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm

hcl:#888785
hgt:164cm byr:2001 iyr:2015 cid:88
pid:545766238 ecl:hzl
eyr:2022

iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719`;

const solution1 = (input) => {
  const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

  const passports = input
    .split("\n\n")
    .map((passport) => passport.replaceAll("\n", " "))
    .map((passport) => {
      const fields = {};
      passport.split(" ").forEach((str) => {
        const [key, val] = str.split(":");
        fields[key] = val;
      });

      return fields;
    });

  let validPassports = 0;
  for (const passport of passports) {
    let valid = true;
    for (const field of requiredFields) {
      if (!passport.hasOwnProperty(field)) {
        console.log("Missing", field);
        valid = false;
      }
    }
    if (valid) {
      validPassports++;
    }
  }

  return validPassports;
};

const isValid = (passport) => {
  const byr = parseInt(passport.byr);
  if (!byr || byr < 1920 || byr > 2002) {
    return false;
  }

  const iyr = parseInt(passport.iyr);
  if (!iyr || iyr < 2010 || iyr > 2020) {
    return false;
  }

  const eyr = parseInt(passport.eyr);
  if (!eyr || eyr < 2020 || eyr > 2030) {
    return false;
  }

  const type = passport.hgt?.substring(passport.hgt.length - 2);
  const length = parseInt(passport.hgt?.substring(0, passport.hgt.length - 2));
  if (type && type == "cm") {
    if (!length || length < 150 || length > 193) {
      return false;
    }
  } else if (type && type == "in") {
    if (!length || length < 59 || length > 76) {
      return false;
    }
  } else {
    return false;
  }

  if (!passport.hcl?.match(/^#[0-9a-f]+$/i)) {
    return false;
  }

  const validEyeColors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
  if (validEyeColors.findIndex((c) => c == passport.ecl) === -1) {
    return false;
  }

  const pid = passport.pid || "";
  if (pid.length != 9 || isNaN(parseInt(pid))) {
    return false;
  }

  return true;
};

const solution2 = (input) => {
  const passports = input
    .split("\n\n")
    .map((passport) => passport.replaceAll("\n", " "))
    .map((passport) => {
      const fields = {};
      passport.split(" ").forEach((str) => {
        const [key, val] = str.split(":");
        fields[key] = val;
      });

      return fields;
    });

  let validPassports = 0;
  for (const passport of passports) {
    if (isValid(passport)) {
      validPassports++;
    }
  }

  return validPassports;
};

example("Part1", solution1, testInput, 2);
answer("Part1", solution1);

example("Part2", solution2, testInput2, 4);
answer("Part2", solution2);
