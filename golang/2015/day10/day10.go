package day10

import (
	"aoc/aoc"
)

var CorrectAnswers = []string{"360154", "5103798"}

var Examples = []aoc.Example{
	// {Input: "1", Expected1: "11"},
	// {Input: "11", Expected1: "21"},
	// {Input: "21", Expected1: "1211"},
	// {Input: "1211", Expected1: "111221"},
	// {Input: "111221", Expected1: "312211"},
}

func Solve(in aoc.Input) (interface{}, interface{}) {
	s := in.Sequence()
	for i := 0; i < 40; i++ {
		s.LookAndSay()
	}
	part1 := len(s.String())

	for i := 0; i < 10; i++ {
		s.LookAndSay()
	}
	part2 := len(s.String())

	return part1, part2
}
