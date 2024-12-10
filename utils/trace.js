const MAX_LINE_LENGTH = 50;
let printAmount = 3;

// trace() will print the array and return a traced array that also prints later operations
Array.prototype.trace = function () {
  printHeader(`Array(${this.length}).trace()`);
  printArray(this, (x) => valueToString(x));
  printFooter(`Array (${this.length}) (unaltered)`);
  return new LoggedArray(...this);
};

class LoggedArray extends Array {
  map(fn) {
    const result = super.map(fn);
    printHeader(`Array(${this.length}).map(fn)`);
    printArray(this, (val, i) => `${val} => ${valueToString(result[i])}`);
    printFooter(`Array (${result.length})`);
    return result;
  }
  filter(fn) {
    const result = super.filter(fn);
    printHeader(`Array(${this.length}).filter(fn)`);
    printFilterArray(this, fn);
    printFooter(`Array(${result.length})`);
    return result;
  }
  reduceNoLog(fn, initialValue) {
    return super.reduce(fn, initialValue);
  }
  reduce(fn, initialValue) {
    const result = super.reduce(fn, initialValue);
    printHeader(`Array(${this.length}).reduce(fn, ${initialValue})`);
    printArray(this, (val, i) => {
      const before =
        i === 0 ? initialValue : this.slice(0, i).reduceNoLog(fn, initialValue);
      return `(${before}, ${val}) => ${fn(before, val, i, this)}`;
    });
    printFooter(`${result}`);
    return result;
  }
  //   forEach(fn) {}
  //   slice(start, end) {}
  //   sort(sortFn) {}
}

class LoggedString extends String {
  split(separator, limit) {
    const result = super.split(separator, limit);
    printHeader(
      `String(length=${this.length}).split("${separator.replaceAll(
        "\n",
        "\\n"
      )}")`
    );
    printArray(result, (x) => valueToString(x));

    printFooter(`Array(${result.length})`);
    return new LoggedArray(...result);
  }
}

function valueToString(val) {
  if (typeof val === "object" && !Array.isArray(val) && val !== null) {
    return JSON.stringify(val, null, 2);
  }
  return String(val);
}

function printHeader(header) {
  console.log(`=== ${header} ===`);
}

function printFooter(footer) {
  console.log(`=== Out ${footer} ===`);
}

function printArray(arr, fn) {
  for (let i = 0; i < Math.min(printAmount, arr.length); i++) {
    console.log(fn(arr[i], i));
  }

  if (arr.length > printAmount * 2) {
    console.log(`...`);
  }

  const from = Math.max(printAmount, arr.length - printAmount);
  for (let i = from; i < arr.length; i++) {
    console.log(fn(arr[i], i));
  }
}

function printFilterArray(arr, fn) {
  if (arr.length <= printAmount * 2) {
    for (let i = 0; i < arr.length; i++) {
      console.log(
        ` - [${i}]: ${valueToString(arr[i])} => ${
          fn(arr[i], i, arr) ? "kept" : "discarded"
        }`
      );
    }
  } else {
    console.log(`First ${printAmount} that are kept:`);
    let kept = 0;
    for (let i = 0; i < arr.length && kept < printAmount; i++) {
      if (fn(arr[i], i, arr)) {
        console.log(` - [${i}]: ${valueToString(arr[i])}`);
        kept++;
      }
    }
    if (kept === 0) {
      console.log(` - Found no valid items`);
    }

    console.log(`First ${printAmount} that are discarded:`);
    let discarded = 0;
    for (let i = 0; i < arr.length && discarded < printAmount; i++) {
      if (!fn(arr[i], i, arr)) {
        console.log(` - [${i}]: ${valueToString(arr[i])}`);
        discarded++;
      }
    }
    if (discarded === 0) {
      console.log(` - Found no invalid items`);
    }
  }
}

module.exports.LoggedArray = LoggedArray;
module.exports.LoggedString = LoggedString;
module.exports.setPrintLength = (length) => {
  printAmount = length;
};
