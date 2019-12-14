package day14

import (
	"aoc/aoc"
	"math"
	"strings"
)

var CorrectAnswers = []string{"387001", "3412429"}

var Examples = []aoc.Example{
	{Input: `9 ORE => 2 A
8 ORE => 3 B
7 ORE => 5 C
3 A, 4 B => 1 AB
5 B, 7 C => 1 BC
4 C, 1 A => 1 CA
2 AB, 3 BC, 4 CA => 1 FUEL`, Expected1: "165"},
	{Input: `157 ORE => 5 NZVS
165 ORE => 6 DCFZ
44 XJWVT, 5 KHKGT, 1 QDVJ, 29 NZVS, 9 GPVTF, 48 HKGWZ => 1 FUEL
12 HKGWZ, 1 GPVTF, 8 PSHF => 9 QDVJ
179 ORE => 7 PSHF
177 ORE => 5 HKGWZ
7 DCFZ, 7 PSHF => 2 XJWVT
165 ORE => 2 GPVTF
3 DCFZ, 7 NZVS, 5 HKGWZ, 10 PSHF => 8 KHKGT`, Expected1: "13312", Expected2: "82892753"},
	{Input: `2 VPVL, 7 FWMGM, 2 CXFTF, 11 MNCFX => 1 STKFG
17 NVRVD, 3 JNWZP => 8 VPVL
53 STKFG, 6 MNCFX, 46 VJHF, 81 HVMC, 68 CXFTF, 25 GNMV => 1 FUEL
22 VJHF, 37 MNCFX => 5 FWMGM
139 ORE => 4 NVRVD
144 ORE => 7 JNWZP
5 MNCFX, 7 RFSQX, 2 FWMGM, 2 VPVL, 19 CXFTF => 3 HVMC
5 VJHF, 7 MNCFX, 9 VPVL, 37 CXFTF => 6 GNMV
145 ORE => 6 MNCFX
1 NVRVD => 8 CXFTF
1 VJHF, 6 MNCFX => 4 RFSQX
176 ORE => 6 VJHF`, Expected1: "180697", Expected2: "5586022"},
	{Input: `171 ORE => 8 CNZTR
7 ZLQW, 3 BMBT, 9 XCVML, 26 XMNCP, 1 WPTQ, 2 MZWV, 1 RJRHP => 4 PLWSL
114 ORE => 4 BHXH
14 VRPVC => 6 BMBT
6 BHXH, 18 KTJDG, 12 WPTQ, 7 PLWSL, 31 FHTLT, 37 ZDVW => 1 FUEL
6 WPTQ, 2 BMBT, 8 ZLQW, 18 KTJDG, 1 XMNCP, 6 MZWV, 1 RJRHP => 6 FHTLT
15 XDBXC, 2 LTCX, 1 VRPVC => 6 ZLQW
13 WPTQ, 10 LTCX, 3 RJRHP, 14 XMNCP, 2 MZWV, 1 ZLQW => 1 ZDVW
5 BMBT => 4 WPTQ
189 ORE => 9 KTJDG
1 MZWV, 17 XDBXC, 3 XCVML => 2 XMNCP
12 VRPVC, 27 CNZTR => 2 XDBXC
15 KTJDG, 12 BHXH => 5 XCVML
3 BHXH, 2 VRPVC => 7 MZWV
121 ORE => 7 VRPVC
7 XCVML => 6 RJRHP
5 BHXH, 4 VRPVC => 5 LTCX`, Expected1: "2210736", Expected2: "460664"},
}

type part struct {
	name   string
	amount int
}
type recepie struct {
	name   string
	amount int
	parts  []part
}

type fuelCreator struct {
	recepies map[string]recepie
	storage  map[string]int
}

func Solve(in aoc.Input) (interface{}, interface{}) {
	fc := fuelCreator{
		recepies: map[string]recepie{},
		storage:  map[string]int{},
	}

	for _, l := range in.Lines() {
		p := strings.Split(l, " => ")
		name, amount := parse(p[1])
		r := recepie{name, amount, []part{}}

		p = strings.Split(p[0], ", ")
		for _, s := range p {
			name, amount := parse(s)
			r.parts = append(r.parts, part{
				name:   name,
				amount: amount,
			})
		}

		fc.recepies[name] = r
	}

	part1 := fc.create("FUEL", 1)
	part2 := binaryFind("FUEL", 1000000000000, fc)

	return part1, part2
}

func parse(s string) (string, int) {
	p := strings.Split(s, " ")
	return p[1], aoc.ParseInt(p[0])
}

func binaryFind(typ string, maxOres int, fc fuelCreator) int {
	l, r := 0, maxOres/1000
	for l <= r {
		m := (l + r) / 2
		fc.clearStorage()
		ores := fc.create(typ, m)
		if ores > maxOres {
			r = m - 1
		} else if ores < maxOres {
			l = m + 1
		}
	}

	return l - 1
}

func (fc *fuelCreator) create(typ string, amount int) (ores int) {
	if typ == "ORE" {
		return amount
	}

	r := fc.recepies[typ]
	needed := amount - fc.storage[typ]
	times := ceil(needed, r.amount)
	for _, p := range r.parts {
		ores += fc.create(p.name, p.amount*times)
	}

	fc.storage[typ] += times*r.amount - amount
	return ores
}

func (fc *fuelCreator) clearStorage() {
	fc.storage = map[string]int{}
}

func ceil(a, b int) int {
	return int(math.Ceil(float64(a) / float64(b)))
}
