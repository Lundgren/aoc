package aoc

import (
	"strings"
)

type CompState struct {
	Registers    map[string]int
	Instructions []string
}

// SimulateComputer will run the provided function for each instruction and return the resulting registers
// The provided function can modify registers and return delta for the program counter
func SimulateComputer(instructions string, initRegs map[string]int, fn func(instr string, state *CompState) (pc int)) map[string]int {
	ins := [][]string{}
	for _, l := range strings.Split(instructions, "\n") {
		ins = append(ins, strings.Split(l, " "))
	}

	pc := 0
	s := CompState{
		Registers: initRegs,
	}

	for pc >= 0 && pc < len(ins) {
		s.Instructions = ins[pc]
		pc += fn(ins[pc][0], &s)
		Log("comp", "Ran %v with result pc=%d, reg=%v", s.Instructions, pc, s.Registers)
	}
	return s.Registers
}
