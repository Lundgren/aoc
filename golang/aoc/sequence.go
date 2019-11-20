package aoc

import (
	"strconv"
	"strings"
)

type Sequence struct {
	seq string
}

func NewSequence(seq string) *Sequence {
	return &Sequence{seq: seq}
}

func (s *Sequence) String() string {
	return s.seq
}

func (s *Sequence) LookAndSay() {
	sc := NewScanner(s.seq)
	var sb strings.Builder
	for sc.Next() {
		val := sc.Get()
		amount := sc.Equals()
		sc.Jump(amount - 1)

		sb.WriteString(strconv.Itoa(amount))
		sb.WriteByte(val)
	}
	s.seq = sb.String()
}

// IncreaseLast will increase the last letter of the sequence. Ex a->b or az->ba.
func (s *Sequence) IncreaseLast() {
	res := []byte(s.seq)
	for i := 1; ; i++ {
		if res[len(res)-i] == 'z' {
			res[len(res)-i] = 'a'
			continue
		}

		res[len(res)-i]++
		break
	}
	s.seq = string(res)
}
