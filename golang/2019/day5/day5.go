package day5

import (
	"aoc/aoc"
	"strings"
)

var CorrectAnswers = []string{"13978427", "11189491"}

var Examples = []aoc.Example{}

func Solve(in aoc.Input) (interface{}, interface{}) {
	vals := strings.Split(in.String(), ",")
	data := make([]int, len(vals))

	for i, v := range vals {
		data[i] = aoc.ParseInt(v)
	}

	part1 := run(1, data)
	part2 := run(5, data)

	return part1, part2
}

func run(input int, source []int) int {
	data := append([]int(nil), source...)
	pc, output := 0, 0

	for pc < len(data) {
		instr, v1, v2 := getParams(pc, data)
		if output != 0 && instr != 99 {
			panic("Invalid state")
		}

		switch instr {
		case 1:
			data[data[pc+3]] = v1 + v2
			pc += 4
		case 2:
			data[data[pc+3]] = v1 * v2
			pc += 4
		case 3:
			data[data[pc+1]] = input
			pc += 2
		case 4:
			output = v1
			pc += 2
		case 5:
			if v1 != 0 {
				pc = v2
			} else {
				pc += 3
			}
		case 6:
			if v1 == 0 {
				pc = v2
			} else {
				pc += 3
			}
		case 7:
			if v1 < v2 {
				data[data[pc+3]] = 1
			} else {
				data[data[pc+3]] = 0
			}
			pc += 4
		case 8:
			if v1 == v2 {
				data[data[pc+3]] = 1
			} else {
				data[data[pc+3]] = 0
			}
			pc += 4
		case 99:
			return output
		default:
			panic("")
		}
	}

	return output
}

func getParams(pc int, data []int) (instr, v1, v2 int) {
	instr = data[pc] % 100
	if instr == 99 {
		return
	}

	if len(data) > pc+1 {
		if (data[pc]/100)%10 == 0 {
			v1 = data[data[pc+1]]
		} else {
			v1 = data[pc+1]
		}
	}
	if len(data) > pc+2 && instr != 3 && instr != 4 {
		if (data[pc]/1000)%10 == 0 {
			v2 = data[data[pc+2]]
		} else {
			v2 = data[pc+2]
		}
	}
	return
}
