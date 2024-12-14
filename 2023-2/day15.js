const { example, answer, inputStr } = require("../utils/helper.js");

const testInput = `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`;

const hash = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash += str.charCodeAt(i);
    hash *= 17;
    hash %= 256;
  }
  return hash;
};

const solution1 = (input) => {
  let tot = 0;
  input.split(",").forEach((str) => {
    tot += hash(str);
  });

  return tot;
};

const solution2 = (input) => {
  const boxes = {};

  input.split(",").forEach((str) => {
    let id, op, lens;
    if (str.endsWith("-")) {
      id = str.slice(0, -1);
      op = "-";
    } else {
      [id, lens] = str.split("=");
      op = "=";
    }

    const box = hash(id);
    const arr = boxes[box] || [];
    let idx = arr.findIndex((x) => x.id === id);
    if (op == "=") {
      if (idx !== -1) {
        arr[idx].lens = lens;
      } else {
        arr.push({ id, lens });
      }
    } else if (idx !== -1) {
      arr.splice(idx, 1);
    }
    boxes[box] = arr;
  });
  console.log(JSON.stringify(boxes, null, 2));

  let tot = 0;
  Object.entries(boxes).forEach(([box, arr]) => {
    for (let i = 0; i < arr.length; i++) {
      tot += (parseInt(box) + 1) * (i + 1) * arr[i].lens;
    }
  });

  return tot;
};

example("Part1", solution1, testInput, 1320);
answer("Part1", solution1);

example("Part2", solution2, testInput, 145);
answer("Part2", solution2);
