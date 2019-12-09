package day9

import (
	"aoc/aoc"
)

var CorrectAnswers = []string{"2494485073", "44997"}

var Examples = []aoc.Example{
	{Input: "109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99", Expected1: "99"},
	{Input: "1102,34915192,34915192,7,4,7,99,0", Expected1: "1219070632396864"},
	{Input: "104,1125899906842624,99", Expected1: "1125899906842624"},
}

func Solve(in aoc.Input) (interface{}, interface{}) {
	part1 := run(1, in.IntList())
	part2 := run(2, in.IntList())

	return part1, part2
}

func run(input int64, source []int) int64 {
	c := aoc.NewIntComputer(source)
	c.QueueInput(input)
	return c.RunUntilHalt()
}
