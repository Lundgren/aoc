package aoc

import (
	"fmt"
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

func GetMinMax(src interface{}) *MinMaxer {
	m := NewMinMaxer()
	switch t := src.(type) {
	case State:
		for _, val := range t.State {
			m.Register(ParseInt(val))
		}
	case map[string]int:
		for _, val := range t {
			m.Register(val)
		}
	case []int:
		for _, val := range t {
			m.Register(val)
		}
	default:
		panic(fmt.Sprintf("GetMinMax is not implemented for type %T", src))
	}

	return m
}

func Reverse(a []string) []string {
	for i := len(a)/2 - 1; i >= 0; i-- {
		opp := len(a) - 1 - i
		a[i], a[opp] = a[opp], a[i]
	}
	return a
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

type MinMaxer struct {
	Min, Max int
}

func NewMinMaxer() *MinMaxer {
	return &MinMaxer{Min: 1<<63 - 1}
}

func (m *MinMaxer) Register(n int) {
	m.Min = Min(m.Min, n)
	m.Max = Max(m.Max, n)
}
