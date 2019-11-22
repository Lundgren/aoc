package day20

import (
	"aoc/aoc"
)

var CorrectAnswers = []string{"831600", "884520"}

var Examples = []aoc.Example{}

func Solve(in aoc.Input) (interface{}, interface{}) {
	presents := aoc.ParseInt(in.String())

	goal := presents / 10
	delivered := make([]int, goal)
	lowest := goal
	for elf := 1; elf < lowest; elf++ {
		for house := elf; house < lowest; house += elf {
			delivered[house] += elf

			if delivered[house] >= goal {
				lowest = aoc.Min(lowest, house)
			}
		}
	}
	part1 := lowest

	goal = presents / 11
	delivered = make([]int, goal)
	lowest = goal
	for elf := 1; elf < lowest; elf++ {
		for house := elf; house/elf <= 50 && house < lowest; house += elf {
			delivered[house] += elf

			if delivered[house] >= goal {
				lowest = aoc.Min(lowest, house)
			}
		}
	}

	return part1, lowest
}
