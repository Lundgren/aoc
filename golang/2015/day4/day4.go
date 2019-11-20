package day4

import (
	"aoc/aoc"
	"crypto/md5"
	"encoding/hex"
	"io"
	"strconv"
	"strings"
)

var Examples = []aoc.Example{
	{Input: "abcdef", Expected1: "609043", Expected2: ""},
	{Input: "pqrstuv", Expected1: "1048970", Expected2: ""},
}

func Solve(in aoc.Input) (interface{}, interface{}) {
	s := in.String()
	i1 := 0
	for {
		i1++
		if strings.HasPrefix(hash(s, i1), "00000") {
			break
		}
	}

	i2 := 0
	for {
		i2++
		if strings.HasPrefix(hash(s, i2), "000000") {
			break
		}
	}

	return i1, i2
}

func hash(in string, n int) string {
	h := md5.New()
	_, err := io.WriteString(h, in+strconv.Itoa(n))
	aoc.Check(err)
	return hex.EncodeToString(h.Sum(nil))
}
