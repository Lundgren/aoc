package day12

import (
	"aoc/aoc"
)

var CorrectAnswers = []string{"318117", "9227771"}

var Examples = []aoc.Example{
	{Input: `cpy 41 a
inc a
inc a
dec a
jnz a 2
dec a`, Expected1: "42", Expected2: ""},
}

func Solve(in aoc.Input) (interface{}, interface{}) {
	comp := func(i string, state *aoc.CompState) int {
		switch i {
		case "cpy":
			val := state.Get(1)
			state.Set(2, val)
		case "inc":
			r := state.Instructions[1]
			state.Registers[r] += 1
		case "dec":
			r := state.Instructions[1]
			state.Registers[r] -= 1
		case "jnz":
			val, steps := state.Get(1), state.Get(2)
			if val != 0 {
				return steps
			}
		default:
			panic("")
		}
		return 1
	}

	part1 := aoc.SimulateComputer(in.String(), map[string]int{}, comp)
	part2 := aoc.SimulateComputer(in.String(), map[string]int{"c": 1}, comp)

	return part1["a"], part2["a"]
}
