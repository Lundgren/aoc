package main

import (
	aoc2015 "aoc/2015"
	"aoc/aoc"
)

/*
Problems
- Read input, ex from file
- Parse into some data struct
   - String list
   - Int list
   - Pos list
*/

func main() {
	runner := aoc.NewRunner()
	aoc2015.Register(&runner)

	runner.RunLatest()
}
