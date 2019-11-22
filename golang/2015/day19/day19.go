package day19

import (
	"aoc/aoc"
	"sort"
	"strings"
)

var CorrectAnswers = []string{"535", "212"}

var Examples = []aoc.Example{}

func Solve(in aoc.Input) (interface{}, interface{}) {
	molecule := in.String()
	s := aoc.NewSet()
	for i := 0; i < len(molecule); i++ {
		r, ok := replacements[molecule[i:i+1]]
		if ok {
			addMolecules(s, molecule[:i], molecule[i+1:], r)
		}
		if i < len(molecule)-1 {
			r, ok = replacements[molecule[i:i+2]]
			if ok {
				addMolecules(s, molecule[:i], molecule[i+2:], r)
			}
		}
	}
	part1 := s.Len()

	// Part 2 remove largest molecules until only e left
	keys := []string{}
	backwardRep := map[string]string{}
	for k, v := range replacements {
		for _, r := range v {
			backwardRep[r] = k
			keys = append(keys, r)
		}
	}

	sort.SliceStable(keys, func(i, j int) bool {
		return len(keys[i]) > len(keys[j])
	})

	part2 := 0
	for molecule != "e" {
		for _, k := range keys {
			if strings.Contains(molecule, k) {
				molecule = strings.Replace(molecule, k, backwardRep[k], 1)
				part2++
				break
			}
		}
	}

	return part1, part2
}

func addMolecules(s *aoc.Set, prefix, suffix string, repl []string) {
	for _, r := range repl {
		var sb strings.Builder
		sb.WriteString(prefix)
		sb.WriteString(r)
		sb.WriteString(suffix)
		s.Add(sb.String())
	}
}

var replacements = aoc.StringSliceMap(`Al => ThF
Al => ThRnFAr
B => BCa
B => TiB
B => TiRnFAr
Ca => CaCa
Ca => PB
Ca => PRnFAr
Ca => SiRnFYFAr
Ca => SiRnMgAr
Ca => SiTh
F => CaF
F => PMg
F => SiAl
H => CRnAlAr
H => CRnFYFYFAr
H => CRnFYMgAr
H => CRnMgYFAr
H => HCa
H => NRnFYFAr
H => NRnMgAr
H => NTh
H => OB
H => ORnFAr
Mg => BF
Mg => TiMg
N => CRnFAr
N => HSi
O => CRnFYFAr
O => CRnMgAr
O => HP
O => NRnFAr
O => OTi
P => CaP
P => PTi
P => SiRnFAr
Si => CaSi
Th => ThCa
Ti => BP
Ti => TiTi
e => HF
e => NAl
e => OMg`, " => ")
