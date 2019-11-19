package aoc

import (
	"strconv"
)

func Check(err error) {
	if err != nil {
		panic(err)
	}
}

func ParseInt(s string) int {
	i, err := strconv.ParseInt(s, 10, 64)
	Check(err)
	return int(i)
}

func Max(values ...int) int {
	max := values[0]
	for _, val := range values {
		if val > max {
			max = val
		}
	}
	return max
}

func Min(values ...int) int {
	min := values[0]
	for _, val := range values {
		if val < min {
			min = val
		}
	}
	return min
}

func MergeMaps(maps ...map[string]int) map[string]int {
	res := map[string]int{}

	for _, m := range maps {
		for k, v := range m {
			res[k] = res[k] + v
		}
	}

	return res
}
