package day16

import (
	"aoc/aoc"
	"fmt"
	"strings"
)

var CorrectAnswers = []string{"", ""}

var Examples = []aoc.Example{
	// {Input: "12345678", Expected1: "01029498", Expected2: ""},
	// {Input: "80871224585914546619083218645595", Expected1: "24176176", Expected2: "84462026"},
	// {Input: "19617804207202209144916044189917", Expected1: "73745418", Expected2: "78725270"},
	// {Input: "69317163492948606335995924319873", Expected1: "52432133", Expected2: "53553731"},
}

func Solve(in aoc.Input) (interface{}, interface{}) {
	pattern := []int{0, 1, 0, -1}

	signal := make([]int, len(in.String())*2)
	// signal := make([]int, len(in.String()))
	for i, c := range in.String() {
		signal[i] = int(c - '0')
	}
	for i, c := range in.String() {
		signal[len(in.String())+i] = int(c - '0')
	}
	fmt.Println(signal)

	for phase := 0; phase < 100; phase++ {
		tmp := make([]int, len(signal))
		for i1, _ := range signal {
			sum := 0
			for i2, v2 := range signal {
				pos := ((i2 + 1) / (i1 + 1)) % len(pattern)
				p := pattern[pos]
				sum += p * v2
				// fmt.Printf("pat[%d]=%d => sum += %d*%d == %d (%d)\n", pos, p, p, v2, sum, aoc.Abs(sum)%10)
			}
			// fmt.Printf("tmp[%d] = %d (%v)\n", i1, aoc.Abs(sum)%10, pattern)
			tmp[i1] = aoc.Abs(sum) % 10
		}
		// break
		signal = tmp
	}

	var part1 strings.Builder
	for i := 0; i < 8; i++ {
		part1.WriteRune(rune('0' + signal[i]))
		// part1. // += '0' + signal[i]
	}

	fmt.Println(signal[:8])
	return part1, ""
}
