package aoc

import "github.com/gitchander/permutation"

type Graph struct {
	distances map[string]int
	places    *Set
}

func NewGraph() *Graph {
	return &Graph{
		distances: map[string]int{},
		places:    NewSet(),
	}
}

func (g *Graph) AddDistance(from, to string, distance int) {
	g.distances[from+to] = distance
	g.distances[to+from] = distance
	g.places.Add(from)
	g.places.Add(to)
}

func (g *Graph) Permutator() *permutation.Permutator {
	return permutation.New(permutation.StringSlice(g.places.List()))
}

func (g *Graph) BruteforceMinMaxDistToAll() (shortest, longest int) {
	shortest = 99999999
	for _, from := range g.places.List() {
		short, long := recursiveDist(from, g.places.Except(from), g.distances)

		shortest = Min(shortest, short)
		longest = Max(longest, long)
	}
	return shortest, longest
}

func recursiveDist(from string, places *Set, distances map[string]int) (shortest, longest int) {
	if places.Empty() {
		return 0, 0
	}

	shortest = 99999999
	for _, to := range places.List() {
		dist := distances[from+to]
		short, long := recursiveDist(to, places.Except(to), distances)

		shortest = Min(shortest, short+dist)
		longest = Max(longest, long+dist)
	}

	return shortest, longest
}
