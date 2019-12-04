package day4

import (
	"aoc/aoc"
	"math"
	"strings"
)

var CorrectAnswers = []string{"1716", "1163"}

var Examples = []aoc.Example{}

func Solve(in aoc.Input) (interface{}, interface{}) {
	p := strings.Split(in.String(), "-")
	min, max := aoc.ParseInt(p[0]), aoc.ParseInt(p[1])

	part1, part2 := 0, 0
	for pass := min; pass <= max; pass++ {
		if isValid(pass) {
			part1++
		}
		if isValid2(pass) {
			part2++
		}
	}

	return part1, part2
}

func isValid(p int) bool {
	pair := false
	prev := 0
	for i := 5; i >= 0; i-- {
		v := (p / int(math.Pow10(i))) % 10
		pair = pair || prev == v

		if prev > v {
			return false
		}
		prev = v
	}

	return pair
}

func isValid2(p int) bool {
	pair := false
	prev, equals := 0, 0
	for i := 5; i >= 0; i-- {
		v := (p / int(math.Pow10(i))) % 10
		if v == prev {
			equals++
		} else if equals == 2 {
			pair = true
		} else {
			equals = 1
		}

		if prev > v {
			return false
		}
		prev = v
	}
	if equals == 2 {
		pair = true
	}

	return pair
}
