package main

import (
	"aoc/aoc"
	"fmt"
	"testing"
)

func Test_verifyProblems(t *testing.T) {
	runner := setup()

	for _, p := range runner.Problems {
		path := fmt.Sprintf("%d/day%d/input.txt", p.Year, p.Day)
		input := aoc.FromFile(path)
		sol1, sol2 := p.SolverFn(input)
		if sol1 != p.Answers[0] {
			t.Errorf("%d Day %d: Part 1. Expected '%s', Got '%s'", p.Year, p.Day, p.Answers[0], sol1)
		}
		if sol2 != p.Answers[1] {
			t.Errorf("%d Day %d: Part 2. Expected '%s', Got '%s'", p.Year, p.Day, p.Answers[1], sol2)
		}

		for i, ex := range p.Examples {
			input := aoc.FromString(ex.Input)
			sol1, sol2 := p.SolverFn(input)

			if ex.Expected1 != "" && ex.Expected1 != sol1 {
				t.Errorf("%d Day %d example %d: Part 1. Expected %s, Got %s", p.Year, p.Day, i, ex.Expected1, sol1)
			}
			if ex.Expected2 != "" && ex.Expected2 != sol2 {
				t.Errorf("%d Day %d example %d: Part 2. Expected %s, Got %s", p.Year, p.Day, i, ex.Expected2, sol2)
			}
		}
	}
}
