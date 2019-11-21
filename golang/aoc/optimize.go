package aoc

// Optimize will generate x items up to 'max' size and provide them to the score function
// Ex Optimize(3, 10) => [0,0,0], [0,0,1], [0,0,2], ..., [9,9,9]
func Optimize(items, max int, scoreFn func([]int) int) MinMaxer {
	m := NewMinMaxer()
	arr := make([]int, items)
	for {
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

		res := scoreFn(arr)
		m.Register(res)
	}
}
