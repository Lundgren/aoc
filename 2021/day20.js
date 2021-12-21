const { inputStr, utils, answers } = require('./helper.js');

const testInput = `..#.#..#####.#.#.#.###.##.....###.##.#..###.####..#####..#....#..#..##..##
#..######.###...####..#..#####..##..#.#####...##.#.#..#.##..#.#......#.###
.######.###.####...#.##.##..#..#..#####.....#.#....###..#.##......#.....#.
.#..#..##..#...##.######.####.####.#.#...#.......#..#.#.#...####.##.#.....
.#..#...##.#.##..#...##.#.##..###.#......#.#.......#.#.#.####.###.##...#..
...####.#..#..#.##.#....##..#.####....##...##..#...#......#.#.......#.....
..##..####..#...#.#.#...##..#.#..###..#####........#..####......#..#

#..#.
#....
##..#
..#..
..###`;

class EndlessImage {
  endlessness = 0;
  data;
  constructor(imageData) {
    this.data = imageData;
  }
  get rows() {
    return this.data.length;
  }
  get cols() {
    return this.data[0].length;
  }
  pixel(row, col) {
    if (this.data[row] == undefined || this.data[row][col] == undefined) {
      return this.endlessness;
    }
    return this.data[row][col];
  }
  hasPixelsOnOuterLayers() {
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const onOuterLayer =
          r == 0 || r == this.rows - 1 || c == 0 || c > this.cols - 1;
        if (onOuterLayer && this.pixel(r, c) != this.endlessness) {
          return true;
        }
      }
    }
    return false;
  }
  extendWithEmptyBorders() {
    this.data.unshift(new Array(this.cols).fill(this.endlessness));
    this.data.push(new Array(this.cols).fill(this.endlessness));

    this.data.forEach((row) => {
      row.unshift(this.endlessness);
      row.push(this.endlessness);
    });
  }
}

const enhanceImage = (input, enhances) => {
  let [keyStr, imageStr] = input.split('\n\n');
  const imageData = imageStr
    .split('\n')
    .map((row) => row.split('').map((ch) => (ch == '#' ? 1 : 0)));
  const key = keyStr
    .split('\n')
    .join('')
    .split('')
    .map((ch) => (ch == '#' ? 1 : 0));

  let image = new EndlessImage(imageData);
  for (let i = 0; i < enhances; i++) {
    if (image.hasPixelsOnOuterLayers()) {
      image.extendWithEmptyBorders();
    }

    const newImageData = image.data.map((row) => new Array(row.length).fill(0));
    for (let r = 0; r < image.rows; r++) {
      for (let c = 0; c < image.cols; c++) {
        const keyId = parseInt(
          [
            image.pixel(r - 1, c - 1),
            image.pixel(r - 1, c),
            image.pixel(r - 1, c + 1),
            image.pixel(r, c - 1),
            image.pixel(r, c),
            image.pixel(r, c + 1),
            image.pixel(r + 1, c - 1),
            image.pixel(r + 1, c),
            image.pixel(r + 1, c + 1),
          ].join(''),
          2
        );
        newImageData[r][c] = key[keyId];
      }
    }
    image.data = newImageData;

    if (image.endlessness == 1) {
      image.endlessness = key[key.length - 1];
    } else {
      image.endlessness = key[0];
    }
  }

  let lit = 0;
  image.data.forEach((row) => row.forEach((p) => (lit += p)));

  return lit;
};

utils.example(enhanceImage(testInput, 2), 35);
const part1 = enhanceImage(inputStr, 2);

utils.example(enhanceImage(testInput, 50), 3351);
const part2 = enhanceImage(inputStr, 50);

answers(part1, part2);
