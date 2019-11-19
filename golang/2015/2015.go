package aoc2015

import (
	"aoc/2015/day1"
	"aoc/2015/day2"
	"aoc/2015/day3"
	"aoc/aoc"
)

func Register(r *aoc.Runner) {
	r.Register(2015, 1, day1.Examples, day1.Solve)
	r.Register(2015, 2, day2.Examples, day2.Solve)
	r.Register(2015, 3, day3.Examples, day3.Solve)
}
