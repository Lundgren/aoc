<?php

const INPUT = 1133;
const GRID_SIZE = 300;

function powerLevel($x, $y, $serial)
{
  $rackId = $x + 10;
  $powerLevel = (($rackId * $y) + $serial) * $rackId;
  $powerLevel = intdiv($powerLevel, 100) % 10;
  return $powerLevel - 5;
}

function makeFuelGrid($serial)
{
  $grid = array(range(0, GRID_SIZE), range(0, GRID_SIZE));
  for ($x = 0; $x < GRID_SIZE; $x++) {
    for ($y = 0; $y < GRID_SIZE; $y++) {
      $grid[$x][$y] = powerLevel($x, $y, $serial);
    }
  }

  return $grid;
}

function calcPower($grid, $startX, $startY, $size)
{
  $sum = 0;
  for ($x = 0; $x < $size; $x++) {
    for ($y = 0; $y < $size; $y++) {
      $sum += $grid[$startX + $x][$startY + $y];
    }
  }

  return $sum;
}

function findLargest($grid, $maxGridSize) 
{
  $maxPower = 0;
  $maxX = 0;
  $maxY = 0;
  $maxSize = 0;

  for ($x = 0; $x < GRID_SIZE - 1; $x++) {
    for ($y = 0; $y < GRID_SIZE - 1; $y++) {
      $maxSquare = min((GRID_SIZE - $x), (GRID_SIZE - $y), $maxGridSize);
      for ($size = 0; $size < $maxSquare; $size++) {
        $power = calcPower($grid, $x, $y, $size);

        if ($power > $maxPower) {
          $maxPower = $power;
          $maxX = $x;
          $maxY = $y;
          $maxSize = $size;
        }
      }
    }
  }

  print "Max power: $maxPower ($maxX,$maxY,$maxSize)\n";
}

assert(powerLevel(122, 79, 57) == -5);
assert(powerLevel(217, 196, 39) == 0);
assert(powerLevel(101, 153, 71) == 4);

$g = makeFuelGrid(INPUT);
print "Part1:\n";
findLargest($g, 3);

print "Part2:\n";
findLargest($g, 60);

?>