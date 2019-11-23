package day3

import (
	"aoc/aoc"
	"strings"
)

var CorrectAnswers = []string{"869", "1544"}

var Examples = []aoc.Example{}

func Solve(in aoc.Input) (interface{}, interface{}) {
	part1 := 0
	for _, l := range in.Lines() {
		p := strings.Fields(l)
		s1, s2, s3 := aoc.ParseInt(p[0]), aoc.ParseInt(p[1]), aoc.ParseInt(p[2])

		if s1 < s2+s3 && s2 < s1+s3 && s3 < s1+s2 {
			part1++
		}
	}

	part2 := 0
	lines := in.Lines()
	for i := 2; i < len(lines); i += 3 {
		p1 := strings.Fields(lines[i-2])
		p2 := strings.Fields(lines[i-1])
		p3 := strings.Fields(lines[i])
		sa1, sb1, sc1 := aoc.ParseInt(p1[0]), aoc.ParseInt(p1[1]), aoc.ParseInt(p1[2])
		sa2, sb2, sc2 := aoc.ParseInt(p2[0]), aoc.ParseInt(p2[1]), aoc.ParseInt(p2[2])
		sa3, sb3, sc3 := aoc.ParseInt(p3[0]), aoc.ParseInt(p3[1]), aoc.ParseInt(p3[2])

		if sa1 < sa2+sa3 && sa2 < sa1+sa3 && sa3 < sa1+sa2 {
			part2++
		}
		if sb1 < sb2+sb3 && sb2 < sb1+sb3 && sb3 < sb1+sb2 {
			part2++
		}
		if sc1 < sc2+sc3 && sc2 < sc1+sc3 && sc3 < sc1+sc2 {
			part2++
		}
	}

	return part1, part2
}
