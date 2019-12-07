package aoc

type IntComputer struct {
	Data      []int
	Inputs    []int
	Halted    bool
	Output    int
	pc        int
	lastInput int
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
	instrHalt = 99
)

func NewIntComputer(instructions []int) *IntComputer {
	return &IntComputer{
		Data: append([]int(nil), instructions...),
	}
}

func (c *IntComputer) QueueInput(inputs ...int) {
	c.Inputs = append(c.Inputs, inputs...)
}

func (c *IntComputer) RunUntilHalt() int {
	for !c.Halted {
		c.step()
	}
	return c.Output
}

func (c *IntComputer) RunUntilOutput() int {
	current := c.Output
	for !c.Halted && c.Output == current {
		c.step()
	}
	return c.Output
}

func (c *IntComputer) Step() {
	c.step()
}

func (c *IntComputer) step() {
	instr, v1, v2 := c.get()

	switch instr {
	case instrAdd:
		c.set(3, v1+v2)
		c.pc += 4
	case instrMult:
		c.set(3, v1*v2)
		c.pc += 4
	case instrInput:
		c.set(1, c.nextInput())
		c.pc += 2
	case instrOutput:
		c.Output = v1
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
			c.set(3, 1)
		} else {
			c.set(3, 0)
		}
		c.pc += 4
	case instrEquals:
		if v1 == v2 {
			c.set(3, 1)
		} else {
			c.set(3, 0)
		}
		c.pc += 4
	case instrHalt:
		c.Halted = true
	default:
		panic("")
	}
}

func (c *IntComputer) get() (instr, v1, v2 int) {
	instr = c.Data[c.pc] % 100
	if instr == instrHalt {
		return
	}

	if len(c.Data) > c.pc+1 {
		if (c.Data[c.pc]/100)%10 == 0 {
			v1 = c.Data[c.Data[c.pc+1]]
		} else {
			v1 = c.Data[c.pc+1]
		}
	}
	if len(c.Data) > c.pc+2 && instr != 3 && instr != 4 {
		if (c.Data[c.pc]/1000)%10 == 0 {
			v2 = c.Data[c.Data[c.pc+2]]
		} else {
			v2 = c.Data[c.pc+2]
		}
	}
	return
}

func (c *IntComputer) set(pcDelta, val int) {
	c.Data[c.Data[c.pc+pcDelta]] = val
}

func (c *IntComputer) nextInput() int {
	if len(c.Inputs) > 0 {
		c.lastInput = c.Inputs[0]
		c.Inputs = c.Inputs[1:]
	}
	return c.lastInput
}
