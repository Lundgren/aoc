package day11

import (
	"aoc/aoc"
	"fmt"
	"math/bits"
)

var CorrectAnswers = []string{"31", "", "55"}

var Examples = []aoc.Example{
	// {Input: "", Expected1: "", Expected2: ""},
}

const (
	// _      = iota
	thuGen = 1 << (iota)
	pluGen
	strGen
	proGen
	rutGen
	eleGen
	dilGen
	thuChip
	pluChip
	strChip
	proChip
	rutChip
	eleChip
	dilChip
)
const (
	amount   = 7
	row      = amount * 2
	genMask  = thuGen | pluGen | strGen | proGen | rutGen | eleGen | dilGen
	chipMask = thuChip | pluChip | strChip | proChip | rutChip | eleChip | dilChip
)

var floorMask = []uint64{
	((^uint64(0)) >> (64 - row)) << (row * 0),
	((^uint64(0)) >> (64 - row)) << (row * 1),
	((^uint64(0)) >> (64 - row)) << (row * 2),
	((^uint64(0)) >> (64 - row)) << (row * 3),
}

var allEquipment = []uint64{
	thuGen, pluGen, strGen, proGen, rutGen,
	thuChip, pluChip, strChip, proChip, rutChip,
}
var initEquipment = []uint64{
	thuGen | thuChip | pluGen | strGen,
	pluChip | strChip,
	proGen | proChip | rutGen | rutChip,
	0,
}

const initEquipments = uint64(
	(proGen|proChip|rutGen|rutChip)<<(row*2) +
		(pluChip|strChip)<<(row*1) +
		(thuGen|thuChip|pluGen|strGen)<<(row*0),
)

const initEquipments2 = uint64(
	(proGen|proChip|rutGen|rutChip)<<(row*2) +
		(pluChip|strChip)<<(row*1) +
		(thuGen|thuChip|pluGen|strGen|eleGen|eleChip|dilGen|dilChip)<<(row*0),
)

const initEquipmentsExample = uint64(
	// (proGen|proChip|rutGen|rutChip)<<(row*2) +
	(thuGen|pluGen)<<(row*1) +
		(thuChip|pluChip)<<(row*0),
)

type step struct {
	oldSteps   []uint64
	equipments uint64
	elevator   uint64
	moves      int
}

func Solve(in aoc.Input) (interface{}, interface{}) {
	init := step{
		oldSteps:   []uint64{initEquipments},
		equipments: initEquipments,
		// equipments: initEquipmentsExample,
	}
	// fmt.Println(print(init))
	aoc.AStar(init, func(val interface{}, addStep aoc.AddStep) bool {
		s := val.(step)
		// fmt.Println("eval, ", s)
		// fmt.Printf("Evaluating \n%b\n%b\n%b\n", s.equipment[0], s.equipment[1], s.equipment[2])
		// eq := s.equipment[s.elevator]
		for _, e1 := range allEquipment {
			for _, e2 := range allEquipment {
				// fmt.Printf(">>> %b\n", (e1 | e2))
				// if eq&e1 > 0 && eq&e2 > 0 {
				if s.elevator > 0 {
					cost, newStep, valid := makeMove(s, e1|e2, s.elevator, s.elevator-1)
					// fmt.Printf(">>> %10b, -1, %d, %t\n", (e1 | e2), cost, valid)
					// fmt.Println("Adding -1 ", cost, valid)
					if cost == 0 {
						// fmt.Printf("Found path- %v \n%s\n", newStep, print(newStep))
						fmt.Printf("Found path- %v \n", newStep)
						return true
					}
					if valid {
						// addStep(newStep, newStep.moves+cost)
						addStep(newStep, cost)
					} else {
						// fmt.Println("invalid", cost, newStep)
					}
				}
				if s.elevator < uint64(len(floorMask)-1) {
					cost, newStep, valid := makeMove(s, e1|e2, s.elevator, s.elevator+1)
					// fmt.Println("Adding +1 ", cost, valid)
					if cost == 0 {
						fmt.Printf("Found path+ %d \n%s\n", newStep.moves, print(newStep))
						// fmt.Println(newStep.oldSteps)
						// for i, st := range newStep.oldSteps {
						// 	fmt.Printf("Step %d\n%s\n", i, print2(st))
						// }
						// return true
					}
					if valid {
						// addStep(newStep, newStep.moves+cost)
						addStep(newStep, cost)
					}
				}
				// }
			}
		}
		// for _, eq := range s.equipment[s.el] {

		// }
		return false
	})

	return "", ""
}

