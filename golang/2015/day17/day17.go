package day17

import (
	"aoc/aoc"
)

var CorrectAnswers = []string{"4372", "4"}

var Examples = []aoc.Example{
	// {Input: "20\n15\n10\n5\n5", Expected1: "4", }, // for 25l
}

func Solve(in aoc.Input) (interface{}, interface{}) {
	p := aoc.NewCombinator(in.Lines())

	min := 999999999
	reg := map[int]int{}
	amount := 0
	for p.Next() {
		if p.Sum() == 150 {
			amount++
			reg[len(p.Get())]++
			min = aoc.Min(min, len(p.Get()))
		}
	}

	return amount, reg[min]
}
