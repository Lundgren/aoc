package aoc

import (
	"crypto/md5"
	"encoding/hex"
)

var hasher = md5.New()
var a = [64]byte{}

// Fast way to calculate hash for a string + a number multiple times
func FastMd5(salt string, n, times int) string {
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
	for j := len(salt) - 1; j >= 0; j-- {
		i--
		a[i] = salt[j]
	}

	sum := a[i:]
	for i := 0; i < times; i++ {
		hasher.Reset()
		_, _ = hasher.Write(sum)
		sum = hasher.Sum(nil)
	}

	return hex.EncodeToString(sum)
}
