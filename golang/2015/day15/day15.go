package day15

import (
	"aoc/aoc"
	"fmt"
	"strings"
)

var CorrectAnswers = []string{"18965440", "15862900"}

var Examples = []aoc.Example{
	{Input: `Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8
Cinnamon: capacity 2, durability 3, flavor -2, texture -1, calories 3`, Expected1: "62842880", Expected2: ""},
}

func Solve(in aoc.Input) (interface{}, interface{}) {
	rec := [][]int{}
	for _, l := range in.Lines() {
		var cap, dur, fla, tex, cal int
		s := strings.Split(l, ": ")
		fmt.Sscanf(s[1], "capacity %d, durability %d, flavor %d, texture %d, calories %d", &cap, &dur, &fla, &tex, &cal)
		rec = append(rec, []int{cap, dur, fla, tex, cal})
	}

	part1 := aoc.Optimize(len(rec), 101, func(r []int) int {
		sum := 0
		score := []int{0, 0, 0, 0}
		for i, amount := range r {
			sum += amount
			score[0] += rec[i][0] * amount
			score[1] += rec[i][1] * amount
			score[2] += rec[i][2] * amount
			score[3] += rec[i][3] * amount
		}

		if sum != 100 || score[0] < 0 || score[1] < 0 || score[2] < 0 || score[3] < 0 {
			return 0
		}
		return score[0] * score[1] * score[2] * score[3]
	})

	part2 := aoc.Optimize(len(rec), 101, func(r []int) int {
		sum := 0
		cals := 0
		score := []int{0, 0, 0, 0}
		for i, amount := range r {
			sum += amount
			cals += rec[i][4] * amount
			score[0] += rec[i][0] * amount
			score[1] += rec[i][1] * amount
			score[2] += rec[i][2] * amount
			score[3] += rec[i][3] * amount
		}

		if sum != 100 || cals != 500 || score[0] < 0 || score[1] < 0 || score[2] < 0 || score[3] < 0 {
			return 0
		}
		return score[0] * score[1] * score[2] * score[3]
	})

	return part1, part2
}
