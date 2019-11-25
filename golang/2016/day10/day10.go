package day10

import (
	"aoc/aoc"
	"fmt"
	"strings"
)

var CorrectAnswers = []string{"116", "23903"}

var Examples = []aoc.Example{
	{Input: `value 5 goes to bot 2
bot 2 gives low to bot 1 and high to bot 0
value 3 goes to bot 1
bot 1 gives low to output 1 and high to bot 0
bot 0 gives low to output 2 and high to output 0
value 2 goes to bot 2`, Expected2: "30"},
}

func Solve(in aoc.Input) (interface{}, interface{}) {
	type rule func() bool
	signals := map[int]int{}
	outputs := map[int]int{}
	rules := []rule{}

	setSignalFn := func(val, bot int) bool {
		v1, v2 := signals[bot]/1000, signals[bot]%1000
		if val == v1 || val == v2 {
			return false
		}

		signals[bot] = val*1000 + v1
		return true
	}

	getSignalFn := func(bot int) (min, max int) {
		v1, v2 := signals[bot]/1000, signals[bot]%1000
		return aoc.Min(v1, v2), aoc.Max(v1, v2)
	}

	for _, l := range in.Lines() {
		if strings.HasPrefix(l, "value") {
			val, bot := 0, 0
			fmt.Sscanf(l, "value %d goes to bot %d", &val, &bot)
			rules = append(rules, func() bool {
				return setSignalFn(val, bot)
			})
		} else {
			bot, lowOut, highOut := 0, 0, 0
			lowOutType, highOutType := "", ""
			fmt.Sscanf(l, "bot %d gives low to %s %d and high to %s %d", &bot, &lowOutType, &lowOut, &highOutType, &highOut)

			rules = append(rules, func() bool {
				min, _ := getSignalFn(bot)
				if lowOutType == "output" {
					outputs[lowOut] = min
					return false
				}
				return setSignalFn(min, lowOut)
			})
			rules = append(rules, func() bool {
				_, max := getSignalFn(bot)
				if highOutType == "output" {
					outputs[highOut] = max
					return false
				}
				return setSignalFn(max, highOut)
			})
		}
	}

	change := true
	for change {
		change = false
		for _, r := range rules {
			change = r() || change
		}
	}

	part1 := 0
	part2 := outputs[0] * outputs[1] * outputs[2]

	for i, s := range signals {
		if s == 17061 || s == 61017 {
			part1 = i
		}
	}

	return part1, part2
}
