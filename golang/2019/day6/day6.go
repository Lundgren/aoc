package day6

import (
	"aoc/aoc"
	"strings"
)

var CorrectAnswers = []string{"162439", "367"}

var Examples = []aoc.Example{
	{Input: `COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L`, Expected1: "42"},
	{Input: `COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L
K)YOU
I)SAN`, Expected2: "4"},
}

func Solve(in aoc.Input) (interface{}, interface{}) {
	orbits := map[string]string{}

	for _, o := range in.Lines() {
		p := strings.Split(o, ")")
		orbits[p[1]] = p[0]
	}

	g := aoc.NewGraph()
	part1 := 0
	for obj1, obj2 := range orbits {
		part1++
		dist := 1
		g.AddDistance(obj1, obj2, dist)

		for obj2 != "COM" {
			part1++
			dist++

			obj2 = orbits[obj2]
			g.AddDistance(obj1, obj2, dist)
		}
	}

	part2, obj := 0, "YOU"
	for {
		obj = orbits[obj]
		steps, ok := isInSantaLine(obj, orbits)
		if ok {
			part2 += steps - 1
			break
		}
		part2++
	}

	return part1, part2
}

func isInSantaLine(goal string, orbits map[string]string) (int, bool) {
	steps, obj := 0, "SAN"
	for obj != "COM" && obj != goal {
		steps++
		obj = orbits[obj]
	}

	return steps, obj == goal
}
