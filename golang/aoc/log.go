package aoc

import (
	"fmt"
)

const amountToLogPerTag = 3

var (
	debug = false
	msgs  = map[string]int{}
)

func SetDebug() {
	debug = true
}

func Log(tag, msg string, x ...interface{}) {
	if debug && msgs[tag] < amountToLogPerTag {
		m := fmt.Sprintf("> %s\n", msg)
		fmt.Printf(m, x...)
	}
	msgs[tag]++
}
