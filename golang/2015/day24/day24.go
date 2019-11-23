package day24

import (
	"aoc/aoc"
	"sort"
)

var CorrectAnswers = []string{"10439961859", "72050269"}

var Examples = []aoc.Example{}

func Solve(in aoc.Input) (interface{}, interface{}) {
	weights := in.IntList()
	sort.SliceStable(weights, func(i, j int) bool { return weights[i] > weights[j] })

	part1 := calcEntanglement(weights, aoc.Sum(weights)/3)
	part2 := calcEntanglement(weights, aoc.Sum(weights)/4)
	return part1, part2
}

// 1. Fill front seat by using heavy packages first,
// 2. Exclude up to two package at a time to force different combinations
// 3. Be lucky (not checking balance on other seats)
func calcEntanglement(weights []int, expectedWeight int) int {
	minPackages, minEntangle := aoc.INT_MAX, aoc.INT_MAX
	for excluded1 := 0; excluded1 <= len(weights); excluded1++ {
		for excluded2 := 0; excluded2 <= len(weights); excluded2++ {
			weight, packages, entangle := 0, 0, 1
			for i, w := range weights {
				if i != excluded1 && i != excluded2 && weight+w <= expectedWeight {
					weight += w
					entangle *= w
					packages++
				}
			}

			if weight == expectedWeight && packages <= minPackages && entangle < minEntangle {
				minPackages = packages
				minEntangle = entangle
			}
		}
	}

	return minEntangle
}
