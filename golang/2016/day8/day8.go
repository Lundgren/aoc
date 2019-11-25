package day8

import (
	"aoc/aoc"
	"fmt"
	"strings"
)

var CorrectAnswers = []string{"106", "CFLELOYFCS"}

var Examples = []aoc.Example{
	{Input: `rect 3x2
rotate column x=1 by 1
rotate row y=0 by 4
rotate column x=1 by 1`, Expected1: "6"},
}

const (
	width  = 50
	height = 6
)

func Solve(in aoc.Input) (interface{}, interface{}) {
	g := aoc.NewGrid(width, height)
	for _, i := range in.Lines() {
		x, y := 0, 0
		if strings.HasPrefix(i, "rect ") {
			fmt.Sscanf(i, "rect %dx%d", &x, &y)

			g.Update(0, 0, x-1, y-1, func(_, _, _ int) int {
				return 1
			})
		} else if strings.HasPrefix(i, "rotate row") {
			fmt.Sscanf(i, "rotate row y=%d by %d", &y, &x)

			g.Update(0, y, width-1, y, func(px, py, _ int) int {
				fromX := (px + width - x) % width
				return g.Get(fromX, y)
			})

		} else if strings.HasPrefix(i, "rotate column") {
			fmt.Sscanf(i, "rotate column x=%d by %d", &x, &y)

			g.Update(x, 0, x, height-1, func(px, py, _ int) int {
				fromY := (py + height - y) % height
				return g.Get(x, fromY)
			})

		}
	}

	// Part 2
	// fmt.Println(g)
	return g.Sum(), "CFLELOYFCS"
}
