package day14

import (
	"aoc/aoc"
	"fmt"
)

var CorrectAnswers = []string{"2655", "1059"}

var Examples = []aoc.Example{
	{Input: `Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.
Dancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds.`, Expected1: "2660", Expected2: ""},
}

func Solve(in aoc.Input) (interface{}, interface{}) {
	e := aoc.NewEmulator()

	for _, l := range in.Lines() {
		var name string
		var speed, stamina, pause int
		fmt.Sscanf(l, "%s can fly %d km/s for %d seconds, but then must rest for %d seconds.", &name, &speed, &stamina, &pause)

		e.SetRule(name, func(time int, state aoc.State) interface{} {
			period := stamina + pause
			inPeriod := time % period
			if inPeriod < stamina {
				return state.Int(name) + speed
			}
			return state.Int(name)
		})
	}

	scores := map[string]int{}
	e.SetPostStepFn(func(_ int, state aoc.State) {
		leaderDist := aoc.GetMinMax(state).Max

		for raindeer := range state.State {
			if state.Int(raindeer) == leaderDist {
				scores[raindeer]++
			}
		}
	})

	state := e.Run(2503)
	part1 := aoc.GetMinMax(state)
	part2 := aoc.GetMinMax(scores)

	return part1.Max, part2.Max
}
