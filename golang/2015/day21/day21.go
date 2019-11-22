package day21

import (
	"aoc/aoc"
)

var CorrectAnswers = []string{"121", "201"}

var Examples = []aoc.Example{}

var (
	weapons = [][]int{
		[]int{8, 4, 0},
		[]int{10, 5, 0},
		[]int{25, 6, 0},
		[]int{40, 7, 0},
		[]int{74, 8, 0},
	}
	armors = [][]int{
		[]int{0, 0, 0},
		[]int{13, 0, 1},
		[]int{31, 0, 2},
		[]int{53, 0, 3},
		[]int{75, 0, 4},
		[]int{102, 0, 5},
	}
	rings = [][]int{
		[]int{0, 0, 0},
		[]int{0, 0, 0},
		[]int{25, 1, 0},
		[]int{50, 2, 0},
		[]int{100, 3, 0},
		[]int{20, 0, 1},
		[]int{40, 0, 2},
		[]int{80, 0, 3},
	}
)

func Solve(in aoc.Input) (interface{}, interface{}) {
	part1 := aoc.Optimize(4, len(rings), func(n []int) int {
		if n[0] < len(weapons) && n[1] < len(armors) && n[2] != n[3] {
			cost := weapons[n[0]][0] + armors[n[1]][0] + rings[n[2]][0] + rings[n[3]][0]
			dmg := weapons[n[0]][1] + armors[n[1]][1] + rings[n[2]][1] + rings[n[3]][1]
			armor := weapons[n[0]][2] + armors[n[1]][2] + rings[n[2]][2] + rings[n[3]][2]

			if beatBoss(100, dmg, armor) {
				return cost
			}
		}

		return 99999
	})

	part2 := aoc.Optimize(4, len(rings), func(n []int) int {
		if n[0] < len(weapons) && n[1] < len(armors) && n[2] != n[3] {
			cost := weapons[n[0]][0] + armors[n[1]][0] + rings[n[2]][0] + rings[n[3]][0]
			dmg := weapons[n[0]][1] + armors[n[1]][1] + rings[n[2]][1] + rings[n[3]][1]
			armor := weapons[n[0]][2] + armors[n[1]][2] + rings[n[2]][2] + rings[n[3]][2]

			if !beatBoss(100, dmg, armor) {
				return cost
			}
		}

		return 0
	})

	return part1.Min, part2.Max
}

func beatBoss(hp, dmg, armor int) bool {
	bossHp := 103
	bossDmg := 9
	bossArmor := 2

	if dmg <= bossArmor {
		return false
	}

	for bossHp > 0 && hp > 0 {
		bossHp -= dmg - bossArmor
		if bossHp <= 0 {
			break
		}
		hp -= bossDmg - armor
	}

	return hp > 0
}
