package aoc

import (
	"fmt"
)

type Point struct {
	X, Y   int
	Visits map[string]int
}

func NewPoint() *Point {
	return &Point{
		X:      0,
		Y:      0,
		Visits: map[string]int{"[0, 0]": 1},
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

func (p *Point) registerVisit() {
	p.Visits[p.String()]++
}

func (p *Point) String() string {
	return fmt.Sprintf("[%d, %d]", p.X, p.Y)
}
