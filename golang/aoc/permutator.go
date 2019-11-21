package aoc

type Permutator struct {
	src   []string
	p     []int
	i     int
	first bool
}

func NewPermutator(arr []string) *Permutator {
	p := make([]int, len(arr)+1)
	for i := 0; i < len(p); i++ {
		p[i] = i
	}
	return &Permutator{
		src: arr,
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

	if p.i < len(p.src) {
		p.p[p.i]--
		j := p.p[p.i]
		if p.i%2 == 0 {
			j = 0
		}
		p.src[p.i], p.src[j] = p.src[j], p.src[p.i]

		for p.i = 1; p.p[p.i] == 0; p.i++ {
			p.p[p.i] = p.i
		}
		return true
	}

	return false
}

func (p *Permutator) Get() []string {
	return p.src
}
