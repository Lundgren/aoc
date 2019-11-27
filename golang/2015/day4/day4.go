package day4

import (
	"aoc/aoc"
	"strings"
)

var CorrectAnswers = []string{"254575", "1038736"}

var Examples = []aoc.Example{
	{Input: "abcdef", Expected1: "609043", Expected2: ""},
	{Input: "pqrstuv", Expected1: "1048970", Expected2: ""},
}

func Solve(in aoc.Input) (interface{}, interface{}) {
	s := in.String()
	i1 := 0
	for {
		i1++
		if strings.HasPrefix(aoc.FastMd5(s, i1, 1), "00000") {
			break
		}
	}

	i2 := 0
	for {
		i2++
		if strings.HasPrefix(aoc.FastMd5(s, i2, 1), "000000") {
			break
		}
	}

	return i1, i2
}
