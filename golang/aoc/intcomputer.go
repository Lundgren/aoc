package aoc

type IntComputer struct {
	State     IntComputerState
	Inputs    []int64
	Outputs   []int64
	Halted    bool
	lastInput int64
}

type IntComputerState struct {
	Data       []int64
	pc         int64
	baseOffset int64
}

const (
	instrAdd = iota + 1
	instrMult
	instrInput
	instrOutput
	instrJumpIfTrue
	instrJumpIfFalse
	instrLessThan
	instrEquals
	instrBaseOffset
	instrHalt = 99
)
const (
	paramPositional = iota
	paramImmediate
	paramRelative
)

func NewIntComputer(instructions []int) *IntComputer {
	d := make([]int64, len(instructions))
	for i, v := range instructions {
		d[i] = int64(v)
	}
	return &IntComputer{
		State: IntComputerState{
			Data: d,
		},
	}
}

func (c *IntComputer) SaveState() IntComputerState {
	return c.State
}

func (c *IntComputer) LoadState(state IntComputerState) {
	c.State = state
}

func (c *IntComputer) QueueInput(inputs ...int64) {
	c.Inputs = append(c.Inputs, inputs...)
}

func (c *IntComputer) SetInput(input int64) {
	c.Inputs = []int64{input}
}

func (c *IntComputer) RunUntilHalt() int64 {
	for !c.Halted {
		c.step()
	}
	return c.Outputs[len(c.Outputs)-1]
}

func (c *IntComputer) RunUntilOutput() int64 {
	outputs := len(c.Outputs)
	for !c.Halted && outputs == len(c.Outputs) {
		c.step()
	}
	return c.Outputs[len(c.Outputs)-1]
}

func (c *IntComputer) step() {
	instr, p1, p2, p3 := c.getParams()
	v1, v2 := c.get(p1), c.get(p2)

	switch instr {
	case instrAdd:
		c.set(p3, v1+v2)
		c.State.pc += 4
	case instrMult:
		c.set(p3, v1*v2)
		c.State.pc += 4
	case instrInput:
		c.set(p1, c.nextInput())
		c.State.pc += 2
	case instrOutput:
		c.Outputs = append(c.Outputs, v1)
		c.State.pc += 2
	case instrJumpIfTrue:
		if v1 != 0 {
			c.State.pc = v2
		} else {
			c.State.pc += 3
		}
	case instrJumpIfFalse:
		if v1 == 0 {
			c.State.pc = v2
		} else {
			c.State.pc += 3
		}
	case instrLessThan:
		if v1 < v2 {
			c.set(p3, 1)
		} else {
			c.set(p3, 0)
		}
		c.State.pc += 4
	case instrEquals:
		if v1 == v2 {
			c.set(p3, 1)
		} else {
			c.set(p3, 0)
		}
		c.State.pc += 4
	case instrBaseOffset:
		c.State.baseOffset += v1
		c.State.pc += 2
	case instrHalt:
		c.Halted = true
	default:
		panic("")
	}
}

func (c *IntComputer) getParams() (instr, p1, p2, p3 int64) {
	instr, v := c.get(c.State.pc)%100, make([]int64, 3)
	if instr == instrHalt {
		return
	}

	t := c.get(c.State.pc) / 10
	for offset := int64(1); offset <= 3; offset++ {
		t = t / 10
		switch t % 10 {
		case paramPositional:
			v[offset-1] = c.get(c.State.pc + offset)
		case paramImmediate:
			v[offset-1] = c.State.pc + offset
		case paramRelative:
			v[offset-1] = c.State.baseOffset + c.get(c.State.pc+offset)
		}
	}

	return instr, v[0], v[1], v[2]
}

func (c *IntComputer) get(pos int64) int64 {
	if pos >= int64(len(c.State.Data)) {
		return 0
	}
	return c.State.Data[pos]
}

func (c *IntComputer) set(pos, val int64) {
	if pos >= int64(len(c.State.Data)) {
		tmp := make([]int64, pos+1)
		c.State.Data = append(c.State.Data[:len(c.State.Data)], tmp[len(c.State.Data):]...)
	}
	c.State.Data[pos] = val
}

func (c *IntComputer) nextInput() int64 {
	if len(c.Inputs) > 0 {
		c.lastInput = c.Inputs[0]
		c.Inputs = c.Inputs[1:]
	}
	return c.lastInput
}
