package day9

import (
	"aoc/aoc"
)

var CorrectAnswers = []string{"97714", "10762972461"}

var Examples = []aoc.Example{
	{Input: "A(1x5)BC", Expected1: "7"},
	{Input: "(3x3)XYZ", Expected1: "9"},
	{Input: "A(2x2)BCD(2x2)EFG", Expected1: "11"},
	{Input: "(6x1)(1x3)A", Expected1: "6"},
	{Input: "X(8x2)(3x3)ABCY", Expected1: "18"},
	{Input: "(3x3)XYZ", Expected2: "9"},
	{Input: "X(8x2)(3x3)ABCY", Expected2: "20"},
	{Input: "(27x12)(20x12)(13x14)(7x10)(1x12)A", Expected2: "241920"},
	{Input: "(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN", Expected2: "445"},
}

func Solve(in aoc.Input) (interface{}, interface{}) {
	part1, part2 := 0, 0

	s := in.Scanner()
	for s.Next() {
		if s.Get() == '(' {
			s.Next() // (
			length := s.ScanNumber()
			s.Next() // x
			amount := s.ScanNumber()
			s.Jump(length)
			part1 += length * amount
		} else {
			part1++
		}
	}

	// Build weight for each char and sum upp letter weight
	// Ex:  		  "A(1x5)BC"
	//    Init:    11111111
	//    (1x5)    11111151
	//	  Sum      10000051 = 7
	weights := make([]int, len(in.String()))
	for i := range weights {
		weights[i] = 1
	}

	s = in.Scanner()
	for s.Next() {
		if s.Get() == '(' {
			s.Next() // (
			length := s.ScanNumber()
			s.Next() // x
			amount := s.ScanNumber()
			for i := 1; i <= length; i++ {
				weights[s.Index()+i] *= amount
			}
		} else {
			part2 += weights[s.Index()]
		}
	}

	return part1, part2
}
