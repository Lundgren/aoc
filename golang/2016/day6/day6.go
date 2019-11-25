package day6

import (
	"aoc/aoc"
	"strings"
)

var CorrectAnswers = []string{"bjosfbce", "veqfxzfx"}

var Examples = []aoc.Example{
	{Input: `eedadn
drvtee
eandsr
raavrd
atevrs
tsrnev
sdttsa
rasrtv
nssdts
ntnada
svetve
tesnvt
vntsnd
vrdear
dvrsen
enarar`, Expected1: "easter", Expected2: "advent"},
}

func Solve(in aoc.Input) (interface{}, interface{}) {
	var part1, part2 strings.Builder
	for _, col := range in.Columns() {
		min, max := aoc.FindMinMaxCommonChar(col)
		part1.WriteRune(max)
		part2.WriteRune(min)
	}

	return part1, part2
}
