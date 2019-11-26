package day13

import (
	"aoc/aoc"
	"math/bits"
)

var CorrectAnswers = []string{"96", "141"}

var Examples = []aoc.Example{}

const input = 1358
const goalX, goalY = 31, 39

func Solve(in aoc.Input) (interface{}, interface{}) {
	visited := map[int]bool{}
	visit := func(x, y int) bool {
		hasVisit := visited[x<<32+y]
		visited[x<<32+y] = true
		return hasVisit
	}

	part1 := aoc.AStar([]int{1, 1, 0}, func(val interface{}, addStep aoc.AddStep) bool {
		pos := val.([]int)

		for delta := -2; delta <= 2; delta++ {
			x, y, moves := pos[0]+delta%2, pos[1]+delta/2, pos[2]+1
			if isOpenSpace(x, y) && !visit(x, y) {
				cost := distance(x, y)
				addStep([]int{x, y, moves}, cost)
			}
		}
		return false
	}).([]int)

	visited = map[int]bool{}
	aoc.AStar([]int{1, 1, 0}, func(val interface{}, addStep aoc.AddStep) bool {
		pos := val.([]int)

		for delta := -2; delta <= 2; delta++ {
			x, y, moves := pos[0]+delta%2, pos[1]+delta/2, pos[2]+1
			if moves <= 50 && isOpenSpace(x, y) && !visit(x, y) {
				cost := distance(x, y)
				addStep([]int{x, y, moves}, cost)
			}
		}
		return false
	})

	return part1[2], len(visited)
}

func isOpenSpace(x, y int) bool {
	return x >= 0 && y >= 0 && bits.OnesCount64(uint64(x*x+3*x+2*x*y+y+y*y+input))%2 == 0
}

func distance(x, y int) int {
	return aoc.Abs(goalX-x) + aoc.Abs(goalY-y)
}
