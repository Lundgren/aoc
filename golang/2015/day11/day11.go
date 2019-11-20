package day11

import (
	"aoc/aoc"
	"strings"
)

var CorrectAnswers = []string{"cqjxxyzz", "cqkaabcc"}

var Examples = []aoc.Example{
	{Input: "abcdefgh", Expected1: "abcdffaa"},
	{Input: "ghijklmn", Expected1: "ghjaabcc"},
}

func Solve(in aoc.Input) (interface{}, interface{}) {
	s := in.Sequence()

	for {
		s.IncreaseLast()

		if isValid(s.String()) {
			break
		}
	}
	part1 := s.String()

	for {
		s.IncreaseLast()

		if isValid(s.String()) {
			break
		}
	}
	part2 := s.String()

	return part1, part2
}

func isValid(pass string) bool {
	return !strings.ContainsAny(pass, "iol") &&
		aoc.CountUniquePairs(pass) >= 2 &&
		aoc.CountLongestStraight(pass) >= 3
}
