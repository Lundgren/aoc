package aoc

type Grid struct {
	width, height int
	State         map[int]int
}

type Updater func(x, y, state int) int

func NewGrid(width, height int) *Grid {
	return &Grid{
		width:  width,
		height: height,
		State:  map[int]int{},
	}
}

func (g *Grid) UpdateStr(fromX, fromY, toX, toY string, fn Updater) {
	g.Update(ParseInt(fromX), ParseInt(fromY), ParseInt(toX), ParseInt(toY), fn)
}

func (g *Grid) Update(fromX, fromY, toX, toY int, fn Updater) {
	for x := fromX; x <= toX; x++ {
		for y := fromY; y <= toY; y++ {
			pos := x*g.width + y
			newState := fn(x, y, g.State[pos])
			g.State[pos] = newState
		}
	}
}
