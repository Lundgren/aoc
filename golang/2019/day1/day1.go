package day1

import (
	"aoc/aoc"
)

var CorrectAnswers = []string{"3481005", "5218616"}

var Examples = []aoc.Example{
	{Input: "14", Expected1: "2", Expected2: "2"},
	{Input: "1969", Expected1: "654", Expected2: "966"},
	{Input: "100756", Expected1: "33583", Expected2: "50346"},
}

func Solve(in aoc.Input) (interface{}, interface{}) {
	part1, part2 := 0, 0
	for _, mass := range in.IntList() {
		fuel := (mass / 3) - 2
		part1 += fuel
		for fuel > 0 {
			part2 += fuel
			fuel = (fuel / 3) - 2
		}
	}

	return part1, part2
}
