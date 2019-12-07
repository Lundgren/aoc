package aoc

import (
	"io/ioutil"
	"regexp"
	"strings"
)

type Input struct {
	input string
}

func FromFile(path string) Input {
	buf, err := ioutil.ReadFile(path)
	Check(err)
	return Input{input: string(buf)}
}

func FromString(in string) Input {
	return Input{input: in}
}

func (i *Input) String() string {
	return i.input
}

func (i *Input) Lines() []string {
	return strings.Split(i.input, "\n")
}

func (i *Input) Columns() []string {
	lines := i.Lines()
	res := make([]string, len(lines[0]))
	for _, l := range lines {
		for i, ch := range l {
			res[i] += string(ch)
		}
	}
	return res
}

func (i *Input) IntList() []int {
	res := []int{}
	values := i.Lines()
	if len(values) == 1 {
		values = strings.Split(i.input, ",")
	}

	for _, v := range values {
		res = append(res, ParseInt(v))
	}
	return res
}

func (i *Input) Scanner() *Scanner {
	return NewScanner(i.input)
}

func (i *Input) Sequence() *Sequence {
	return NewSequence(i.input)
}

func (i *Input) Split(pattern string) []string {
	return strings.Split(i.input, pattern)
}

func (i *Input) Regexp(pattern string) []map[string]string {
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

func (i *Input) Empty() bool {
	return len(i.input) == 0
}
