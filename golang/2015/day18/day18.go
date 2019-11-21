package day18

import (
	"aoc/aoc"
)

var CorrectAnswers = []string{"768", "781"}

var Examples = []aoc.Example{
	// 	{Input: `.#.#.#
	// ...##.
	// #....#
	// ..#...
	// #.#..#
	// ####..`, Expected1: "4", Expected2: ""}, //4 steps
}

func Solve(in aoc.Input) (interface{}, interface{}) {
	g := aoc.NewGridFromString(in.String(), map[rune]int{'.': 0, '#': 1})
	for step := 0; step < 100; step++ {
		g.UpdateAll(func(x, y, state int) int {
			n := aoc.Sum(g.Neighbors(x, y))
			if state == 1 && (n == 2 || n == 3) {
				return 1
			} else if state == 0 && n == 3 {
				return 1
			}
			return 0
		})
	}
	part1 := g.Sum()

	g = aoc.NewGridFromString(in.String(), map[rune]int{'.': 0, '#': 1})
	forceCornerFn := func(x, y, state int) int {
		if (x == 0 && y == 0) || (x == 0 && y == g.Width-1) ||
			(x == g.Height-1 && y == 0) || (x == g.Height-1 && y == g.Width-1) {
			return 1
		}
		return state
	}

	for step := 0; step < 100; step++ {
		g.UpdateAll(forceCornerFn)
		g.UpdateAll(func(x, y, state int) int {
			n := aoc.Sum(g.Neighbors(x, y))
			if state == 1 && (n == 2 || n == 3) {
				return 1
			} else if state == 0 && n == 3 {
				return 1
			}
			return 0
		})
	}
	g.UpdateAll(forceCornerFn)
	part2 := g.Sum()

	return part1, part2
}
