const { example, answer, inputStr } = require("../utils/helper.js");

const testInput = `2333133121414131402`;

const solution1 = (input) => {
  let ans = BigInt(0);

  let disk = [];
  for (let i = 0; i < input.length; i += 2) {
    const file = parseInt(input.substr(i, 1));
    const space = parseInt(input.substr(i + 1, 1));
    for (let j = 0; j < file; j++) {
      disk.push(i / 2);
    }
    for (let j = 0; j < space; j++) {
      disk.push(-1);
    }
  }

  let last = disk.length - 1;
  for (let i = 0; i < last; i++) {
    if (disk[i] === -1) {
      disk[i] = disk[last];
      disk[last] = -1;
      last--;
      while (disk[last] === -1) {
        last--;
      }
    }
  }

  while (disk[last] === -1) {
    last--;
  }

  for (let i = 0; i <= last; i++) {
    ans += BigInt(parseInt(disk[i])) * BigInt(i);
  }

  return ans;
};

const solution2 = (input) => {
  let ans = BigInt(0);
  let files = [];

  let pos = 0;
  for (let i = 0; i < input.length; i += 2) {
    const size = parseInt(input.substr(i, 1));
    const space = parseInt(input.substr(i + 1, 1));
    files.push({
      id: i / 2,
      size,
      pos: pos,
      moved: false,
    });
    pos += size + space || 0;
  }

  let disk = new Array(pos).fill(-1);
  pos = 0;
  for (let i = 0; i < files.length; i++) {
    for (let j = 0; j < files[i].size; j++) {
      disk[pos + j] = files[i].id;
    }
    pos += files[i].size + parseInt(input.substr(2 * i + 1, 1));
  }

  for (let id = files.length - 1; id >= 0; id--) {
    const file = files[id];
    let bestPos = -1;
    for (let i = 0; i < disk.length - file.size + 1; i++) {
      let canFit = true;
      for (let j = 0; j < file.size; j++) {
        if (disk[i + j] !== -1) {
          canFit = false;
          break;
        }
      }
      if (canFit) {
        bestPos = i;
        break;
      }
    }

    if (bestPos !== -1 && bestPos < file.pos) {
      for (let i = 0; i < file.size; i++) {
        disk[file.pos + i] = -1;
      }
      for (let i = 0; i < file.size; i++) {
        disk[bestPos + i] = file.id;
      }
    }
  }

  for (let i = 0; i < disk.length; i++) {
    if (disk[i] !== -1) {
      ans += BigInt(i) * BigInt(disk[i]);
    }
  }

  return ans;
};

example("Part1", solution1, testInput, 1928);
answer("Part1", solution1);

example("Part2", solution2, testInput, 2858);
answer("Part2", solution2);
