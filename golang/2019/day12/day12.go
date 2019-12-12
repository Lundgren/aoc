package day12

import (
	"aoc/aoc"
	"fmt"
)

var CorrectAnswers = []string{"6735", "326489627728984"}

var Examples = []aoc.Example{
	// 	{Input: `<x=-1, y=0, z=2>
	// <x=2, y=-10, z=-7>
	// <x=4, y=-8, z=8>
	// <x=3, y=5, z=-1>`, Expected1: "179", Expected2: ""},
	// 	{Input: `<x=-8, y=-10, z=0>
	// <x=5, y=5, z=10>
	// <x=2, y=-7, z=3>
	// <x=9, y=-8, z=-3>`, Expected1: "1940", Expected2: ""},
}

type pos struct {
	x, y, z int
}

func Solve(in aoc.Input) (interface{}, interface{}) {
	moons := []pos{}
	velocities := []pos{}

	for _, l := range in.Lines() {
		var x, y, z int
		fmt.Sscanf(l, "<x=%d, y=%d, z=%d>", &x, &y, &z)
		moons = append(moons, pos{x, y, z})
		velocities = append(velocities, pos{})
	}

	xCycle, yCycle, zCycle := 0, 0, 0
	seen := map[string]bool{}
	step, part1 := 0, 0
	for xCycle == 0 || yCycle == 0 || zCycle == 0 {
		for i, m := range moons {
			v := velocities[i]
			for _, m2 := range moons {
				if m.x < m2.x {
					v.x += 1
				} else if m.x > m2.x {
					v.x -= 1
				}
				if m.y < m2.y {
					v.y += 1
				} else if m.y > m2.y {
					v.y -= 1
				}
				if m.z < m2.z {
					v.z += 1
				} else if m.z > m2.z {
					v.z -= 1
				}
			}
			velocities[i] = v
		}

		xKey, yKey, zKey := "", "", ""
		for i, m := range moons {
			v := velocities[i]
			moons[i] = pos{m.x + v.x, m.y + v.y, m.z + v.z}

			xKey = fmt.Sprint(xKey, moons[i].x, v.x)
			yKey = fmt.Sprint(yKey, moons[i].y, v.y)
			zKey = fmt.Sprint(zKey, moons[i].z, v.z)

			if step == 999 {
				pot := aoc.Abs(moons[i].x) + aoc.Abs(moons[i].y) + aoc.Abs(moons[i].z)
				kin := aoc.Abs(v.x) + aoc.Abs(v.y) + aoc.Abs(v.z)
				part1 += (pot * kin)
			}
		}
		if xCycle == 0 {
			if _, ok := seen[xKey]; ok {
				xCycle = step
			} else {
				seen[xKey] = true
			}
		}
		if yCycle == 0 {
			if _, ok := seen[yKey]; ok {
				yCycle = step
			} else {
				seen[yKey] = true
			}
		}
		if zCycle == 0 {
			if _, ok := seen[zKey]; ok {
				zCycle = step
			} else {
				seen[zKey] = true
			}
		}
		step++
	}

	part2 := lcm(lcm(xCycle, yCycle), zCycle)

	return part1, part2
}

func lcm(a, b int) int {
	return a * b / gcd(a, b)
}

func gcd(a, b int) int {
	for b != 0 {
		t := b
		b = a % b
		a = t
	}
	return a
}
