package day17

import (
	"aoc/aoc"
)

var CorrectAnswers = []string{"", ""}

var Examples = []aoc.Example{
	// {Input: "", Expected1: "", Expected2: ""},
}

func Solve(in aoc.Input) (interface{}, interface{}) {
	ascii := aoc.NewIntComputer(in.IntList())
	ascii.RunUntilHalt()
	view := ascii.Outputs

	// view := []int64{}
	// o := int64('\n')
	// for !ascii.Halted {
	// 	fmt.Printf("%s", string(rune(o)))
	// 	o := ascii.RunUntilOutput()
	// 	view = append(view, o)
	// }

	// view = view[:len(view)-1]
	width := 0
	for i, v := range view {
		if v == int64('\n') {
			width = i + 1
			break
		}
	}

	score := 0
	for i := 0; i < len(view); i++ {
		score += intersectPoint(i, view, width)
	}

	return score, ""
}

func intersectPoint(i int, view []int64, width int) int {
	left, right, above, below := i-1, i+1, i-width, i+width
	if isScaffold(i, view) &&
		isScaffold(left, view) &&
		isScaffold(right, view) &&
		isScaffold(above, view) &&
		isScaffold(below, view) {
		col, row := i%width, i/width
		return col * row
	}
	return 0
}

func isScaffold(i int, view []int64) bool {
	if i < 0 || i >= len(view) {
		return false
	}

	return view[i] == int64('#')
}
