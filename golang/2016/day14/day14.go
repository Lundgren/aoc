package day14

import (
	"aoc/aoc"
	"sort"
)

var CorrectAnswers = []string{"15168", "20864"}

var Examples = []aoc.Example{
	// {Input: "abc", Expected1: "22728"},
}

const keysToFind = 64

func Solve(in aoc.Input) (interface{}, interface{}) {
	salt := in.String()
	part1 := getKey(salt, 1)
	part2 := getKey(salt, 2017)

	return part1, part2
}

func getKey(salt string, hashTimes int) int {
	triplets := make([]string, 1000)
	keys := []int{}

	for idx := 0; len(keys) <= keysToFind || idx < keys[keysToFind-1]+1000; idx++ {
		h := aoc.FastMd5(salt, idx, hashTimes)
		triplets[idx%1000] = ""

		count := 1
		for i := range h {
			if i > 0 && h[i] == h[i-1] {
				count++
				if count == 3 && triplets[idx%1000] == "" {
					triplets[idx%1000] = h[i-2 : i+1]
				}
				if count == 5 {
					match := h[i-2 : i+1]
					for i := 1; i < 1000; i++ {
						x := idx - (1000 - i)
						if x >= 0 && triplets[x%1000] == match {
							triplets[x%1000] = ""
							keys = append(keys, x)
						}
					}
				}
			} else {
				count = 1
			}
		}
	}
	sort.Sort(sort.IntSlice(keys))
	return keys[keysToFind-1]
}
