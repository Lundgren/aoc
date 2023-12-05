const { example, answer, inputStr } = require("../utils/helper.js");

const testInput = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;

const toMap = (str) => {
  const [_title, ...mappingStr] = str.split("\n");

  const mappings = mappingStr.map((s) => s.split(" ").map(Number));

  return (val) => {
    for (const mapping of mappings) {
      const [dest, source, length] = mapping;

      if (val >= source && val <= source + length) {
        const diff = val - source;
        return dest + diff;
      }
    }

    return val;
  };
};

const solution1 = (input) => {
  const [seedStr, ...mapStr] = input.split("\n\n");

  const seeds = [...seedStr.matchAll(/\d+/g)].map((r) => r[0]);

  const maps = mapStr.map((s) => toMap(s));

  let smallest = 1e50;
  for (const seed of seeds) {
    let val = seed;
    for (const map of maps) {
      val = map(val);
    }

    if (val < smallest) {
      smallest = val;
    }
  }

  return smallest;
};

const toReverseMap = (str) => {
  const [_title, ...mappingStr] = str.split("\n");

  const mappings = mappingStr.map((s) => s.split(" ").map(Number));

  return (val) => {
    for (const mapping of mappings) {
      const [dest, source, length] = mapping;

      if (val >= dest && val <= dest + length) {
        const diff = val - dest;
        return source + diff;
      }
    }

    return val;
  };
};

const solution2 = (input) => {
  const [seedStr, ...mapStr] = input.split("\n\n");

  const seeds = [...seedStr.matchAll(/\d+/g)].map((r) => r[0]).map(Number);

  const maps = mapStr.map((s) => toReverseMap(s)).reverse();

  // Brute force from 0 until a valid seed is found, takes ~5min to run
  let i = 0;
  while (true) {
    i++;

    let val = i;
    for (const map of maps) {
      val = map(val);
    }

    for (let s = 0; s < seeds.length; s += 2) {
      let start = seeds[s];
      let length = seeds[s + 1];

      if (val >= start && val <= start + length) {
        return i;
      }
    }
  }
};

example("Part1", solution1, testInput, 35);
answer("Part1", solution1);

example("Part2", solution2, testInput, 46);
answer("Part2", solution2);