func makeMove(s step, eq uint64, from, to uint64) (cost int, res step, valid bool) {
	// eqs := (s.equipments & floorMask[from]) >> (row * from)
	// fmt.Printf("eqs: %10b, %10b\n", eqs, floorMask[from])
	fromPos, toPos := eq<<(row*from), eq<<(row*to)
	if s.equipments&fromPos != fromPos { // s.equipments&((e1|e2)<<(row*from)) == (e1 | e2) { // eqs&e1 > 0 && eqs&e2 > 0 { //} bits.OnesCount64(eqs&((e1|e2)<<(row*from))) == 2 || (e1 == e2 && bits.OnesCount64(eqs&((e1|e2)<<(row*from))) == 1) {
		return 1, s, false
	}

	newState := s.equipments &^ fromPos // Remove equipment from floor 'from'
	newState = newState | toPos         // Add equipment to floor 'to'
	// toEqs := s.equipments & floorMask[to]
	// newEq := s.equipments &^ ((e1 | e2) << (row * from)) // Remove from floor 'from'
	// newEq = newEq | ((e1 | e2) << (row * to))            // Add to floor 'to'

	if moves := usedMoves[newState|(to<<row*5)]; moves > 1 { //|| moves < s.moves {
		// if moves := usedMoves[newState|(to<<row*5)]; moves < s.moves {
		// fmt.Printf("OLD:\n%s\n", print2(newEq))
		return 2, s, false
	}
	// usedMoves[newState|(to<<row*5)] = s.moves + 1
	usedMoves[newState|(to<<row*5)]++ // = s.moves + 1

	// if from > to {
	// 	emptyBelow := true
	// 	for f := int(to); f >= 0; f-- {
	// 		// fmt.Println("trying", f)
	// 		emptyBelow = emptyBelow && s.equipments&floorMask[f] == 0
	// 	}
	// 	if emptyBelow {
	// 		// fmt.Printf("%d/%d - %40b\n", usedMoves[newState|(to<<row*5)], len(usedMoves), newState|(to<<row*5))
	// 		// fmt.Printf("Don't move from %d to %d \n%s\n", from, to, print2(newState))
	// 		return 5, s, false
	// 	}
	// }

	// Validate and calculate heuristics
	//TODO: Enough to check 'to' & 'from' floor..
	for floor, mask := range floorMask {
		floorEq := (newState & mask) >> uint64(row*floor)
		generators := floorEq & genMask
		chips := (floorEq >> amount)
		lonelyChip := chips &^ generators
		if floor == int(to) {
			// fmt.Printf("ev() floor %d, e: %14b g: %7b, c: %7b, lonely: %7b, invalid: %t\n", floor, floorEq, generators, chips, lonelyChip, lonelyChip > 0 && generators > 0)
		}
		if lonelyChip > 0 && generators > 0 {
			// fmt.Printf("Eq %b, Gen %b, Chi %b, Lon %b\n", equipment, generators, chips, lonelyChip)
			// fmt.Printf("invalid to move %b from %d to %d 1.\n%s\n\n", e1|e2, from, to, print2(s.equipments))
			return 3, s, false
		}

		cost += (len(floorMask) - floor - 1) * bits.OnesCount64(floorEq) //* 5
	}

	old := make([]uint64, len(s.oldSteps))
	// old = append(old, s.oldSteps...)
	copy(old, s.oldSteps)
	old = append(old, newState)

	//Safety check
	f1 := (newState & floorMask[0]) >> (row * 0)
	f2 := (newState & floorMask[1]) >> (row * 1)
	f3 := (newState & floorMask[2]) >> (row * 2)
	f4 := (newState & floorMask[3]) >> (row * 3)
	if (f1&f2) > 0 || (f1&f3) > 0 || (f1&f4) > 0 || (f2&f3) > 0 || (f2&f4) > 0 || (f3&f4) > 0 {
		fmt.Println("Found illegal move!!")
		return 4, s, false
	}

	newStep := step{
		oldSteps:   old,
		equipments: newState,
		elevator:   to,
		moves:      s.moves + 1,
	}
	mmvv++
	// if cost <= 9 {
	// 	fmt.Printf("%d>%d| (%d) move %b \n%s\n++++\n%s\n\n", from, to, mmvv, eq, print2(s.equipments), print2(newState))
	// }
	// fmt.Printf("Moving %b & %b (%d) from \n%s\nResult:\n%s\n", e1, e2, from-to, print(s), print(newStep))

	return cost, newStep, true
}

