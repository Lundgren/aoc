package day15

import (
	"aoc/aoc"
)

var CorrectAnswers = []string{"", ""}

var Examples = []aoc.Example{
	// {Input: "", Expected1: "", Expected2: ""},
}

type bfsStep struct {
	steps int
	state aoc.IntComputerState
}

func Solve(in aoc.Input) (interface{}, interface{}) {
	robot := aoc.NewIntComputer(in.IntList())
	start := bfsStep{
		state: robot.SaveState(),
	}

	res := aoc.Bfs(start, func(s interface{}, addStepFn func(interface{})) bool {
		st := s.(bfsStep)
		for i := 1; i <= 4; i++ {
			robot.LoadState(st.state)
			robot.SetInput(int64(i))
			res := robot.RunUntilOutput()
			if res == 2 {
				return true
			} else if res == 1 {
				addStepFn(bfsStep{
					steps: st.steps + 1,
					state: robot.SaveState(),
				})
			}
		}

		return false
	})

	part1 := res.(bfsStep)

	return part1.steps, "" //7280 too high
}
