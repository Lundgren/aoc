package day1

import (
	"aoc/aoc"
)

var CorrectAnswers = []string{"230", "154"}

var Examples = []aoc.Example{
	{Input: "R2, L3", Expected1: "5"},
	{Input: "R2, R2, R2", Expected1: "2"},
	{Input: "R5, L5, R5, R3", Expected1: "12"},
	{Input: "R8, R4, R4, R8", Expected2: "4"},
}

func Solve(in aoc.Input) (interface{}, interface{}) {
	steps := in.Split(", ")

	part2 := 0
	p := aoc.NewPoint()
	for _, s := range steps {
		switch s[0] {
		case 'R':
			p.TurnRight()
			p.MoveForward(aoc.ParseInt(string(s[1:])))
		case 'L':
			p.TurnLeft()
			p.MoveForward(aoc.ParseInt(string(s[1:])))
		default:
			panic(string(s[1]))
		}

		if part2 == 0 {
			for k, v := range p.Visits {
				if v > 1 {
					hq := aoc.NewPointFromString(k)
					part2 = hq.DistanceFrom(0, 0)
				}
			}
		}
	}

	return p.DistanceFrom(0, 0), part2
}
