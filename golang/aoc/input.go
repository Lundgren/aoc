package aoc

import (
	"io/ioutil"
	"strings"
)

type Input interface {
	String() string
	Lines() []string
	Scanner() *Scanner
}

type input struct {
	input string
}

func FromFile(path string) Input {
	buf, err := ioutil.ReadFile(path)
	Check(err)
	return input{input: string(buf)}
}

func FromString(in string) Input {
	return input{input: in}
}

func (i input) String() string {
	return i.input
}

func (i input) Lines() []string {
	return strings.Split(i.input, "\n")
}

func (i input) Scanner() *Scanner {
	return &Scanner{
		source: i.input,
		idx:    -1,
	}
}

type Scanner struct {
	source string
	idx    int
}

func (s *Scanner) Next() bool {
	s.idx++
	return s.idx < len(s.source)
}

func (s *Scanner) Get() byte {
	return s.source[s.idx]
}

func (s *Scanner) Jump(steps int) {
	s.idx += steps
}

func (s *Scanner) Peek() byte {
	if s.idx+1 >= len(s.source) {
		return ' '
	}
	return s.source[s.idx+1]
}
