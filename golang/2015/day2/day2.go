package day2

import (
	"aoc/aoc"
	"strings"
)

var CorrectAnswers = []string{"1598415", "3812909"}

var Examples = []aoc.Example{
	{Input: "2x3x4", Expected1: "58", Expected2: "34"},
	{Input: "1x1x10", Expected1: "43", Expected2: "14"},
}

type box struct {
	l, w, h int
}

func Solve(in aoc.Input) (interface{}, interface{}) {
	boxes := []box{}
	for _, l := range in.Lines() {
		s := strings.Split(l, "x")
		boxes = append(boxes, box{aoc.ParseInt(s[0]), aoc.ParseInt(s[1]), aoc.ParseInt(s[2])})
	}

	paper := 0
	for _, b := range boxes {
		paper += 2*b.l*b.w + 2*b.w*b.h + 2*b.h*b.l
		paper += aoc.Min(b.l*b.w, b.w*b.h, b.h*b.l)
	}

	ribbon := 0
	for _, b := range boxes {
		ribbon += 2 * (b.l + b.w + b.h - aoc.Max(b.l, b.w, b.h))
		ribbon += b.l * b.w * b.h
	}

	return paper, ribbon
}
