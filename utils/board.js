module.exports.Board = class Board {
  constructor(input) {
    if (Array.isArray(input)) {
      this.board = input;
    } else {
      this.board = input
        .trim()
        .split("\n")
        .map((r) => r.split(""));
    }
  }

  get width() {
    return this.board[0].length;
  }

  get height() {
    return this.board.length;
  }

  // Find the position of the first element with value
  find(value) {
    for (let r = 0; r < this.board.length; r++) {
      for (let c = 0; c < this.board[r].length; c++) {
        if (this.get(r, c) === value) {
          return [r, c];
        }
      }
    }
  }

  // Get the cell at a given row, col
  get(row, col) {
    if (
      row < 0 ||
      row >= this.board.length ||
      col < 0 ||
      col >= this.board[0].length
    ) {
      return undefined;
    }
    return this.board[row][col];
  }

  // Set the cell at a given row, col
  set(row, col, val) {
    this.board[row][col] = val;
  }

  // Get a row of cells as a string
  getRow(row) {
    return this.board[row].join("");
  }

  // Get a column of cells as a string
  getCol(col) {
    return this.board.map((row) => row[col]);
  }

  // Get the cell to the left of a given cell (row, col)
  getLeftOf(row, col) {
    if (col == 0) {
      return undefined;
    }
    return this.board[row][col - 1];
  }

  // Get the cell to the right of a given cell (row, col)
  getRightOf(row, col) {
    if (col == this.board[0].length - 1) {
      return undefined;
    }
    return this.board[row][col + 1];
  }

  // Get the cell above a given cell (row, col)
  getAbove(row, col) {
    if (row == 0) {
      return undefined;
    }
    return this.board[row - 1][col];
  }

  // Get the cell below a given cell (row, col)
  getBelow(row, col) {
    if (row == this.board.length - 1) {
      return undefined;
    }
    return this.board[row + 1][col];
  }

  // Get all (up to 8) neighbors of a given cell (row, col)
  getNeighbors(row, col) {
    const neighbors = [];
    for (let r = row - 1; r <= row + 1; r++) {
      if (r < 0 || r >= this.board.length) {
        continue;
      }
      for (let c = col - 1; c <= col + 1; c++) {
        if (c < 0 || c >= this.board[r].length) {
          continue;
        }
        if (r === row && c === col) {
          continue;
        }
        neighbors.push({ row: r, col: c, cell: this.board[r][c] });
      }
    }
    return neighbors;
  }

  isInside(row, col) {
    return (
      row >= 0 &&
      row < this.board.length &&
      col >= 0 &&
      col < this.board[0].length
    );
  }

  // Iterate over all cells in the board, calling fn(cell, row, col)
  forEach(fn) {
    this.board.forEach((row, r) => {
      row.forEach((cell, c) => {
        fn(cell, r, c);
      });
    });
  }

  // Get the shortest path from start to each tile using BFS
  costMap(fromRow, fromCol, impassableChar = "#") {
    console.log(fromRow, fromCol);
    const directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];
    const queue = [[fromRow, fromCol, 0]];
    const costMap = {};
    costMap[`${fromRow},${fromCol}`] = 0;

    while (queue.length > 0) {
      const [row, col, cost] = queue.shift();

      for (const [dr, dc] of directions) {
        const newRow = row + dr;
        const newCol = col + dc;
        const newCost = cost + 1;

        if (
          this.get(newRow, newCol) !== undefined &&
          this.get(newRow, newCol) !== impassableChar
        ) {
          const key = `${newRow},${newCol}`;
          if (!(key in costMap) || newCost < costMap[key]) {
            costMap[key] = newCost;
            queue.push([newRow, newCol, newCost]);
          }
        }
      }
    }

    return costMap;
  }

  // Get a string representation of the board
  toString() {
    return this.board.map((row) => row.join("")).join("\n");
  }

  // Print the board to the console
  print() {
    console.log(this.toString());
  }
};
