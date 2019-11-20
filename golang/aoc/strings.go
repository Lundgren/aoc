package aoc

func CountUniquePairs(in string) int {
	sc := NewScanner(in)
	pairs := NewSet()
	for sc.Next() {
		equals := sc.Equals()
		if equals > 1 {
			pairs.Add(string(sc.Get()))
			sc.Jump(equals - 1)
		}
	}

	return pairs.Len()
}

func CountLongestStraight(in string) int {
	sc := NewScanner(in)
	length := 1
	for sc.Next() {
		for i := 1; i < len(in); i++ {
			if sc.Get()+byte(i) == sc.Peekn(i) {
				length = Max(length, i+1)
			} else {
				break
			}
		}
	}

	return length
}
