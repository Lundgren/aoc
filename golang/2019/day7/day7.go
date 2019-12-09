package day7

import (
	"aoc/aoc"
)

var CorrectAnswers = []string{"18812", "25534964"}

var Examples = []aoc.Example{
	{Input: "3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0", Expected1: "43210"},
	{Input: "3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0", Expected1: "54321"},
	{Input: "3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0", Expected1: "65210"},
	{Input: "3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5", Expected2: "139629729"},
	{Input: "3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54,5,55,1005,55,26,1001,54,-5,54,1105,1,12,1,53,54,53,1008,54,0,55,1001,55,1,55,2,53,55,53,4,53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10", Expected2: "18216"},
}

func Solve(in aoc.Input) (interface{}, interface{}) {
	instr := in.IntList()

	part1 := aoc.Optimize(5, 5, func(sequence []int) int {
		if !valid(sequence) {
			return -1
		}

		input := int64(0)
		for t := 0; t < 5; t++ {
			c := aoc.NewIntComputer(instr)
			c.QueueInput(int64(sequence[t]), input)
			input = c.RunUntilHalt()
		}
		return int(input)
	})

	part2 := aoc.Optimize2(5, 10, 5, func(sequence []int) int {
		if !valid(sequence) {
			return -1
		}

		thrusters := []*aoc.IntComputer{}
		for _, s := range sequence {
			t := aoc.NewIntComputer(instr)
			t.QueueInput(int64(s))
			thrusters = append(thrusters, t)
		}

		input := int64(0)
		for !allHalted(thrusters) {
			for _, t := range thrusters {
				t.QueueInput(input)
				input = t.RunUntilOutput()
			}
		}

		return int(input)
	})

	return part1.Max, part2.Max
}

func valid(s []int) bool {
	for i := 0; i < 5; i++ {
		for j := 0; j < 5; j++ {
			if i != j && s[i] == s[j] {
				return false
			}
		}
	}

	return true
}

func allHalted(comps []*aoc.IntComputer) bool {
	for _, c := range comps {
		if !c.Halted {
			return false
		}
	}
	return true
}
