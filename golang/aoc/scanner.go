package aoc

type Scanner struct {
	source string
	idx    int
}

func NewScanner(s string) *Scanner {
	return &Scanner{
		source: s,
		idx:    -1,
	}
}

func (s *Scanner) Next() bool {
	s.idx++
	return s.idx < len(s.source)
}

func (s *Scanner) Get() byte {
	return s.source[s.idx]
}

func (s *Scanner) Getn(n int) string {
	return s.source[s.idx : s.idx+n]
}

func (s *Scanner) Index() int {
	return s.idx
}

func (s *Scanner) Jump(steps int) {
	s.idx += steps
}

func (s *Scanner) Peek() byte {
	return s.Peekn(1)
}

func (s *Scanner) Peekn(n int) byte {
	if s.idx+n >= len(s.source) {
		return ' '
	}
	return s.source[s.idx+n]
}

func (s *Scanner) ScanNumber() int {
	start := s.idx
	for s.Get() >= '0' && s.Get() <= '9' {
		s.Next()
	}
	return ParseInt(s.source[start:s.idx])
}

// Equals count amount of equal chars exists from current.
func (s *Scanner) Equals() int {
	v := s.source[s.idx]
	count := 1
	for i := s.idx + 1; i < len(s.source); i++ {
		if v != s.source[i] {
			return count
		}
		count++
	}
	return count
}
