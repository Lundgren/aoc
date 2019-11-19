package aoc

import (
	"io/ioutil"
	"strings"
)

type Input interface {
	String() string
	Lines() []string
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
