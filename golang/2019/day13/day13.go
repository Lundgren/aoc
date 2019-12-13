package day13

import (
	"aoc/aoc"
)

var CorrectAnswers = []string{"291", "14204"}

var Examples = []aoc.Example{}

const (
	block = int64(2)
	pad   = int64(3)
	ball  = int64(4)
)

const (
	neutral = int64(0)
	left    = int64(-1)
	right   = int64(1)
)

func Solve(in aoc.Input) (interface{}, interface{}) {
	instr := in.IntList()
	instr[0] = 2
	arcade := aoc.NewIntComputer(instr)

	joystick, posX := left, int64(-1)
	part1, part2, blocks := 0, 0, 0
	out := []int64{}
	for !arcade.Halted {
		arcade.SetInput(joystick)
		out = append(out, arcade.RunUntilOutput())

		if len(out) == 3 {
			x, y, tile := out[0], out[1], out[2]
			out = []int64{}

			if tile == block {
				blocks++
			}
			if x == 42 && y == 21 {
				part1 = blocks
			}

			if x == -1 {
				part2 = int(tile)
			} else {
				if tile == pad {
					posX = x
				} else if tile == ball {
					if posX > x {
						joystick = left
					} else if posX < x {
						joystick = right
					} else {
						joystick = neutral
					}
				}
			}
		}
	}

	return part1, part2
}
