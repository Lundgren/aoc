const assert = require("assert");

const input = `set i 31
set a 1
mul p 17
jgz p p
mul a 2
add i -1
jgz i -2
add a -1
set i 127
set p 618
mul p 8505
mod p a
mul p 129749
add p 12345
mod p a
set b p
mod b 10000
snd b
add i -1
jgz i -9
jgz a 3
rcv b
jgz b -1
set f 0
set i 126
rcv a
rcv b
set p a
mul p -1
add p b
jgz p 4
snd a
set a b
jgz 1 3
snd b
set f 1
add i -1
jgz i -11
snd a
jgz f -16
jgz a -19`.split("\n");

const get = (id, registry) => {
  if (isNaN(id)) {
    return registry[id];
  }

  return parseInt(id);
};

const playDuet = instructions => {
  const registry = {};
  let pc = 0,
    sound;

  while (true) {
    const [instruction, x, y] = instructions[pc].split(" ");

    switch (instruction) {
      case "snd":
        sound = get(x, registry);
        break;
      case "set":
        registry[x] = get(y, registry);
        break;
      case "add":
        registry[x] += get(y, registry);
        break;
      case "mul":
        registry[x] *= get(y, registry);
        break;
      case "mod":
        registry[x] %= get(y, registry);
        break;
      case "rcv":
        if (registry[x] != 0) {
          return sound;
        }
        break;
      case "jgz":
        if (registry[x] > 0) {
          pc += get(y, registry) - 1;
        }
        break;
    }
    pc++;
  }
};

const testInput1 =
  "set a 1\nadd a 2\nmul a a\nmod a 5\nsnd a\nset a 0\nrcv a\njgz a -1\nset a 1\njgz a -2";
assert(4 == playDuet(testInput1.split("\n")));

console.log(`The recovered frequency is ${playDuet(input)}`);

class Program {
  constructor(programId, instructions) {
    this.instructions = instructions;
    this.registry = { p: programId };
    this.pc = 0;
    this.queue = [];
    this.waiting = false;
  }

  isWaiting() {
    return this.waiting;
  }

  receive(value) {
    this.queue.push(value);
  }

  execute(id) {
    const [instruction, x, y] = this.instructions[this.pc].split(" ");

    switch (instruction) {
      case "snd":
        this.pc++;
        return this.get(x);
        break;
      case "set":
        this.registry[x] = this.get(y);
        break;
      case "add":
        this.registry[x] += this.get(y);
        break;
      case "mul":
        this.registry[x] *= this.get(y);
        break;
      case "mod":
        this.registry[x] %= this.get(y);
        break;
      case "rcv":
        if (this.queue.length > 0) {
          this.waiting = false;
          this.registry[x] = this.queue.shift();
        } else {
          this.waiting = true;
          return;
        }
        break;
      case "jgz":
        if (this.get(x) > 0) {
          this.pc += this.get(y) - 1;
        }
        break;
    }

    this.pc++;
  }

  get(id) {
    if (isNaN(id)) {
      return this.registry[id];
    }

    return parseInt(id);
  }
}

const run2Programs = instructions => {
  const prog0 = new Program(0, instructions);
  const prog1 = new Program(1, instructions);
  let prog1Sent = 0;

  while (!prog0.isWaiting() || !prog1.isWaiting()) {
    const sendTo1 = prog0.execute(0);
    const sendTo0 = prog1.execute(1);

    if (sendTo1 != undefined) {
      prog1.receive(sendTo1);
    }
    if (sendTo0 != undefined) {
      prog1Sent++;
      prog0.receive(sendTo0);
    }
  }

  return prog1Sent;
};

const testInput2 = "snd 1\nsnd 2\nsnd p\nrcv a\nrcv b\nrcv c\nrcv d";
assert(3 == run2Programs(testInput2.split("\n")));

console.log(`Program 1 sent ${run2Programs(input)} times`);
