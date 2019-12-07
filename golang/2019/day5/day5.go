package day5

import (
	"aoc/aoc"
)

var CorrectAnswers = []string{"13978427", "11189491"}

var Examples = []aoc.Example{}

func Solve(in aoc.Input) (interface{}, interface{}) {
	part1 := run(1, in.IntList())
	part2 := run(5, in.IntList())

	return part1, part2
}

func run(input int, source []int) int {
	c := aoc.NewIntComputer(source)
	c.QueueInput(input)
	return c.RunUntilHalt()
}
