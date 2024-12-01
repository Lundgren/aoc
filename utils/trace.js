// Add some trace functions that can be used when chaining array functions.
// [].trace()
// [].mapT(fn)
// [].reduceT(fn, start)

// trace() will print the array and return a traced array that also prints later operations
Array.prototype.trace = function (first = 3, last = 3, fn = (x, i) => x) {
    printHeader(`Array(${this.length}).trace()`);
    printArray(this, fn, first, last);
    printFooter(`Array (${this.length}) (unaltered)`);
    const arr = new TracedArray(result);
    arr.setPrint(this.verbose ? 100000 : 3, 3);
    return arr;
  };
  
  Array.prototype.mapT = function (fn, first = 3, last = 3) {
    const result = this.map(fn);
    printHeader(`Array(${this.length}).map(fn)`);
    printArray(this, (val, i) => `${val} => ${result[i]}`, first, last);
    printFooter(`Array (${result.length})`);
    return result;
  };
  
  Array.prototype.reduceT = function (fn, start, first = 3, last = 3) {
    printHeader(`Array(${this.length}).reduce(fn, ${start})`);
    printArray(
      this,
      (val, i) => {
        const before = i === 0 ? start : this.slice(0, i).reduce(fn, start);
        return `(${before}, ${val}) => ${fn(before, val, i, this)}`;
      },
      first,
      last
    );
  
    const result = this.reduce(fn, start);
    printFooter(`${result}`);
    return result;
  };
  
  Array.prototype.filterT = function (fn, printKeeps = 3, printDiscards = 3) {
    printHeader(`Array(${this.length}).filter(fn)`);
    if (printKeeps + printDiscards >= this.length) {
      for (let i = 0; i < this.length; i++) {
        console.log(
          ` - [${i}]: ${this[i]} => ${
            fn(this[i], i, this) ? "kept" : "discarded"
          }`
        );
      }
    } else {
      if (printKeeps > 0) {
        console.log(`First ${printKeeps} that are kept:`);
        let kept = 0;
        for (let i = 0; i < this.length && kept < printKeeps; i++) {
          if (fn(this[i], i, this)) {
            console.log(` - [${i}]: ${this[i]}`);
            kept++;
          }
        }
        if (kept === 0) {
          console.log(` - Found no valid items`);
        }
      }
  
      if (printDiscards > 0) {
        console.log(`First ${printDiscards} that are discarded:`);
        let discarded = 0;
        for (let i = 0; i < this.length && discarded < printDiscards; i++) {
          if (!fn(this[i], i, this)) {
            console.log(` - [${i}]: ${this[i]}`);
            discarded++;
          }
        }
        if (discarded === 0) {
          console.log(` - Found no valid items`);
        }
      }
    }
  
    const result = this.filter(fn);
    printFooter(`Array(${result.length})`);
    return result;
  };
  
  function printHeader(header) {
    console.log(`=== ${header} ===`);
  }
  
  function printFooter(footer) {
    console.log(`=== Out ${footer} ===`);
  }
  
  function printArray(arr, fn, first, last) {
    for (let i = 0; i < Math.min(first, arr.length); i++) {
      console.log(fn(arr[i], i));
    }
  
    if (arr.length > first + last) {
      console.log(`...`);
    }
  
    const from = Math.max(first, arr.length - last);
    for (let i = from; i < arr.length; i++) {
      console.log(fn(arr[i], i));
    }
  }
  
  class TracedArray extends Array {
    constructor(arr, printFirst, printLast) {
      super(arr);
      this.arr = arr;
      this.printFirst = printFirst;
      this.printLast = printLast;
    }
    setPrint(printFirst, printLast) {
      this.printFirst = printFirst;
      this.printLast = printLast;
    }
    get length2() {
      return this.arr.length;
    }
    get length() {
      return this.arr.length;
    }
    map(fn) {
      return new TracedArray(
        this.arr.mapT(fn, this.printFirst, this.printLast),
        this.printFirst,
        this.printLast
      );
    }
    reduce(fn, initialVal) {
      return this.arr.reduceT(fn, initialVal, this.printFirst, this.printLast);
    }
    filter(fn) {
      return new TracedArray(
        this.arr.filterT(fn, this.printFirst, this.printLast),
        this.printFirst,
        this.printLast
      );
    }
    forEach(fn) {
      this.arr.forEach(fn);
    }
  }
  
  class TracedString extends String {
    constructor(str, verbose = false) {
      super(str);
      this.verbose = verbose;
    }
    split(separator, limit) {
      printHeader(
        `String(length=${this.length}).split("${
          separator == "\n" ? "\\n" : separator
        }")`
      );
      console.log(formatStr(this, this.verbose));
  
      const result = super.split(separator, limit);
      printFooter(`Array(${result.length})`);
      const arr = new TracedArray(result);
      arr.setPrint(this.verbose ? 100000 : 3, 3);
      return arr;
    }
    splitTrue(separator, limit) {
      return super.split(separator, limit);
    }
  }
  
  function formatStr(str, verbose) {
    const MAX_LINE_LENGTH = 50;
    const START_END_ROWS = 3;
  
    if (verbose) {
      return str;
    }
  
    if (!str.includes("\n")) {
      return formatRow(str, MAX_LINE_LENGTH);
    }
  
    const rows = str.splitTrue("\n");
  
    let res = [];
    for (let i = 0; i < Math.min(START_END_ROWS, rows.length); i++) {
      res.push(formatRow(rows[i], MAX_LINE_LENGTH))
    }
  
    if (rows.length > MAX_LINE_LENGTH * 2) {
      res.push('...');
    }
  
    const from = Math.max(START_END_ROWS, rows.length - START_END_ROWS);
    for (let i = from; i < rows.length; i++) {
      res.push(formatRow(rows[i], MAX_LINE_LENGTH))
    }
    return res.join('\n');
  }
  
  function formatRow(row, maxLength) {
    if (row.length <= maxLength) {
      return row;
    }
  
    return `${row.slice(0, maxLength - 10)}...${row.slice(-7)}`;
  }
  
  module.exports.TracedArray = TracedArray;
  module.exports.TracedString = TracedString;
  