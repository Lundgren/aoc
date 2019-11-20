package day5

import (
	"aoc/aoc"
	"strings"
)

var Examples = []aoc.Example{
	{Input: "ugknbfddgicrmopn", Expected1: "1"},
	{Input: "aaa", Expected1: "1"},
	{Input: "jchzalrnumimnmhp", Expected1: "0"},
	{Input: "haegwjzuvuyypxyu", Expected1: "0"},
	{Input: "dvszwmarrgswjxmb", Expected1: "0"},
	{Input: "qjhvhtzxzqqjkmpb", Expected2: "1"},
	{Input: "xxyxx", Expected2: "1"},
	{Input: "uurcxstgmygtbstg", Expected2: "0"},
	{Input: "ieodomkazucvgmuy", Expected2: "0"},
}

func Solve(in aoc.Input) (interface{}, interface{}) {
	words := in.Lines()
	nice1 := 0
	for _, w := range words {
		prev := ' '
		vowels := 0
		forbidden := strings.Contains(w, "ab") || strings.Contains(w, "cd") || strings.Contains(w, "pq") || strings.Contains(w, "xy")
		double := false
		for _, ch := range w {
			if ch == prev {
				double = true
			}
			if ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u' {
				vowels++
			}
			prev = ch
		}
		if vowels >= 3 && double && !forbidden {
			nice1++
		}
	}

	nice2 := 0
	for _, w := range words {
		prev := ' '
		prevPrev := ' '
		twice := false
		between := false
		pairs := map[string]int{}
		for i, ch := range w {
			r := string([]rune{prev, ch})
			p, ok := pairs[r]
			if ok && p < i-1 {
				twice = true
			}
			pairs[r] = i

			if ch == prevPrev {
				between = true
			}
			prevPrev = prev
			prev = ch
		}
		if twice && between {
			nice2++
		}
	}

	return nice1, nice2
}
