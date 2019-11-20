package aoc

type Set struct {
	set map[string]bool
}

func NewSet() *Set {
	return &Set{
		set: map[string]bool{},
	}
}

func (s *Set) Add(key string) {
	s.set[key] = true
}

func (s *Set) Remove(key string) {
	delete(s.set, key)
}

func (s *Set) Has(key string) bool {
	_, ok := s.set[key]
	return ok
}

func (s *Set) Empty() bool {
	return len(s.set) == 0
}

func (s *Set) Len() int {
	return len(s.set)
}

func (s *Set) List() []string {
	res := []string{}
	for k := range s.set {
		res = append(res, k)
	}
	return res
}

func (s *Set) Copy() *Set {
	set := NewSet()
	for k := range s.set {
		set.Add(k)
	}
	return set
}

func (s *Set) Except(key string) *Set {
	set := NewSet()
	for k := range s.set {
		if k != key {
			set.Add(k)
		}
	}
	return set
}
