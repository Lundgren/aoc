package aoc

import (
	"fmt"
)

const (
	north = iota
	east
	south
	west
)

type Point struct {
	X, Y      int
	Limits    []int
	Direction int
	Visits    map[string]int
}

func NewPoint() *Point {
	return &Point{
		X:         0,
		Y:         0,
		Direction: north,
		Visits:    map[string]int{"[0, 0]": 1},
	}
}

func NewPointFromString(p string) *Point {
	var x, y int
	fmt.Sscanf(p, "[%d, %d]", &x, &y)
	return &Point{
		X:         x,
		Y:         y,
		Direction: north,
		Visits:    map[string]int{fmt.Sprintf("[%d, %d]", x, y): 1},
	}
}

func (p *Point) MoveNorth() {
	p.Y += 1
	p.registerVisit()
}

func (p *Point) MoveSouth() {
	p.Y -= 1
	p.registerVisit()
}

func (p *Point) MoveEast() {
	p.X += 1
	p.registerVisit()
}

func (p *Point) MoveWest() {
	p.X -= 1
	p.registerVisit()
}

func (p *Point) MoveForward(steps int) {
	for i := 0; i < steps; i++ {
		switch p.Direction {
		case north:
			p.MoveNorth()
		case east:
			p.MoveEast()
		case south:
			p.MoveSouth()
		case west:
			p.MoveWest()
		default:
			panic("Unknown direction")
		}
	}
}

func (p *Point) TurnRight() {
	p.Direction = (p.Direction + 1) % 4
}

func (p *Point) TurnLeft() {
	p.Direction = (p.Direction - 1 + 4) % 4
}

func (p *Point) DistanceFrom(x, y int) int {
	return Abs(p.X-x) + Abs(p.Y-y)
}

func (p *Point) BeenBefore() bool {
	return p.Visits[p.String()] > 1
}

func (p *Point) registerVisit() {
	p.Visits[p.String()]++
}

func (p *Point) String() string {
	return fmt.Sprintf("[%d, %d]", p.X, p.Y)
}
