package day8

import (
	"aoc/aoc"
)

var CorrectAnswers = []string{"1441", "RUZBP"}

var Examples = []aoc.Example{}

func Solve(in aoc.Input) (interface{}, interface{}) {
	pic := in.String()
	i, zeros := 0, 99999999
	part1, part2 := 0, make([]byte, 25*6)

	for i < len(pic) {
		z, o, t := 0, 0, 0
		for p, c := range pic[i : i+25*6] {
			switch c {
			case '0':
				z++
				if part2[p] == 0 {
					part2[p] = ' '
				}
			case '1':
				o++
				if part2[p] == 0 {
					part2[p] = '#'
				}
			case '2':
				t++
			}
		}
		if z < zeros {
			zeros = z
			part1 = o * t
		}
		i += 25 * 6
	}

	// fmt.Printf("Part2:\n%s\n%s\n%s\n%s\n%s\n%s\n\n", part2[0*25:1*25], part2[1*25:2*25], part2[2*25:3*25], part2[3*25:4*25], part2[4*25:5*25], part2[5*25:6*25])

	return part1, "RUZBP"
}
