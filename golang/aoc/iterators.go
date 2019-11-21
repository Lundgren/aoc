package aoc

// Iterate over all permutations of a string slice
// Ex: ABC => ACB, CAB, CBA, ...
type Permutator struct {
	set   []string
	p     []int
	i     int
	first bool
}

func NewPermutator(set []string) *Permutator {
	p := make([]int, len(set)+1)
	for i := 0; i < len(p); i++ {
		p[i] = i
	}
	return &Permutator{
		set: set,
		p:   p,
		i:   1,
	}
}

//https://quickperm.org/
func (p *Permutator) Next() bool {
	if !p.first {
		p.first = true
		return true
	}

	if p.i < len(p.set) {
		p.p[p.i]--
		j := p.p[p.i]
		if p.i%2 == 0 {
			j = 0
		}
		p.set[p.i], p.set[j] = p.set[j], p.set[p.i]

		for p.i = 1; p.p[p.i] == 0; p.i++ {
			p.p[p.i] = p.i
		}

		return true
	}

	return false
}

func (p *Permutator) Get() []string {
	Log("permutator", "%v", p.set)
	return p.set
}

func (p *Permutator) Sum() int {
	sum := 0
	for _, s := range p.Get() {
		sum += ParseInt(s)
	}
	return sum
}

// Iterate over all combinations of a string slice
// ABC => A, B, C, AB, AC, BC, ABC
type Combinator struct {
	set []string
	i   int
}

func NewCombinator(set []string) *Combinator {
	return &Combinator{
		set: set,
		i:   0,
	}
}

func (c *Combinator) Next() bool {
	c.i++
	return c.i < 1<<uint(len(c.set))
}

func (c *Combinator) Get() []string {
	res := []string{}
	for j := uint(0); j < uint(len(c.set)); j++ {
		if (c.i>>j)&1 == 1 {
			res = append(res, c.set[j])
		}
	}

	Log("combinator", "%v", res)
	return res
}

func (c *Combinator) Sum() int {
	sum := 0
	for _, s := range c.Get() {
		sum += ParseInt(s)
	}
	return sum
}
