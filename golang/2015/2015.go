package aoc2015

import (
	"aoc/2015/day1"
	"aoc/2015/day10"
	"aoc/2015/day11"
	"aoc/2015/day12"
	"aoc/2015/day13"
	"aoc/2015/day14"
	"aoc/2015/day15"
	"aoc/2015/day16"
	"aoc/2015/day17"
	"aoc/2015/day18"
	"aoc/2015/day2"
	"aoc/2015/day3"
	"aoc/2015/day4"
	"aoc/2015/day5"
	"aoc/2015/day6"
	"aoc/2015/day7"
	"aoc/2015/day8"
	"aoc/2015/day9"
	"aoc/aoc"
)

func Register(r *aoc.Runner) {
	r.Register(2015, 1, day1.Examples, day1.Solve, day1.CorrectAnswers)
	r.Register(2015, 2, day2.Examples, day2.Solve, day2.CorrectAnswers)
	r.Register(2015, 3, day3.Examples, day3.Solve, day3.CorrectAnswers)
	r.Register(2015, 4, day4.Examples, day4.Solve, day4.CorrectAnswers)
	r.Register(2015, 5, day5.Examples, day5.Solve, day5.CorrectAnswers)
	r.Register(2015, 6, day6.Examples, day6.Solve, day6.CorrectAnswers)
	r.Register(2015, 7, day7.Examples, day7.Solve, day7.CorrectAnswers)
	r.Register(2015, 8, day8.Examples, day8.Solve, day8.CorrectAnswers)
	r.Register(2015, 9, day9.Examples, day9.Solve, day9.CorrectAnswers)
	r.Register(2015, 10, day10.Examples, day10.Solve, day10.CorrectAnswers)
	r.Register(2015, 11, day11.Examples, day11.Solve, day11.CorrectAnswers)
	r.Register(2015, 12, day12.Examples, day12.Solve, day12.CorrectAnswers)
	r.Register(2015, 13, day13.Examples, day13.Solve, day13.CorrectAnswers)
	r.Register(2015, 14, day14.Examples, day14.Solve, day14.CorrectAnswers)
	r.Register(2015, 15, day15.Examples, day15.Solve, day15.CorrectAnswers)
	r.Register(2015, 16, day16.Examples, day16.Solve, day16.CorrectAnswers)
	r.Register(2015, 17, day17.Examples, day17.Solve, day17.CorrectAnswers)
	r.Register(2015, 18, day18.Examples, day18.Solve, day18.CorrectAnswers)
}
