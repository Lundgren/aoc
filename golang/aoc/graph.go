package aoc

type Graph struct {
	distances map[string]int
	points    *Set
}

func NewGraph() *Graph {
	return &Graph{
		distances: map[string]int{},
		points:    NewSet(),
	}
}

func (g *Graph) Points() *Set {
	return g.points
}

func (g *Graph) AddDistance(from, to string, distance int) {
	g.distances[from+to] = distance
	g.distances[to+from] = distance
	g.points.Add(from)
	g.points.Add(to)
}

func (g *Graph) AddOneWayDistance(from, to string, distance int) {
	g.distances[from+to] = distance
	g.points.Add(from)
	g.points.Add(to)
}

func (g *Graph) DistanceBetween(from, to string) int {
	return g.distances[from+to]
}

func (g *Graph) DistanceBetweenMany(points []string) int {
	prev := ""
	distance := 0
	for i, p := range points {
		if i > 0 {
			distance += g.DistanceBetween(prev, p)
		}
		prev = p
	}

	return distance
}

func (g *Graph) Permutator() *Permutator {
	return NewPermutator(g.points.List())
}
