package aoc

import (
	"strconv"
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

// Helper to fetch the value of instruction n (handling const vs registry)
func (s *CompState) Get(n int) int {
	regOrConst := s.Instructions[n]
	if val, err := strconv.Atoi(regOrConst); err == nil {
		return val
	}
	return s.Registers[regOrConst]
}

// Helper function to set a value to the registry on instruction 'n'
func (s *CompState) Set(n, val int) {
	s.Registers[s.Instructions[n]] = val
}
