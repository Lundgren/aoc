package day12

import (
	"aoc/aoc"
	"encoding/json"
	"fmt"
)

var CorrectAnswers = []string{"156366", ""}

var Examples = []aoc.Example{
	{Input: `[1,2,3]`, Expected1: "6"},
	{Input: `{"a":2,"b":4}`, Expected1: "6"},
	{Input: `[[[3]]]`, Expected1: "3"},
	{Input: `{"a":{"b":4},"c":-1}`, Expected1: "3"},
	{Input: `{"a":[-1,1]}`, Expected1: "0"},
	{Input: `[-1,{"a":1}]`, Expected1: "0"},
	{Input: `[1,2,3]`, Expected2: "6"},
	{Input: `[1,{"c":"red","b":2},3]`, Expected2: "4"},
	{Input: `{"d":"red","e":[1,2,3,4],"f":5}`, Expected2: "0"},
	{Input: `[1,"red",5]`, Expected2: "6"},
}

func Solve(in aoc.Input) (interface{}, interface{}) {
	var result interface{}
	err := json.Unmarshal([]byte(in.String()), &result)
	aoc.Check(err)

	part1 := sumJson(result, false)
	part2 := sumJson(result, true)

	return part1, part2
}

func sumJson(v interface{}, ignoreRed bool) int {
	switch i := v.(type) {
	case float64:
		return int(i)
	case map[string]interface{}:
		return sumMap(i, ignoreRed)
	case []interface{}:
		return sumArr(i, ignoreRed)
	case string:
		return 0
	}

	panic(fmt.Sprintf("Couln't handle typ %T (%v)", v, v))
}

func sumMap(m map[string]interface{}, ignoreRed bool) int {
	sum := 0

	if ignoreRed {
		for _, v := range m {
			if v == "red" {
				return 0
			}
		}
	}

	for _, v := range m {
		sum += sumJson(v, ignoreRed)
	}

	return sum
}

func sumArr(arr []interface{}, ignoreRed bool) int {
	sum := 0

	for _, i := range arr {
		sum += sumJson(i, ignoreRed)
	}

	return sum
}
