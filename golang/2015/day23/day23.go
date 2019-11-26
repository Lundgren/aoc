package day23

import (
	"aoc/aoc"
	"strings"
)

var CorrectAnswers = []string{"307", "160"}

var Examples = []aoc.Example{
	{Input: `inc b
jio b, +2
tpl b
inc b`, Expected1: "2", Expected2: ""},
}

func Solve(in aoc.Input) (interface{}, interface{}) {
	instr := strings.ReplaceAll(in.String(), ",", "")

	comp := func(i string, state *aoc.CompState) int {
		switch i {
		case "hlf":
			r := state.Instructions[1]
			state.Registers[r] /= 2
		case "tpl":
			r := state.Instructions[1]
			state.Registers[r] *= 3
		case "inc":
			r := state.Instructions[1]
			state.Registers[r] += 1
		case "jmp":
			return state.Get(1)
		case "jie":
			if state.Get(1)%2 == 0 {
				return state.Get(2)
			}
		case "jio":
			if state.Get(1) == 1 {
				return state.Get(2)
			}
		default:
			panic("")
		}

		return 1
	}

	part1 := aoc.SimulateComputer(instr, map[string]int{}, comp)
	part2 := aoc.SimulateComputer(instr, map[string]int{"a": 1}, comp)

	return part1["b"], part2["b"]
}
