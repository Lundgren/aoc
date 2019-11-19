package aoc

import (
	"fmt"
	"strconv"
)

type Example struct {
	Input, Expected1, Expected2 string
}

type Runner struct {
	problems []problem
}

type problem struct {
	year, day int
	examples  []Example
	solverFn  func(Input) (string, string)
}

func NewRunner() Runner {
	return Runner{
		problems: []problem{},
	}
}

func (r *Runner) Register(year, day int, examples []Example, solverFn func(Input) (interface{}, interface{})) {
	r.problems = append(r.problems, problem{
		year:     year,
		day:      day,
		examples: examples,
		solverFn: wrap(solverFn),
	})
}

func (r *Runner) RunLatest() {
	solve(r.problems[len(r.problems)-1])
}

func (r *Runner) Run(year, day int) {

}

func solve(p problem) {
	fmt.Printf(">>> Running AoC %d day %d:\n\n", p.year, p.day)

	failed := false
	for i, ex := range p.examples {
		input := FromString(ex.Input)
		sol1, sol2 := p.solverFn(input)

		if ex.Expected1 != "" && ex.Expected1 != sol1 {
			failed = true
			fmt.Printf("Error on example %d part 1: Expected '%s', Got '%s'. (input: '%s')\n", i, ex.Expected1, sol1, ex.Input)
		}
		if ex.Expected2 != "" && ex.Expected2 != sol2 {
			failed = true
			fmt.Printf("Error on example %d part 2: Expected '%s', Got '%s'. (input: '%s')\n", i, ex.Expected2, sol2, ex.Input)
		}
	}
	if failed {
		return
	}

	fmt.Printf("Successfully ran %d examples\n", len(p.examples))

	path := fmt.Sprintf("%d/day%d/input.txt", p.year, p.day)
	input := FromFile(path)
	sol1, sol2 := p.solverFn(input)

	fmt.Printf("Got result:\nPart 1: %s\nPart 2: %s\n", sol1, sol2)
}

// Wrapper to enable us to return ints and other things
func wrap(fn func(Input) (interface{}, interface{})) func(Input) (string, string) {
	return func(in Input) (string, string) {
		s1, s2 := fn(in)
		return toStr(s1), toStr(s2)
	}
}

func toStr(v interface{}) string {
	switch v := v.(type) {
	case int:
		return strconv.Itoa(v)
	case string:
		return v
	default:
		panic(fmt.Sprintf("no match for type %T (%v)", v, v))
	}
}
