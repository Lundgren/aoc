package day7

import (
	"aoc/aoc"
	"strconv"
	"strings"
)

var CorrectAnswers = []string{"3176", "14710"}

var Examples = []aoc.Example{}

func Solve(in aoc.Input) (interface{}, interface{}) {
	e := aoc.NewEmulator()
	for _, i := range in.Lines() {
		p := strings.Split(i, " ")

		switch {
		case strings.Contains(i, "AND"):
			e.SetRule(p[4], func(signals aoc.State) interface{} {
				s1 := signalOrConst(p[0], signals)
				s2 := signalOrConst(p[2], signals)
				return s1 & s2
			})
		case strings.Contains(i, "OR"):
			e.SetRule(p[4], func(signals aoc.State) interface{} {
				s1 := signalOrConst(p[0], signals)
				s2 := signalOrConst(p[2], signals)
				return s1 | s2
			})
		case strings.Contains(i, "LSHIFT"):
			e.SetRule(p[4], func(signals aoc.State) interface{} {
				s := signalOrConst(p[0], signals)
				steps := signalOrConst(p[2], signals)
				return s << steps
			})
		case strings.Contains(i, "RSHIFT"):
			e.SetRule(p[4], func(signals aoc.State) interface{} {
				s := signalOrConst(p[0], signals)
				steps := signalOrConst(p[2], signals)
				return s >> steps
			})
		case strings.Contains(i, "NOT"):
			e.SetRule(p[3], func(signals aoc.State) interface{} {
				s := signalOrConst(p[1], signals)
				return ^s
			})
		default: //Constant
			e.SetRule(p[2], func(signals aoc.State) interface{} {
				s := signalOrConst(p[0], signals)
				return s
			})
		}
	}

	sig := e.RunUntilNoChange()
	part1 := sig.Uint16("a")

	e.ClearState()
	e.SetRule("b", func(signals aoc.State) interface{} {
		return part1
	})

	sig = e.RunUntilNoChange()
	part2 := sig.Uint16("a")

	return part1, part2
}

func signalOrConst(s string, signals aoc.State) uint16 {
	i, err := strconv.ParseUint(s, 10, 64)
	if err != nil {
		return signals.Uint16(s)
	}
	return uint16(i)
}
