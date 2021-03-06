package day9

import (
	"aoc/aoc"
	"strings"
)

var CorrectAnswers = []string{"141", "736"}

var Examples = []aoc.Example{
	{Input: `London to Dublin = 464
London to Belfast = 518
Dublin to Belfast = 141`, Expected1: "605", Expected2: "982"},
}

func Solve(in aoc.Input) (interface{}, interface{}) {
	g := aoc.NewGraph()
	for _, l := range in.Lines() {
		p := strings.Split(l, " ")
		g.AddDistance(p[0], p[2], aoc.ParseInt(p[4]))
	}

	m := aoc.NewMinMaxer()
	p := g.Permutator()
	for p.Next() {
		d := g.DistanceBetweenMany(p.Get())
		m.Register(d)
	}

	return m.Min, m.Max
}
