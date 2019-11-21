package day13

import (
	"aoc/aoc"
	"fmt"
	"strings"
)

var CorrectAnswers = []string{"664", "640"}

var Examples = []aoc.Example{
	{Input: `Alice would gain 54 happiness units by sitting next to Bob.
Alice would lose 79 happiness units by sitting next to Carol.
Alice would lose 2 happiness units by sitting next to David.
Bob would gain 83 happiness units by sitting next to Alice.
Bob would lose 7 happiness units by sitting next to Carol.
Bob would lose 63 happiness units by sitting next to David.
Carol would lose 62 happiness units by sitting next to Alice.
Carol would gain 60 happiness units by sitting next to Bob.
Carol would gain 55 happiness units by sitting next to David.
David would gain 46 happiness units by sitting next to Alice.
David would lose 7 happiness units by sitting next to Bob.
David would gain 41 happiness units by sitting next to Carol.`, Expected1: "330", Expected2: ""},
}

func Solve(in aoc.Input) (interface{}, interface{}) {
	g := aoc.NewGraph()
	for _, l := range in.Lines() {
		var from, to, dir string
		var happiness int
		fmt.Sscanf(l, "%s would %s %d happiness units by sitting next to %s.", &from, &dir, &happiness, &to)
		to = strings.TrimRight(to, ".")

		if dir == "gain" {
			g.AddOneWayDistance(from, to, happiness)
		} else {
			g.AddOneWayDistance(from, to, -happiness)
		}
	}

	part1 := maxHappiness(g)

	for _, p := range g.Points().List() {
		g.AddDistance("Me", p, 0)
	}

	part2 := maxHappiness(g)

	return part1, part2
}

func maxHappiness(g *aoc.Graph) int {
	m := aoc.NewMinMaxer()
	p := g.Permutator()
	for p.Next() {
		seating := p.Get()
		seating = append(seating, seating[0])
		happiness := g.DistanceBetweenMany(seating)
		happiness += g.DistanceBetweenMany(aoc.Reverse(seating))
		m.Register(happiness)
	}
	return m.Max
}
