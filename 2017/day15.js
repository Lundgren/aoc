const assert = require("assert");

function* makeGenerator(factor, start, multipleCriteria = 1) {
  let value = start;
  while (true) {
    value = (value * factor) % 2147483647;
    if (value % multipleCriteria == 0) {
      yield value;
    }
  }
}

const testGenA = makeGenerator(16807, 65);
const testGenB = makeGenerator(48271, 8921);

assert.equal(testGenA.next().value, 1092455);
assert.equal(testGenA.next().value, 1181022009);
assert.equal(testGenA.next().value, 245556042);
assert.equal(testGenA.next().value, 1744312007);
assert.equal(testGenA.next().value, 1352636452);

assert.equal(testGenB.next().value, 430625591);
assert.equal(testGenB.next().value, 1233683848);
assert.equal(testGenB.next().value, 1431495498);
assert.equal(testGenB.next().value, 137874439);
assert.equal(testGenB.next().value, 285222916);

const binaryMatch = (valA, valB) => (valA & 0xffff) == (valB & 0xffff);

assert.equal(false, binaryMatch(1092455, 430625591));
assert.equal(true, binaryMatch(245556042, 1431495498));

const countBinaryMatch = (genA, genB, rounds = 40000000) => {
  let count = 0;
  for (let i = 0; i < rounds; i++) {
    count += binaryMatch(genA.next().value, genB.next().value);
  }

  return count;
};

assert.equal(
  588,
  countBinaryMatch(makeGenerator(16807, 65), makeGenerator(48271, 8921))
);

let pairs = countBinaryMatch(
  makeGenerator(16807, 618),
  makeGenerator(48271, 814)
);

console.log(`Judge counted ${pairs} matching pairs`);

const testGenA2 = makeGenerator(16807, 65, 4);
const testGenB2 = makeGenerator(48271, 8921, 8);

assert.equal(testGenA2.next().value, 1352636452);
assert.equal(testGenA2.next().value, 1992081072);
assert.equal(testGenA2.next().value, 530830436);

assert.equal(testGenB2.next().value, 1233683848);
assert.equal(testGenB2.next().value, 862516352);
assert.equal(testGenB2.next().value, 1159784568);

let pairs2 = countBinaryMatch(
  makeGenerator(16807, 618, 4),
  makeGenerator(48271, 814, 8),
  5000000
);

console.log(`Judge counted ${pairs2} matching pairs in the second round`);
