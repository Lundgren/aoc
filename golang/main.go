package main

import (
	aoc2015 "aoc/2015"
	"aoc/aoc"
)

func main() {
	runner := setup()
	runner.RunLatest()
}

func setup() *aoc.Runner {
	runner := aoc.NewRunner()
	aoc2015.Register(&runner)
	return &runner
}
