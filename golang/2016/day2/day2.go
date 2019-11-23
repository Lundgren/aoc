package day2

import (
	"aoc/aoc"
	"strings"
)

var CorrectAnswers = []string{"76792", "A7AC3"}

var Examples = []aoc.Example{
	{Input: `ULL
RRDDD
LURDL
UUUUD`, Expected1: "1985", Expected2: "5DB3"},
}

func Solve(in aoc.Input) (interface{}, interface{}) {
	part1 := doMovements(in, "123\n456\n789", 1, 1)
	part2 := doMovements(in, "  1  \n 234 \n56789\n ABC \n  D  ", 0, 2)
	return part1, part2
}

func doMovements(in aoc.Input, keypad string, x, y int) string {
	k := NewKeypadFromString(keypad, x, y)
	for _, l := range in.Lines() {
		for _, movement := range l {
			switch movement {
			case 'U':
				k.MoveUp()
			case 'D':
				k.MoveDown()
			case 'L':
				k.MoveLeft()
			case 'R':
				k.MoveRight()
			default:
				panic("")
			}
		}

		k.Press()
	}
	return k.Code
}

type Keypad struct {
	Keys []string
	X, Y int
	Code string
}

func NewKeypadFromString(keypad string, x, y int) *Keypad {
	return &Keypad{
		Keys: strings.Split(keypad, "\n"),
		X:    x,
		Y:    y,
	}
}

func (k *Keypad) MoveUp() {
	if k.Y-1 >= 0 && string(k.Keys[k.Y-1][k.X]) != " " {
		k.Y--
	}
}

func (k *Keypad) MoveDown() {
	if k.Y+1 < len(k.Keys) && string(k.Keys[k.Y+1][k.X]) != " " {
		k.Y++
	}
}

func (k *Keypad) MoveLeft() {
	if k.X-1 >= 0 && string(k.Keys[k.Y][k.X-1]) != " " {
		k.X--
	}
}

func (k *Keypad) MoveRight() {
	if k.X+1 < len(k.Keys[0]) && string(k.Keys[k.Y][k.X+1]) != " " {
		k.X++
	}
}

func (k *Keypad) Press() {
	k.Code += string(k.Keys[k.Y][k.X])
}

func (k *Keypad) Get() string {
	return string(k.Keys[k.Y][k.X])
}
