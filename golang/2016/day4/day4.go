package day4

import (
	"aoc/aoc"
	"sort"
	"strings"
)

var CorrectAnswers = []string{"409147", "991"}

var Examples = []aoc.Example{
	{Input: `aaaaa-bbb-z-y-x-123[abxyz]
a-b-c-d-e-f-g-h-987[abcde]
not-a-real-room-404[oarel]
totally-real-room-200[decoy]`, Expected1: "1514"},
}

func Solve(in aoc.Input) (interface{}, interface{}) {
	part1 := 0
	for _, m := range in.Regexp(`(?P<name>[a-z\-]+)(?P<sector>\d+)\[(?P<hash>\w+)\]`) {
		name := strings.ReplaceAll(m["name"], "-", "")
		sorted := []byte(name)
		sort.SliceStable(sorted, func(i, j int) bool {
			ni := strings.Count(name, string(sorted[i]))
			nj := strings.Count(name, string(sorted[j]))

			if ni == nj {
				return sorted[i] < sorted[j]
			}
			return ni > nj
		})

		hash := string(sorted[0])
		for i := 1; len(hash) < 5; i++ {
			if hash[len(hash)-1] != sorted[i] {
				hash += string(sorted[i])
			}
		}

		if hash == m["hash"] {
			part1 += aoc.ParseInt(m["sector"])
		}
	}

	part2 := 0
	for _, m := range in.Regexp(`(?P<name>[a-z\-]+)(?P<sector>\d+)\[(?P<hash>\w+)\]`) {
		sector := aoc.ParseInt(m["sector"])
		name := strings.Map(func(r rune) rune {
			if r == '-' {
				return ' '
			}
			return (r-'a'+rune(sector))%('z'-'a'+1) + 'a'
		}, m["name"])
		if strings.Contains(name, "northpole") {
			part2 = sector
		}
	}

	return part1, part2
}
