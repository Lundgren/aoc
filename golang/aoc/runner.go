package aoc

import (
	"fmt"
	"strconv"
	"time"
)

type Example struct {
	Input, Expected1, Expected2 string
}

type Runner struct {
	Problems []Problem
}

type Problem struct {
	Year, Day int
	Examples  []Example
	SolverFn  func(Input) (string, string)
	Answers   []string
}

func NewRunner() Runner {
	return Runner{
		Problems: []Problem{},
	}
}

func (r *Runner) Register(year, day int, examples []Example, solverFn func(Input) (interface{}, interface{}), answers []string) {
	r.Problems = append(r.Problems, Problem{
		Year:     year,
		Day:      day,
		Examples: examples,
		SolverFn: wrap(solverFn),
		Answers:  answers,
	})
}

func (r *Runner) RunLatestUnsolved() {
	for i := len(r.Problems) - 1; i >= 0; i-- {
		p := r.Problems[i]
		if p.Answers[0] == "" || p.Answers[1] == "" {
			path := fmt.Sprintf("%d/day%d/input.txt", p.Year, p.Day)
			input := FromFile(path)
			if !input.Empty() {
				solve(p, input)
				return
			}
		}
	}

	fmt.Println("No unsolved problems with input")
}

func (r *Runner) RunAll() {
	fmt.Printf("Running %d problems\n\n", len(r.Problems))

	start := time.Now()
	for _, p := range r.Problems {
		if p.Answers[0] != "" && p.Answers[1] != "" {
			quickSolve(p)
		}
	}

	elapsed := time.Since(start)
	fmt.Printf("\nCompleted in %s\n", elapsed)
}

func solve(p Problem, input Input) {
	fmt.Printf(">>> Running AoC %d day %d:\n\n", p.Year, p.Day)

	failed := false
	for i, ex := range p.Examples {
		input := FromString(ex.Input)
		sol1, sol2 := p.SolverFn(input)

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

	fmt.Printf("Successfully ran %d examples\n", len(p.Examples))

	start := time.Now()
	sol1, sol2 := p.SolverFn(input)
	elapsed := time.Since(start)

	fmt.Printf("Got result [%s]:\nPart 1: %s\nPart 2: %s\n", elapsed, sol1, sol2)
}

func quickSolve(p Problem) {
	start := time.Now()
	path := fmt.Sprintf("%d/day%d/input.txt", p.Year, p.Day)
	input := FromFile(path)
	sol1, sol2 := p.SolverFn(input)
	elapsed := time.Since(start)

	state := "Succeeded"
	if sol1 != p.Answers[0] || sol2 != p.Answers[1] {
		state = "Failed"
	}
	fmt.Printf("%d Day %d: %s, took %s\n", p.Year, p.Day, state, elapsed)
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
	case uint16:
		return strconv.Itoa(int(v))
	case string:
		return v
	default:
		panic(fmt.Sprintf("no match for type %T (%v)", v, v))
	}
}
