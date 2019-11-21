package aoc

import (
	"io/ioutil"
	"regexp"
	"strings"
)

type Input interface {
	String() string
	Lines() []string
	Scanner() *Scanner
	Sequence() *Sequence
	Regexp(pattern string) []map[string]string
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
	return NewScanner(i.input)
}

func (i input) Sequence() *Sequence {
	return NewSequence(i.input)
}

func (i input) Regexp(pattern string) []map[string]string {
	r := regexp.MustCompile(pattern)
	res := []map[string]string{}
	for _, l := range i.Lines() {
		match := r.FindStringSubmatch(l)

		m := map[string]string{}
		for i, name := range r.SubexpNames() {
			if i > 0 && i <= len(match) {
				m[name] = match[i]
			}
		}

		Log("regexpInput", "%v from '%s'", m, l)
		res = append(res, m)
	}

	return res
}
