package aoc

import (
	"strconv"
)

type Emulator struct {
	rules map[string]Rule
	state State
}

type Rule func(state State) interface{}

type State struct {
	state map[string]string
}

func NewEmulator() *Emulator {
	return &Emulator{
		rules: map[string]Rule{},
		state: State{state: map[string]string{}},
	}
}

func (e *Emulator) SetRule(key string, fn Rule) {
	e.rules[key] = fn
}

func (e *Emulator) ClearState() {
	e.state = State{state: map[string]string{}}
}

func (e *Emulator) RunUntilNoChange() State {
	for {
		changed := false
		for key, fn := range e.rules {
			res := toStr(fn(e.state))
			if res != e.state.state[key] {
				changed = true
				e.state.state[key] = res
			}
		}

		if !changed {
			break
		}
	}

	return e.state
}

func (s *State) Uint16(key string) uint16 {
	v, ok := s.state[key]
	if !ok {
		return 0
	}
	i, err := strconv.ParseUint(v, 10, 64)
	Check(err)
	return uint16(i)
}
