package aoc

import (
	"fmt"
	"strings"
)

const (
	north = iota
	east
	south
	west
)

type Point struct {
	X, Y                   int
	Move                   int
	MinX, MaxX, MinY, MaxY int
	Limits                 []int
	Direction              int
	Visits                 map[string]int
	MovesTo                map[string]int
}

func NewPoint() *Point {
	return &Point{
		Direction: north,
		Visits:    map[string]int{"[0, 0]": 1},
		MovesTo:   map[string]int{"[0, 0]": 0},
	}
}

func NewPointFromString(p string) *Point {
	var x, y int
	fmt.Sscanf(p, "[%d, %d]", &x, &y)
	return &Point{
		X:         x,
		Y:         y,
		MaxX:      x,
		MinX:      x,
		MaxY:      y,
		MinY:      y,
		Direction: north,
		Visits:    map[string]int{fmt.Sprintf("[%d, %d]", x, y): 1},
		MovesTo:   map[string]int{fmt.Sprintf("[%d, %d]", x, y): 0},
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
	p.Move++
	p.Visits[p.String()]++
	p.MovesTo[p.String()] = p.Move
	p.MaxX = Max(p.X, p.MaxX)
	p.MinX = Min(p.X, p.MinX)
	p.MaxY = Max(p.Y, p.MaxY)
	p.MinY = Min(p.Y, p.MinY)
}

func (p *Point) String() string {
	return fmt.Sprintf("[%d, %d]", p.X, p.Y)
}

func (p *Point) Draw() string {
	var sb strings.Builder

	for y := p.MaxY + 1; y >= p.MinY-1; y-- {
		for x := p.MinX - 1; x <= p.MaxX+1; x++ {
			_, ok := p.Visits[fmt.Sprintf("[%d, %d]", x, y)]
			if x == 0 && y == 0 {
				sb.WriteByte('o')
			} else if ok {
				sb.WriteByte('*')
			} else {
				sb.WriteByte('.')
			}
			sb.WriteByte(' ')
		}
		sb.WriteByte('\n')
	}
	return sb.String()
}
