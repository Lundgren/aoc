package day3

import (
	"aoc/aoc"
	"strings"
)

var CorrectAnswers = []string{"1064", "25676"}

var Examples = []aoc.Example{
	{Input: `R8,U5,L5,D3
U7,R6,D4,L4`, Expected1: "6", Expected2: "30"},
	{Input: `R75,D30,R83,U83,L12,D49,R71,U7,L72
U62,R66,U55,R34,D71,R55,D58,R83`, Expected1: "159", Expected2: "610"},
	{Input: `R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
U98,R91,D20,R16,D67,R40,U7,R15,U6,R7`, Expected1: "135", Expected2: "410"},
}

func Solve(in aoc.Input) (interface{}, interface{}) {
	part1, part2 := aoc.NewMinMaxer(), aoc.NewMinMaxer()

	l := in.Lines()
	p1, p2 := move(l[0]), move(l[1])
	for pos := range p1.Visits {
		if _, ok := p2.Visits[pos]; ok && pos != "[0, 0]" {
			part1.Register(aoc.NewPointFromString(pos).DistanceFrom(0, 0))
		}
	}
	for pos := range p1.Visits {
		if _, ok := p2.Visits[pos]; ok && pos != "[0, 0]" {
			part2.Register(p1.MovesTo[pos] + p2.MovesTo[pos])
		}
	}

	return part1.Min, part2.Min
}

func move(instructions string) *aoc.Point {
	pt := aoc.NewPoint()

	for _, instr := range strings.Split(instructions, ",") {
		if instr != "" {
			dir := instr[0]
			dist := aoc.ParseInt(instr[1:])
			for i := 0; i < dist; i++ {
				switch dir {
				case 'U':
					pt.MoveNorth()
				case 'D':
					pt.MoveSouth()
				case 'R':
					pt.MoveEast()
				case 'L':
					pt.MoveWest()
				}
			}
		}
	}

	return pt
}
