package day16

import (
	"aoc/aoc"
	"strconv"
	"strings"
)

var CorrectAnswers = []string{"49254779", "55078585"}

var Examples = []aoc.Example{
	// {Input: "12345678", Expected1: "01029498", Expected2: ""},
	// {Input: "80871224585914546619083218645595", Expected1: "24176176"},
	// {Input: "19617804207202209144916044189917", Expected1: "73745418"},
	// {Input: "69317163492948606335995924319873", Expected1: "52432133"},
	{Input: "03036732577212944063491565474664", Expected2: "84462026"},
	{Input: "02935109699940807407585447034323", Expected2: "78725270"},
	{Input: "03081770884921959731165446850517", Expected2: "53553731"},
}

func Solve(in aoc.Input) (interface{}, interface{}) {
	signalStr1 := in.String()
	offset, _ := strconv.Atoi(signalStr1[:7])
	signalStr2 := strings.Repeat(signalStr1, 10000)[offset:]

	signal1 := make([]int, len(signalStr1))
	for i, c := range signalStr1 {
		signal1[i] = int(c - '0')
	}
	signal2 := make([]int, len(signalStr2))
	for i, c := range signalStr2 {
		signal2[i] = int(c - '0')
	}

	part1 := part1(signal1)
	part2 := part2(signal2)

	return part1, part2
}

func part1(signal []int) string {
	pattern := []int{0, 1, 0, -1}

	for phase := 0; phase < 100; phase++ {
		tmp := make([]int, len(signal))
		for i1, _ := range signal {
			sum := 0
			for i2, v2 := range signal {
				pos := ((i2 + 1) / (i1 + 1)) % len(pattern)
				p := pattern[pos]
				sum += p * v2
			}
			tmp[i1] = aoc.Abs(sum) % 10
		}
		signal = tmp
	}

	var firstEight strings.Builder
	for i := 0; i < 8; i++ {
		firstEight.WriteRune(rune('0' + signal[i]))
	}

	return firstEight.String()
}

func part2(signal []int) string {
	for phase := 0; phase < 100; phase++ {
		sum := 0
		for i := len(signal) - 1; i >= 0; i-- {
			sum += signal[i]
			signal[i] = sum % 10
		}
	}

	var firstEight strings.Builder
	for i := 0; i < 8; i++ {
		firstEight.WriteRune(rune('0' + signal[i]))
	}

	return firstEight.String()
}
