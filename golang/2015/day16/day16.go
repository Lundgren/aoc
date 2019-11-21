package day16

import (
	"aoc/aoc"
)

var CorrectAnswers = []string{"103", "405"}

var Examples = []aoc.Example{}

var correct = aoc.IntMap(`children: 3
cats: 7
samoyeds: 2
pomeranians: 3
akitas: 0
vizslas: 0
goldfish: 5
trees: 3
cars: 2
perfumes: 1`)

func Solve(in aoc.Input) (interface{}, interface{}) {
	part1, part2 := "", ""
	for _, m := range in.Regexp(`Sue (?P<nbr>\d+): (?P<type1>\w+): (?P<amount1>\d+), (?P<type2>\w+): (?P<amount2>\d+), (?P<type3>\w+): (?P<amount3>\d+)`) {
		if correct[m["type1"]] == aoc.ParseInt(m["amount1"]) &&
			correct[m["type2"]] == aoc.ParseInt(m["amount2"]) &&
			correct[m["type3"]] == aoc.ParseInt(m["amount3"]) {
			part1 = m["nbr"]
		}

		if correctPart2(m["type1"], m["amount1"]) &&
			correctPart2(m["type2"], m["amount2"]) &&
			correctPart2(m["type3"], m["amount3"]) {
			part2 = m["nbr"]
		}
	}
	return part1, part2
}

func correctPart2(typ, val string) bool {
	if typ == "cats" || typ == "trees" {
		return aoc.ParseInt(val) > correct[typ]
	} else if typ == "pomeranians" || typ == "goldfish" {
		return aoc.ParseInt(val) < correct[typ]
	}
	return aoc.ParseInt(val) == correct[typ]
}
