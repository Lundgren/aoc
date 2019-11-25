package day11

import (
	"aoc/aoc"
	"fmt"
	"math/bits"
)

var CorrectAnswers = []string{"", ""}

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
	thuChip
	pluChip
	strChip
	proChip
	rutChip
)
const (
	amount     = 5
	row        = amount * 2
	floorMask1 = (^uint64(0)) >> (64 - row*1)
	floorMask2 = (^uint64(0)) >> (64 - row*2)
	floorMask3 = (^uint64(0)) >> (64 - row*3)
	floorMask4 = (^uint64(0)) >> (64 - row*4)
	genMask    = thuGen | pluGen | strGen | proGen | rutGen
	chipMask   = thuChip | pluChip | strChip | proChip | rutChip
)

var floorMask = []uint64{
	((^uint64(0)) >> (64 - row)) << (row * 0),
	((^uint64(0)) >> (64 - row)) << (row * 1),
	((^uint64(0)) >> (64 - row)) << (row * 2),
	((^uint64(0)) >> (64 - row)) << (row * 3),
}

var initPos = [][]int{
	[]int{thuGen, thuChip, pluGen, strGen},
	[]int{pluChip, strChip},
	[]int{proGen, proChip, rutGen, rutChip},
	[]int{},
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

type step struct {
	equipment  []uint64
	equipments uint64
	elevator   int
	moves      int
}

func Solve(in aoc.Input) (interface{}, interface{}) {
	init := step{
		equipment:  initEquipment,
		equipments: initEquipments,
	}
	fmt.Println(print(init))
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
					cost, newStep, valid := makeMove(s, e1, e2, s.elevator, s.elevator-1)
					// fmt.Printf(">>> %10b, -1, %d, %t\n", (e1 | e2), cost, valid)
					// fmt.Println("Adding -1 ", cost, valid)
					if cost == 0 {
						fmt.Printf("Found path- %v \n%s\n", newStep, print(newStep))
						// return true
					}
					if valid {
						addStep(newStep, cost)
					}
				}
				if s.elevator < len(floorMask)-1 {
					cost, newStep, valid := makeMove(s, e1, e2, s.elevator, s.elevator+1)
					// fmt.Println("Adding +1 ", cost, valid)
					if cost == 0 {
						fmt.Printf("Found path+ %v \n%s\n", newStep, print(newStep))
						// return true
					}
					if valid {
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

	return "", "" // !29 && !30
}

func makeMove(s step, e1, e2 uint64, from, to int) (cost int, res step, valid bool) {
	eqs := s.equipments & floorMask[from]
	// fmt.Printf("eqs: %10b, %10b\n", eqs, floorMask[from])
	if eqs&((e1|e2)<<(row*from)) == 0 {
		return 1, s, false
	}
	// toEqs := s.equipments & floorMask[to]
	newEq := s.equipments &^ ((e1 | e2) << (row * from)) // Remove from floor 'from'
	newEq = newEq | ((e1 | e2) << (row * to))            // Add to floor 'to'

	if oldMove := usedMoves[newEq]; oldMove {
		// fmt.Printf("OLD:\n%s\n", print2(newEq))
		return 2, s, false
	}
	usedMoves[newEq] = true

	for floor, mask := range floorMask {
		equipment := (newEq & mask) >> (row * floor)
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

	newStep := step{
		equipments: newEq,
		elevator:   to,
		moves:      s.moves + 1,
	}
	// fmt.Printf("move %b from %d to %d 1.\n%s\n2.\n%s\n%t\n\n", e1|e2, from, to, print2(s.equipments), print2(newEq), valid)
	// fmt.Printf("Moving %b & %b (%d) from \n%s\nResult:\n%s\n", e1, e2, from-to, print(s), print(newStep))

	return cost, newStep, true
}

var usedMoves = map[uint64]bool{}

func makeMoveOld(from step, e1, e2 uint64, elevatorDelta int) (cost int, s step, valid bool) {
	newEq := copy(from.equipment)
	newEq[from.elevator] = (from.equipment[from.elevator] &^ e1) &^ e2
	newEq[from.elevator+elevatorDelta] = from.equipment[from.elevator+elevatorDelta] | e1 | e2
	newStep := step{
		equipment: newEq,
		elevator:  from.elevator + elevatorDelta,
		moves:     from.moves + 1,
	}
	// fmt.Printf("Moving %b & %b (%d) from \n%s\nResult:\n%s\n", e1, e2, elevatorDelta, print(from), print(newStep))
	cost, valid = evaluate(newStep)
	return cost, newStep, valid
}

func copy(b []uint64) []uint64 {
	r := make([]uint64, len(b))
	for i, eq := range b {
		r[i] = eq
	}
	return r
}

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
	return fmt.Sprintf("%10b\n%10b\n%10b\n%10b", f4, f3, f2, f1)
}

func evaluate(s step) (cost int, valid bool) {
	// if s.elevator < 0 || s.elevator >= len(s.equipment) {
	// 	return 0, false
	// }
	for floor, equipment := range s.equipment {
		generators := equipment & genMask
		chips := (equipment >> amount)
		lonelyChip := chips &^ generators
		// fmt.Printf("ev() floor %d, g: %b, c: %b, lonely: %b, invalid: %t\n", floor, generators, chips, lonelyChip, lonelyChip > 0 && generators > 0)
		if lonelyChip > 0 && generators > 0 {
			return 0, false
		}

		cost += (len(s.equipment) - floor) * bits.OnesCount64(equipment)
	}

	return cost, true
}
