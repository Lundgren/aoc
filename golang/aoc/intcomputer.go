package aoc

type IntComputer struct {
	Data       []int64
	Inputs     []int64
	Outputs    []int64
	Halted     bool
	pc         int64
	baseOffset int64
	lastInput  int64
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
		Data: d,
	}
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
		c.pc += 4
	case instrMult:
		c.set(p3, v1*v2)
		c.pc += 4
	case instrInput:
		c.set(p1, c.nextInput())
		c.pc += 2
	case instrOutput:
		c.Outputs = append(c.Outputs, v1)
		c.pc += 2
	case instrJumpIfTrue:
		if v1 != 0 {
			c.pc = v2
		} else {
			c.pc += 3
		}
	case instrJumpIfFalse:
		if v1 == 0 {
			c.pc = v2
		} else {
			c.pc += 3
		}
	case instrLessThan:
		if v1 < v2 {
			c.set(p3, 1)
		} else {
			c.set(p3, 0)
		}
		c.pc += 4
	case instrEquals:
		if v1 == v2 {
			c.set(p3, 1)
		} else {
			c.set(p3, 0)
		}
		c.pc += 4
	case instrBaseOffset:
		c.baseOffset += v1
		c.pc += 2
	case instrHalt:
		c.Halted = true
	default:
		panic("")
	}
}

func (c *IntComputer) getParams() (instr, p1, p2, p3 int64) {
	instr, v := c.get(c.pc)%100, make([]int64, 3)
	if instr == instrHalt {
		return
	}

	t := c.get(c.pc) / 10
	for offset := int64(1); offset <= 3; offset++ {
		t = t / 10
		switch t % 10 {
		case paramPositional:
			v[offset-1] = c.get(c.pc + offset)
		case paramImmediate:
			v[offset-1] = c.pc + offset
		case paramRelative:
			v[offset-1] = c.baseOffset + c.get(c.pc+offset)
		}
	}

	return instr, v[0], v[1], v[2]
}

func (c *IntComputer) get(pos int64) int64 {
	if pos >= int64(len(c.Data)) {
		return 0
	}
	return c.Data[pos]
}

func (c *IntComputer) set(pos, val int64) {
	if pos >= int64(len(c.Data)) {
		tmp := make([]int64, pos+1)
		c.Data = append(c.Data[:len(c.Data)], tmp[len(c.Data):]...)
	}
	c.Data[pos] = val
}

func (c *IntComputer) nextInput() int64 {
	if len(c.Inputs) > 0 {
		c.lastInput = c.Inputs[0]
		c.Inputs = c.Inputs[1:]
	}
	return c.lastInput
}
