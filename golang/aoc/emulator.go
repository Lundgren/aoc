package aoc

type Emulator struct {
	rules      map[string]Rule
	postStepFn func(step int, state State)
	state      State
	step       int
}

type Rule func(step int, state State) interface{}

type State struct {
	State map[string]string
}

func NewEmulator() *Emulator {
	return &Emulator{
		rules: map[string]Rule{},
		state: State{State: map[string]string{}},
	}
}

func (e *Emulator) SetRule(key string, fn Rule) {
	e.rules[key] = fn
}

func (e *Emulator) SetPostStepFn(fn func(step int, state State)) {
	e.postStepFn = fn
}

func (e *Emulator) State() State {
	return e.state
}

func (e *Emulator) ClearState() {
	e.step = 0
	e.state = State{State: map[string]string{}}
}

func (e *Emulator) Run(times int) State {
	for i := 0; i < times; i++ {
		e.run()
	}
	return e.state
}

func (e *Emulator) RunUntilNoChange() State {
	changed := true
	for changed {
		changed = e.run()
	}

	return e.state
}

func (e *Emulator) run() bool {
	changed := false
	for key, fn := range e.rules {
		res := toStr(fn(e.step, e.state))
		if res != e.state.State[key] {
			changed = true
			e.state.State[key] = res
		}
	}

	if e.postStepFn != nil {
		e.postStepFn(e.step, e.state)
	}
	e.step++
	return changed
}

func (s *State) Uint16(key string) uint16 {
	v, ok := s.State[key]
	if !ok {
		return 0
	}
	return uint16(ParseInt(v))
}

func (s *State) Int(key string) int {
	v, ok := s.State[key]
	if !ok {
		return 0
	}
	return ParseInt(v)
}
