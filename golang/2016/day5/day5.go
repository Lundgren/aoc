package day5

import (
	"aoc/aoc"
	"crypto/md5"
	"encoding/hex"
	"strings"
)

var CorrectAnswers = []string{"2414bc77", "437e60fc"}

var Examples = []aoc.Example{
	{Input: "abc", Expected1: "18f47a30", Expected2: "05ace8e3"},
}

func Solve(in aoc.Input) (interface{}, interface{}) {

	part1 := ""
	part2 := []byte("xxxxxxxx")
	found := 0
	hash(in.String(), func(hash string) bool {
		if len(part1) < 8 {
			part1 += string(hash[5])
		}

		if found < 8 {
			if hash[5] >= '0' && hash[5] <= '7' {
				pos := aoc.ParseInt(string(hash[5]))
				if part2[pos] == 'x' {
					found++
					part2[pos] = hash[6]
				}
			}
		}

		return len(part1) == 8 && found == 8
	})

	return part1, part2
}

var hasher = md5.New()
var a [64]byte

// Stupid, but faster and quite fun
func hash(in string, fn func(hash string) bool) {
	n := 0
	for {
		n++

		// Add int to end of byte array
		i := 64
		r := n
		for r >= 10 {
			i--
			a[i] = byte('0' + r%10)
			r /= 10
		}
		i--
		a[i] = byte('0' + r)

		// Add the string before the int
		for j := len(in) - 1; j >= 0; j-- {
			i--
			a[i] = in[j]
		}

		hasher.Reset()
		_, _ = hasher.Write(a[i:])
		sum := hasher.Sum(nil)
		if sum[0] == 0 && sum[1] == 0 {
			hash := hex.EncodeToString(sum)
			if strings.HasPrefix(hash, "00000") {
				completed := fn(hash)
				if completed {
					return
				}
			}
		}
	}
}
