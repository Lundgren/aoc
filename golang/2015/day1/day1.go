package day1

import (
	"aoc/aoc"
)

var Examples = []aoc.Example{
	{Input: "(())", Expected1: "0"},
	{Input: "(()(()(", Expected1: "3"},
	{Input: ")))", Expected1: "-3"},
	{Input: ")", Expected2: "1"},
	{Input: "()())", Expected2: "5"},
}

func Solve(in aoc.Input) (interface{}, interface{}) {
	floor := 0
	pos := 0
	for i, ch := range in.String() {
		if ch == '(' {
			floor++
		} else if ch == ')' {
			floor--
		}

		if floor < 0 && pos == 0 {
			pos = i + 1
		}
	}

	return floor, pos
}
