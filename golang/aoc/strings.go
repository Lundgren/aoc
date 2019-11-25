package aoc

import (
	"strings"
)

func CountUniquePairs(in string) int {
	sc := NewScanner(in)
	pairs := NewSet()
	for sc.Next() {
		equals := sc.Equals()
		if equals > 1 {
			pairs.Add(string(sc.Get()))
			sc.Jump(equals - 1)
		}
	}

	return pairs.Len()
}

func CountLongestStraight(in string) int {
	sc := NewScanner(in)
	length := 1
	for sc.Next() {
		for i := 1; i < len(in); i++ {
			if sc.Get()+byte(i) == sc.Peekn(i) {
				length = Max(length, i+1)
			} else {
				break
			}
		}
	}

	return length
}

// Returns the least common and the most common char from a string
// On equal amount a random char will be returned
func FindMinMaxCommonChar(in string) (minCh, maxCh rune) {
	chars := map[rune]int{}
	for _, ch := range in {
		chars[ch]++
	}

	max, min := 0, 99999
	for k, v := range chars {
		if v > max {
			maxCh = k
			max = v
		}
		if v < min {
			minCh = k
			min = v
		}
	}

	return minCh, maxCh
}

// Combine several strings into one separated by another string
func Combine(in []string, separator string) string {
	var sb strings.Builder
	for _, s := range in {
		sb.WriteString(s)
		sb.WriteString(separator)
	}
	return sb.String()
}