var mmvv = 0

func makeMoveOll(s step, e1, e2 uint64, from, to uint64) (cost int, res step, valid bool) {
	// eqs := (s.equipments & floorMask[from]) >> (row * from)
	// fmt.Printf("eqs: %10b, %10b\n", eqs, floorMask[from])
	if s.equipments&((e1|e2)<<(row*from)) == (e1 | e2) { // eqs&e1 > 0 && eqs&e2 > 0 { //} bits.OnesCount64(eqs&((e1|e2)<<(row*from))) == 2 || (e1 == e2 && bits.OnesCount64(eqs&((e1|e2)<<(row*from))) == 1) {
		return 1, s, false
	}
	// toEqs := s.equipments & floorMask[to]
	newEq := s.equipments &^ ((e1 | e2) << (row * from)) // Remove from floor 'from'
	newEq = newEq | ((e1 | e2) << (row * to))            // Add to floor 'to'

	if moves := usedMoves[newEq]; moves != 0 && moves < s.moves {
		// fmt.Printf("OLD:\n%s\n", print2(newEq))
		return 2, s, false
	}
	usedMoves[newEq] = s.moves + 1

	for floor, mask := range floorMask {
		equipment := (newEq & mask) >> uint64(row*floor)
		generators := equipment & genMask
		chips := (equipment >> amount)
		lonelyChip := chips &^ generators
		// fmt.Printf("ev() floor %d, g: %b, c: %b, lonely: %b, invalid: %t\n", floor, generators, chips, lonelyChip, lonelyChip > 0 && generators > 0)
		if lonelyChip > 0 && generators > 0 {
			// fmt.Printf("Eq %b, Gen %b, Chi %b, Lon %b\n", equipment, generators, chips, lonelyChip)
			// fmt.Printf("invalid to move %b from %d to %d 1.\n%s\n\n", e1|e2, from, to, print2(s.equipments))
			return 3, s, false
		}

		cost += (len(floorMask) - floor - 1) * bits.OnesCount64(equipment)
	}

	old := make([]uint64, len(s.oldSteps))
	// old = append(old, s.oldSteps...)
	copy(old, s.oldSteps)
	old = append(old, newEq)

	//Safety check
	f1 := (newEq & floorMask[0]) >> (row * 0)
	f2 := (newEq & floorMask[1]) >> (row * 1)
	f3 := (newEq & floorMask[2]) >> (row * 2)
	f4 := (newEq & floorMask[3]) >> (row * 3)
	if (f1&f2) > 0 || (f1&f3) > 0 || (f1&f4) > 0 || (f2&f3) > 0 || (f2&f4) > 0 || (f3&f4) > 0 {
		// fmt.Println("Found illegal move!!")
		return 4, s, false
	}

	newStep := step{
		oldSteps:   old,
		equipments: newEq,
		elevator:   to,
		moves:      s.moves + 1,
	}
	fmt.Printf("%d > %d| (%d) move %b \n%s\n++++\n%s\n\n", from, to, e1|e2, e1|e2, print2(s.equipments), print2(newEq))
	// fmt.Printf("Moving %b & %b (%d) from \n%s\nResult:\n%s\n", e1, e2, from-to, print(s), print(newStep))

	return cost, newStep, true
}

var usedMoves = map[uint64]int{}

func print(b step) string {
	// return fmt.Sprintf("%10b\n%10b\n%10b\n%10b", b.equipment[3], b.equipment[2], b.equipment[1], b.equipment[0])
	return print2(b.equipments)
}

func print2(eq uint64) string {
	// return fmt.Sprintf("%10b\n%10b\n%10b\n%10b", b.equipment[3], b.equipment[2], b.equipment[1], b.equipment[0])
	f4 := eq & floorMask[3] >> (3 * row)
	f3 := eq & floorMask[2] >> (2 * row)
	f2 := eq & floorMask[1] >> (1 * row)
	f1 := eq & floorMask[0]
	return fmt.Sprintf("%14b\n%14b\n%14b\n%14b", f4, f3, f2, f1)
}
