const assert = require("assert");
const fs = require("fs");

const input = fs.readFileSync("day20.input.txt").toString("utf-8");
const inputLines = input.replace(/\r/g, "").split("\n");

const inputTest = fs.readFileSync("day20.input.test.txt").toString("utf-8");
const inputTestLines = inputTest.replace(/\r/g, "").split("\n");

function log(what) {
  if (typeof what === "object") {
    console.log(JSON.stringify(what));
  } else {
    console.log(what);
  }

  return what;
}

const inp = `p=<3,0,0>, v=<2,0,0>, a=<-1,0,0>
p=<4,0,0>, v=<0,0,0>, a=<-2,0,0>`
  .replace(/\r/g, "")
  .split("\n");

const inp2 = `p=<-6,0,0>, v=<3,0,0>, a=<0,0,0>
p=<-4,0,0>, v=<2,0,0>, a=<0,0,0>
p=<-2,0,0>, v=<1,0,0>, a=<0,0,0>
p=<3,0,0>, v=<-1,0,0>, a=<0,0,0>`
  .replace(/\r/g, "")
  .split("\n");

//Run with `Ctrl + Shift + P` and `Enter` ("Run Code")
let particleList = inputLines.map((it, idx) => {
  const parts = it.split(", ");

  return {
    id: idx,
    p: parseOne(parts[0]),
    v: parseOne(parts[1]),
    a: parseOne(parts[2])
  };
});

function parseOne(part) {
  return part
    .substr(3, part.length - 4)
    .split(",")
    .map(Number);
}

function tick(particles) {
  return particles.map(p => {
    const newV = [p.v[0] + p.a[0], p.v[1] + p.a[1], p.v[2] + p.a[2]];
    // log("p: " + p.p[0] + newV[0]);
    return {
      id: p.id,
      //   p: [p.p[0] + p.v[0], p.p[1] + p.v[1], p.p[2] + p.v[2]],
      p: [p.p[0] + newV[0], p.p[1] + newV[1], p.p[2] + newV[2]],
      v: [p.v[0] + p.a[0], p.v[1] + p.a[1], p.v[2] + p.a[2]],
      a: p.a
    };
  });
}

// let pts = particleList;
// for (let i = 0; i < 4; i++) {
//   log(pts);
//   log(pts[0].p[0] + ", " + pts[1].p[0]);
//   pts = tick(pts);
// }
// log(pts);

// let pts = particleList;
// for (let i = 0; i < 1000; i++) {
//   pts = tick(pts);
// }

// const vals2 = particleList.map(p => {
//   return Math.abs(p.a[0]) + Math.abs(p.a[1]) + Math.abs(p.a[2]);
// });

// const vals = particleList.map(p => {
//   return Math.abs(p.p[0]) + Math.abs(p.p[1]) + Math.abs(p.p[2]);
// });

// function indexOfMax(arr) {
//   if (arr.length === 0) {
//     return -1;
//   }

//   var min = arr[0];
//   var maxIndex = 0;

//   for (var i = 1; i < arr.length; i++) {
//     if (arr[i] < min) {
//       maxIndex = i;
//       min = arr[i];
//     }
//   }

//   return maxIndex;
// }

// console.log("Min: " + indexOfMax(vals2));

function tick2(particles) {
  const pts = particles.map(p => {
    const newV = [p.v[0] + p.a[0], p.v[1] + p.a[1], p.v[2] + p.a[2]];
    // log("p: " + p.p[0] + newV[0]);
    return {
      id: p.id,
      //   p: [p.p[0] + p.v[0], p.p[1] + p.v[1], p.p[2] + p.v[2]],
      p: [p.p[0] + newV[0], p.p[1] + newV[1], p.p[2] + newV[2]],
      v: [p.v[0] + p.a[0], p.v[1] + p.a[1], p.v[2] + p.a[2]],
      a: p.a
    };
  });

  const ptsKilled = pts.map(p => {
    const killed = pts.reduce((kill, p2) => {
      return (
        kill ||
        (p.id != p2.id &&
          p.p[0] == p2.p[0] &&
          p.p[1] == p2.p[1] &&
          p.p[2] == p2.p[2])
      );
    }, false);
    return { id: p.id, p: p.p, v: p.v, a: p.a, killed: killed };
  });

  return ptsKilled.filter(p => !p.killed);
}

// let pts = particleList;
// for (let i = 0; i < 4; i++) {
//   log(pts);
//   pts = tick2(pts);
// }
// log(pts);

let pts = particleList;
for (let i = 0; i < 1000; i++) {
  pts = tick2(pts);
}

console.log(pts.length);

for (let i = 0; i < 1000; i++) {
  pts = tick2(pts);
}

console.log(pts.length);
