package day2

import (
	"aoc/aoc"
	"strings"
)

var CorrectAnswers = []string{"3101844", "8478"}

var Examples = []aoc.Example{
	// {Input: "1,0,0,0,99", Expected1: "2"},
	// {Input: "1,1,1,4,99,5,6,0,99", Expected1: "30"},
	// {Input: "1,9,10,3,2,3,11,0,99,30,40,50", Expected1: "3500"},
}

func Solve(in aoc.Input) (interface{}, interface{}) {
	vals := strings.Split(in.String(), ",")
	data := make([]int, len(vals))

	for i, v := range vals {
		data[i] = aoc.ParseInt(v)
	}

	part1 := run(12, 2, data)
	part2 := find(19690720, data)

	return part1, part2
}

func run(noun, verb int, source []int) int {
	data := append([]int(nil), source...)
	data[1], data[2] = noun, verb
	pc := 0

	for pc < len(data) {
		switch data[pc] {
		case 1:
			v1, v2, v3 := data[pc+1], data[pc+2], data[pc+3]
			data[v3] = data[v1] + data[v2]
		case 2:
			v1, v2, v3 := data[pc+1], data[pc+2], data[pc+3]
			data[v3] = data[v1] * data[v2]
		case 99:
			break
		}

		pc += 4
	}

	return data[0]
}

func find(what int, data []int) int {
	for n := 0; n <= 100; n++ {
		for v := 0; v <= 100; v++ {
			if run(n, v, data) == what {
				return n*100 + v
			}
		}
	}
	panic("")
}
