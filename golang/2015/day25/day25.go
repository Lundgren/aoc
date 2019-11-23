package day25

import (
	"aoc/aoc"
)

var CorrectAnswers = []string{"19980801", "freebie"}

var Examples = []aoc.Example{}

func Solve(in aoc.Input) (interface{}, interface{}) {
	m, r := 252533, 33554393
	code := 20151125

	row := 1
	for {
		row++
		for col := 1; col <= row; col++ {
			code = (code * m) % r

			if (row-col+1) == 2947 && col == 3029 {
				return code, "freebie"
			}
		}
	}
}
