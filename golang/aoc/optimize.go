package aoc

import "fmt"

const BREAK = 1<<63 - 1

// Optimize will generate x items up to 'max' size and provide them to the score function
// Ex Optimize(3, 10) => [0,0,0], [0,0,1], [0,0,2], ..., [9,9,9]
func Optimize(items, max int, scoreFn func([]int) int) MinMaxer {
	m := NewMinMaxer()
	arr := make([]int, items)
	for {
		res := scoreFn(arr)
		if res == BREAK {
			return *m
		}
		m.Register(res)

		i := 0
		arr[i]++
		for arr[i] == max {
			arr[i] = 0
			i++
			if i == items {
				return *m
			}

			arr[i]++
		}
	}
}

type AddStep func(step interface{}, cost int)

type AStarState struct {
	Nodes PriorityQueue
}

// AStar will use A* to go through all added steps until the goal is found
// Return true to indicate goal reached
func AStar(initStep interface{}, fn func(step interface{}, addstepFn AddStep) bool) {
	q := NewPriorityQueue(initStep)

	min := 999999

	adder := func(s interface{}, cost int) {
		if cost < min {
			fmt.Printf("New record %d for %+v\n", cost, s)
			min = cost
		}
		q.Push(s, BREAK-cost)
	}

	n := 0
	// step := initStep
	for {
		n++
		// if n == 2 {
		// 	return
		// }
		if n%1000000 == 0 {
			fmt.Printf("Ran %d times, %d step to evaluate\n", n, q.Len())
		}
		// done := fn(step, adder)
		done := fn(q.Pop(), adder)
		if done {
			return
		}

		// step = q.Pop()
	}
}
