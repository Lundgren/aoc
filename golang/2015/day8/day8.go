package day8

import (
	"aoc/aoc"
)

var CorrectAnswers = []string{"1342", "2074"}

var Examples = []aoc.Example{
	{Input: `""`, Expected1: "2", Expected2: "4"},
	{Input: `"abc"`, Expected1: "2", Expected2: "4"},
	{Input: `"aaa\"aaa"`, Expected1: "3", Expected2: "6"},
	{Input: `"\x27"`, Expected1: "5", Expected2: "5"},
}

func Solve(in aoc.Input) (interface{}, interface{}) {
	codeCh := 0
	stringCh := 0
	s := in.Scanner()
	for s.Next() {
		switch s.Get() {
		case '"':
			codeCh++
		case '\\':
			stringCh++
			if s.Peek() == 'x' {
				s.Jump(3)
				codeCh += 4
			} else {
				s.Jump(1)
				codeCh += 2
			}
		default:
			codeCh++
			stringCh++
		}
	}

	codeCh2 := 0
	s = in.Scanner()
	for s.Next() {
		switch s.Get() {
		case '"':
			codeCh2 += 2 + 1
		case '\\':
			if s.Peek() == 'x' {
				s.Jump(3)
				codeCh2 += 5
			} else {
				s.Jump(1)
				codeCh2 += 4
			}
		default:
			codeCh2++
		}
	}

	part1 := codeCh - stringCh
	part2 := codeCh2 - codeCh

	return part1, part2
}
