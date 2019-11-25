package day7

import (
	"aoc/aoc"
	"regexp"
	"strings"
)

var CorrectAnswers = []string{"115", "231"}

var Examples = []aoc.Example{
	{Input: "abba[mnop]qrst", Expected1: "1"},
	{Input: "abcd[bddb]xyyx", Expected1: "0"},
	{Input: "aaaa[qwer]tyui", Expected1: "0"},
	{Input: "ioxxoj[asdfgh]zxcvbn", Expected1: "1"},
	{Input: "aba[bab]xyz", Expected2: "1"},
	{Input: "xyx[xyx]xyx", Expected2: "0"},
	{Input: "aaa[kek]eke", Expected2: "1"},
	{Input: "zazbz[bzb]cdb", Expected2: "1"},
}

func Solve(in aoc.Input) (interface{}, interface{}) {
	part1, part2 := 0, 0

	r1 := regexp.MustCompile(`\[\w+\]`)
	for _, l := range in.Lines() {
		hypernet := aoc.Combine(r1.FindAllString(l, -1), "|")
		supernet := r1.ReplaceAllString(l, "|")

		if isAbba(supernet) && !isAbba(hypernet) {
			part1++
		}
		if isAba(supernet, hypernet) {
			part2++
		}
	}

	return part1, part2
}

func isAbba(in string) bool {
	s := aoc.NewScanner(in)
	for s.Next() {
		ch1, ch2, ch3, ch4 := s.Get(), s.Peek(), s.Peekn(2), s.Peekn(3)
		if ch1 == ch4 && ch2 == ch3 && ch1 != ch2 {
			return true
		}
	}

	return false
}

func isAba(supernet, hypernet string) bool {
	s := aoc.NewScanner(supernet)
	for s.Next() {
		ch1, ch2, ch3 := s.Get(), s.Peek(), s.Peekn(2)
		if ch1 == ch3 && ch1 != ch2 {
			if strings.Contains(hypernet, string([]byte{ch2, ch1, ch2})) {
				return true
			}
		}
	}
	return false
}
