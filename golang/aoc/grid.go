package aoc

import (
	"strconv"
	"strings"
)

type Grid struct {
	Width, Height int
	State         []int
}

type Updater func(x, y, state int) int

func NewGrid(width, height int) *Grid {
	return &Grid{
		Width:  width,
		Height: height,
		State:  make([]int, width*height),
	}
}

func NewGridFromString(grid string, vals map[rune]int) *Grid {
	s := make([]int, len(grid))
	height, width := 0, 0
	for y, l := range strings.Split(grid, "\n") {
		width = len(l)
		height++

		for x, ch := range l {
			pos := y*width + x
			s[pos] = vals[ch]
		}
	}

	return &Grid{
		Width:  width,
		Height: height,
		State:  s,
	}
}

func (g *Grid) String() string {
	var sb strings.Builder
	for y := 0; y < g.Height; y++ {
		for x := 0; x < g.Width; x++ {
			pos := y*g.Width + x
			sb.WriteString(strconv.Itoa(g.State[pos]))
		}
		sb.WriteByte('\n')
	}
	return sb.String()
}

func (g *Grid) Get(x, y int) int {
	return g.State[y*g.Width+x]
}

func (g *Grid) Set(x, y, val int) {
	g.State[y*g.Width+x] = val
}

func (g *Grid) UpdateStr(fromX, fromY, toX, toY string, fn Updater) {
	g.Update(ParseInt(fromX), ParseInt(fromY), ParseInt(toX), ParseInt(toY), fn)
}

func (g *Grid) UpdateAll(fn Updater) {
	g.Update(0, 0, g.Width-1, g.Height-1, fn)
}

func (g *Grid) Update(fromX, fromY, toX, toY int, fn Updater) {
	s := make([]int, g.Width*g.Height)
	for y := 0; y < g.Height; y++ {
		for x := 0; x < g.Width; x++ {
			pos := y*g.Width + x
			if y >= fromY && y <= toY && x >= fromX && x <= toX {
				s[pos] = fn(x, y, g.State[pos])
			} else {
				s[pos] = g.State[pos]
			}
		}
	}
	g.State = s
}

func (g *Grid) Neighbors(x, y int) []int {
	res := []int{}
	for yDelta := -1; yDelta <= 1; yDelta++ {
		for xDelta := -1; xDelta <= 1; xDelta++ {
			x2, y2 := x+xDelta, y+yDelta
			if (xDelta != 0 || yDelta != 0) &&
				x2 >= 0 && y2 >= 0 &&
				x2 < g.Width && y2 < g.Height {
				pos := y2*g.Width + x2
				res = append(res, g.State[pos])
			}
		}
	}
	return res
}

func (g *Grid) Sum() int {
	return Sum(g.State)
}

func (g *Grid) Draw(markers map[int]byte) string {
	var sb strings.Builder
	for y := 0; y < g.Height; y++ {
		for x := 0; x < g.Width; x++ {
			pos := y*g.Width + x
			sb.WriteByte(markers[g.State[pos]])
		}
		sb.WriteByte('\n')
	}
	return sb.String()
}
