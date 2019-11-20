package day6

import (
	"aoc/aoc"
	"strings"
)

var Examples = []aoc.Example{
	{Input: "turn on 0,0 through 999,999", Expected1: "1000000"},
	{Input: "toggle 0,0 through 999,0", Expected1: "1000"},
	{Input: "turn on 499,499 through 500,500", Expected1: "4"},
	{Input: "turn on 0,0 through 0,0", Expected2: "1"},
	{Input: "toggle 0,0 through 999,999", Expected2: "2000000"},
}

const (
	turnOn int = iota
	turnOff
	toggle
)

type instruction struct {
	action       int
	fromX, fromY string
	toX, toY     string
}

func Solve(in aoc.Input) (interface{}, interface{}) {

	return part1(in.Lines()), part2(in.Lines())
}

func part1(lines []string) int {
	g := aoc.NewGrid(1000, 1000)

	for _, l := range lines {
		i := parse(l)
		g.UpdateStr(i.fromX, i.fromY, i.toX, i.toY, func(x, y, state int) int {
			switch i.action {
			case turnOn:
				return 1
			case turnOff:
				return 0
			case toggle:
				if state == 1 {
					return 0
				}
				return 1
			}
			panic("")
		})
	}

	turnedOn := 0
	for _, v := range g.State {
		if v == 1 {
			turnedOn++
		}
	}
	return turnedOn
}

func part2(lines []string) int {
	g := aoc.NewGrid(1000, 1000)

	for _, l := range lines {
		i := parse(l)
		g.UpdateStr(i.fromX, i.fromY, i.toX, i.toY, func(x, y, state int) int {
			switch i.action {
			case turnOn:
				return state + 1
			case turnOff:
				return aoc.Max(0, state-1)
			case toggle:
				return state + 2
			}
			panic("")
		})
	}

	brightness := 0
	for _, v := range g.State {
		brightness += v
	}
	return brightness
}

func parse(s string) instruction {
	i := instruction{}
	if strings.HasPrefix(s, "turn on") {
		i.action = turnOn
	} else if strings.HasPrefix(s, "turn off") {
		i.action = turnOff
	} else {
		i.action = toggle
	}

	parts := strings.Split(s, " through ")
	fromParts := strings.Split(parts[0], " ")
	from := strings.Split(fromParts[len(fromParts)-1], ",")
	to := strings.Split(parts[1], ",")

	i.fromX = from[0]
	i.fromY = from[1]
	i.toX = to[0]
	i.toY = to[1]
	return i
}
