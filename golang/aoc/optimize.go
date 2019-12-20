package aoc

const BREAK = 1<<63 - 1

// Optimize will generate x items up to 'max' size and provide them to the score function
// Ex Optimize(3, 10) => [0,0,0], [0,0,1], [0,0,2], ..., [9,9,9]
func Optimize(items, max int, scoreFn func([]int) int) MinMaxer {
	return Optimize2(items, max, 0, scoreFn)
}
func Optimize2(items, max, min int, scoreFn func([]int) int) MinMaxer {
	m := NewMinMaxer()
	arr := make([]int, items)
	for i := range arr {
		arr[i] = min
	}
	for {
		res := scoreFn(arr)
		if res == BREAK {
			return *m
		}
		m.Register(res)

		i := 0
		arr[i]++
		for arr[i] == max {
			arr[i] = min
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
func AStar(initStep interface{}, fn func(step interface{}, addstepFn AddStep) bool) interface{} {
	q := NewPriorityQueue()
	q.Push(initStep, 0)

	adder := func(s interface{}, cost int) {
		q.Push(s, MAX_PRIORITY-cost)
	}

	for q.Len() > 0 {
		step, cost := q.Pop()
		if cost == MAX_PRIORITY {
			return step
		}

		done := fn(step, adder)
		if done {
			return step
		}
	}

	return nil
}

func Bfs(initStep interface{}, fn func(step interface{}, addStepFn func(interface{})) bool) interface{} {
	var q []interface{}

	adder := func(s interface{}) {
		q = append(q, s)
	}

	for len(q) > 0 {
		done := fn(q[0], adder)
		if done {
			return q[0]
		}

		q[0] = nil
		q = q[1:]
	}

	return nil
}
