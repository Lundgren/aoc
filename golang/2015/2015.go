package aoc2015

import (
	"aoc/2015/day1"
	"aoc/2015/day2"
	"aoc/2015/day3"
	"aoc/2015/day4"
	"aoc/2015/day5"
	"aoc/2015/day6"
	"aoc/aoc"
)

func Register(r *aoc.Runner) {
	r.Register(2015, 1, day1.Examples, day1.Solve)
	r.Register(2015, 2, day2.Examples, day2.Solve)
	r.Register(2015, 3, day3.Examples, day3.Solve)
	r.Register(2015, 4, day4.Examples, day4.Solve)
	r.Register(2015, 5, day5.Examples, day5.Solve)
	r.Register(2015, 6, day6.Examples, day6.Solve)
}
