package aoc

import (
	"fmt"
	"strconv"
	"strings"
)

func Check(err error) {
	if err != nil {
		panic(err)
	}
}

func ParseInt(s string) int {
	i, err := strconv.ParseInt(strings.TrimSpace(s), 10, 64)
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
	iterate(src, func(n int) {
		m.Register(n)
	})
	return m
}

func Sum(src interface{}) int {
	sum := 0
	iterate(src, func(n int) {
		sum += n
	})
	return sum
}

func iterate(src interface{}, fn func(n int)) {
	switch t := src.(type) {
	case State:
		for _, val := range t.State {
			fn(ParseInt(val))
		}
	case map[string]int:
		for _, val := range t {
			fn(val)
		}
	case map[int]int:
		for _, val := range t {
			fn(val)
		}
	case []int:
		for _, val := range t {
			fn(val)
		}
	default:
		panic(fmt.Sprintf("iterate is not implemented for type %T", src))
	}
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

func IntMap(s string) map[string]int {
	res := map[string]int{}
	for _, l := range strings.Split(s, "\n") {
		p := strings.Split(l, ":")
		res[strings.TrimSpace(p[0])] = ParseInt(p[1])
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
	if n < m.Min {
		m.Min = n
	}
	if n > m.Max {
		m.Max = n
	}
}
