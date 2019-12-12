package day11

import (
	"aoc/aoc"
	"fmt"
	"strings"
)

var CorrectAnswers = []string{"2064", "LPZKLGHR"}

var Examples = []aoc.Example{}

func Solve(in aoc.Input) (interface{}, interface{}) {
	part1 := runPaintRobot(0, in.IntList(), false)
	// runPaintRobot(1, in.IntList(), true)

	return part1, "LPZKLGHR"
}

func runPaintRobot(init int64, instructions []int, draw bool) int {
	robot := aoc.NewIntComputer(instructions)
	colors := map[string]int64{}
	pos := aoc.NewPoint()
	paintedTiles := aoc.NewSet()
	colors[pos.String()] = init

	for !robot.Halted {
		oldColor := colors[pos.String()]
		robot.QueueInput(oldColor)
		newColor := robot.RunUntilOutput()
		colors[pos.String()] = newColor

		if oldColor != newColor {
			paintedTiles.Add(pos.String())
		}

		dir := robot.RunUntilOutput()
		switch dir {
		case 0:
			pos.TurnLeft()
		case 1:
			pos.TurnRight()
		}
		pos.MoveForward(1)
	}

	if draw {
		var sb strings.Builder
		for y := pos.MaxY + 1; y >= pos.MinY-1; y-- {
			for x := pos.MinX - 1; x <= pos.MaxX+1; x++ {
				col := colors[fmt.Sprintf("[%d, %d]", x, y)]
				if col == 1 {
					sb.WriteByte('#')
				} else {
					sb.WriteByte(' ')
				}
			}
			sb.WriteByte('\n')
		}
		fmt.Println(sb.String())
	}

	return paintedTiles.Len()
}
