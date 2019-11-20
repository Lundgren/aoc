package day3

import (
	"aoc/aoc"
)

var CorrectAnswers = []string{"2081", "2341"}

var Examples = []aoc.Example{
	{Input: ">", Expected1: "2"},
	{Input: "^>v<", Expected1: "4", Expected2: "3"},
	{Input: "^v^v^v^v^v", Expected1: "2", Expected2: "11"},
	{Input: "^v", Expected2: "3"},
}

func Solve(in aoc.Input) (interface{}, interface{}) {
	p := aoc.NewPoint()
	for _, ch := range in.String() {
		switch ch {
		case '^':
			p.MoveNorth()
		case 'v':
			p.MoveSouth()
		case '<':
			p.MoveWest()
		case '>':
			p.MoveEast()
		}
	}

	houses := len(p.Visits)

	santa := aoc.NewPoint()
	robo := aoc.NewPoint()
	for i, ch := range in.String() {
		p := santa
		if i%2 == 1 {
			p = robo
		}

		switch ch {
		case '^':
			p.MoveNorth()
		case 'v':
			p.MoveSouth()
		case '<':
			p.MoveWest()
		case '>':
			p.MoveEast()
		}
	}

	houses2 := len(aoc.MergeMaps(santa.Visits, robo.Visits))

	return houses, houses2
}
