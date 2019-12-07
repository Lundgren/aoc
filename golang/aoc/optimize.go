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
