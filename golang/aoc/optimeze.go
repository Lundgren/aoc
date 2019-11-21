package aoc

import (
	"math"
)

func Optimize(items, max int, scoreFn func([]int) int) int {
	divs := make([]int, items)
	for i := range divs {
		divs[i] = pow(max, i)
	}

	m := NewMinMaxer()
	arr := make([]int, items)
	for i := 0; i < pow(max, items); i++ {
		for j := 0; j < items; j++ {
			arr[j] = (i / divs[j]) % max

		}
		m.Register(scoreFn(arr))
	}

	return m.Max
}

func pow(x, y int) int {
	return int(math.Pow(float64(x), float64(y)))
}
