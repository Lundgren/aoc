package day10

import (
	"aoc/aoc"
	"math"
	"sort"
)

var CorrectAnswers = []string{"260", "608"}

var Examples = []aoc.Example{
	// 	{Input: `.#..#
	// .....
	// #####
	// ....#
	// ...##`, Expected1: "8"},
	// 	{Input: `......#.#.
	// #..#.#....
	// ..#######.
	// .#.#.###..
	// .#..#.....
	// ..#....#.#
	// #..#....#.
	// .##.#..###
	// ##...#..#.
	// .#....####`, Expected1: "33"},
	// 	{Input: `#.#...#.#.
	// .###....#.
	// .#....#...
	// ##.#.#.#.#
	// ....#.#.#.
	// .##..###.#
	// ..#...##..
	// ..##....##
	// ......#...
	// .####.###.`, Expected1: "35"},
	// 	{Input: `.#..#..###
	// ####.###.#
	// ....###.#.
	// ..###.##.#
	// ##.##.#.#.
	// ....###..#
	// ..#.#..#.#
	// #..#.#.###
	// .##...##.#
	// .....#.#..`, Expected1: "41"},
	{Input: `.#..##.###...#######
##.############..##.
.#.######.########.#
.###.#######.####.#.
#####.##.#.##.###.##
..#####..#.#########
####################
#.####....###.#.#.##
##.#################
#####.##.###..####..
..######..##.#######
####.##.####...##..#
.#####..#.######.###
##...#.##########...
#.##########.#######
.####.#.###.###.#.##
....##.##.###..#####
.#.#.###########.###
#.#.#.#####.####.###
###.##.####.##.#..##`, Expected1: "210", Expected2: "802"},
}

type pos struct {
	x, y float64
}

type observation struct {
	angle    float64
	astroids []pos
}

func Solve(in aoc.Input) (interface{}, interface{}) {
	astroids := []pos{}
	for y, l := range in.Lines() {
		for x, c := range l {
			if c == '#' {
				astroids = append(astroids, pos{float64(x), float64(y)})
			}
		}
	}

	part1 := 0
	station := pos{}
	observations := map[float64]observation{}
	for i1, a1 := range astroids {
		canSee := map[float64]observation{}
		for i2, a2 := range astroids {
			if i1 != i2 {
				angle := math.Atan2(a2.x-a1.x, a2.y-a1.y)
				o, ok := canSee[angle]
				if !ok {
					o = observation{
						angle:    angle,
						astroids: []pos{},
					}
				}
				o.astroids = append(o.astroids, a2)
				canSee[angle] = o
			}
		}
		if len(canSee) > part1 {
			part1 = len(canSee)
			station = a1
			observations = canSee
		}
	}

	targets := []observation{}
	for _, o := range observations {
		targets = append(targets, o)
	}
	sort.SliceStable(targets, func(i, j int) bool { return targets[i].angle > targets[j].angle })

	destroyed, part2, i := 0, 0, 0
	for destroyed < 200 {
		t := targets[i]
		if len(t.astroids) > 0 {
			sort.SliceStable(t.astroids, func(i, j int) bool {
				distI := math.Abs(station.x-t.astroids[i].x) + math.Abs(station.y-t.astroids[i].y)
				distJ := math.Abs(station.x-t.astroids[i].x) + math.Abs(station.y-t.astroids[i].y)
				return distI > distJ
			})
			destroyed++
			part2 = int(t.astroids[0].x*100 + t.astroids[0].y)
			targets[i].astroids = targets[i].astroids[1:]
		}
		i++
		if i >= len(targets) {
			i = 0
		}
	}

	return part1, part2
}
