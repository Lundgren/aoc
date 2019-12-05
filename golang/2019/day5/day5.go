package day5

import (
	"aoc/aoc"
	"fmt"
	"strings"
)

var CorrectAnswers = []string{"", ""}

var Examples = []aoc.Example{
	// {Input: "3,0,4,0,99", Expected1: "0", Expected2: ""},
	{Input: "1002,4,3,4,33", Expected1: "0", Expected2: ""},
	// {Input: "", Expected1: "", Expected2: ""},
	// {Input: "", Expected1: "", Expected2: ""},
	// {Input: "", Expected1: "", Expected2: ""},
}

func Solve(in aoc.Input) (interface{}, interface{}) {

	// part1, part2 := 0, 0

	vals := strings.Split(in.String(), ",")
	data := make([]int, len(vals))

	for i, v := range vals {
		data[i] = aoc.ParseInt(v)
	}

	part1 := run(data)
	part1 = 0
	// part2 := find(19690720, data)
	part2 := 0

	return part1, part2
}

func run(source []int) int {
	data := append([]int(nil), source...)
	// data[1], data[2] = noun, verb
	pc := 0

	input := 1 //??
	output := 0

	for pc < len(data) {
		v1, v2 := 0, 0
		instr := data[pc]
		if len(data) > pc+2 {
			if (instr/100)%10 == 0 {
				v1 = data[data[pc+1]]
			} else {
				v1 = data[pc+1]
			}
			if (instr/1000)%10 == 0 {
				v2 = data[data[pc+2]]
			} else {
				v2 = data[pc+2]
			}
		}
		// fmt.Println("i", instr, (instr<<0)%10, (instr/10)%10, (instr/100)%10, (instr/1000)%10)
		fmt.Println(">>", instr, "||", instr%100, v1, v2)
		// if (instr<<5)%10 == 0 {
		// 	v3 = data[v3]
		// }

		switch instr % 100 {
		case 1:
			data[data[pc+3]] = v1 + v2
			pc += 4
		case 2:
			data[data[pc+3]] = v1 * v2
			pc += 4
		case 3:
			data[data[pc+1]] = input
			fmt.Println(data)
			pc += 2
		case 4:
			output = v1
			pc += 2
			fmt.Println("output:", output)
		case 99:
			fmt.Println("Finished on 99")
			goto finished
		default:
			pc++
		}
	}
finished:

	fmt.Println(data)
	return data[0]

}

// func find(what int, data []int) int {
// 	for n := 0; n <= 100; n++ {
// 		for v := 0; v <= 100; v++ {
// 			if run(n, v, data) == what {
// 				return n*100 + v
// 			}
// 		}
// 	}
// 	panic("")
// }
