package day22

import (
	"aoc/aoc"
)

var CorrectAnswers = []string{"1824", "1937"}

var Examples = []aoc.Example{}

const (
	magicMissile = iota
	drain
	shield
	poison
	recharge
)

func Solve(in aoc.Input) (interface{}, interface{}) {
	part1, part2 := 0, 0
	aoc.Optimize(15, 5, func(spells []int) int {
		if part1 == 0 {
			mana1, won1 := doBattle(spells, false)
			if won1 {
				part1 = mana1
			}
		}
		if part2 == 0 {
			mana2, won2 := doBattle(spells, true)
			if won2 {
				part2 = mana2
			}
		}

		if part1 > 0 && part2 > 0 {
			return aoc.BREAK
		}
		return 0
	})

	return part1, part2
}

func doBattle(spells []int, hard bool) (int, bool) {
	spentMana, mana, hp := 0, 500, 50
	bossHp, bossDmg := 71, 10
	effects := make([]int, 5) // Round left

	for i := 0; i < len(spells); i++ {
		if hard {
			hp--
			if hp <= 0 {
				return spentMana, false
			}
		}
		//Player turn
		bossHurt, _, manaRestored, updEff := calcEffects(effects)
		bossHp -= bossHurt
		mana += manaRestored
		effects = updEff

		switch spells[i] {
		case magicMissile:
			spentMana += 53
			bossHp -= 4
		case drain:
			spentMana += 73
			bossHp -= 2
			hp += 2
		case shield:
			spentMana += 113
			if effects[shield] > 0 {
				return spentMana, false
			}
			effects[shield] = 6
		case poison:
			spentMana += 173
			if effects[poison] > 0 {
				return spentMana, false
			}
			effects[poison] = 6
		case recharge:
			spentMana += 229
			if effects[recharge] > 0 {
				return spentMana, false
			}
			effects[recharge] = 5
		default:
			panic("")
		}

		if spentMana > mana {
			return spentMana, false
		} else if bossHp <= 0 {
			return spentMana, true
		}

		//Boss turn
		bossHurt, armor, manaRestored, updEff := calcEffects(effects)
		bossHp -= bossHurt
		mana += manaRestored
		effects = updEff
		if bossHp <= 0 {
			return spentMana, true
		}

		dmg := bossDmg - armor
		if dmg <= 0 {
			dmg = 1
		}
		hp -= dmg
		if hp <= 0 {
			return spentMana, false
		}
	}

	return spentMana, false
}

func calcEffects(effects []int) (bossHurt, armor, mana int, ef []int) {
	if effects[shield] > 0 {
		effects[shield]--
		armor = 7
	}
	if effects[poison] > 0 {
		effects[poison]--
		bossHurt = 3
	}
	if effects[recharge] > 0 {
		effects[recharge]--
		mana = 101
	}
	return bossHurt, armor, mana, effects
}
