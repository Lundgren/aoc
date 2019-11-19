package main

import "fmt"

func main() {
	fmt.Printf("Part1: %d\n", part1(260321))
	fmt.Printf("Part2: %d\n", part2(260321)-6) //6 == len(260321)
}

func part1(tries int) int {
	recepies := []int{3, 7}
	elf1 := 0
	elf2 := 1

	for len(recepies) <= tries+10 {
		sum := recepies[elf1] + recepies[elf2]
		if sum >= 10 {
			recepies = append(recepies, sum/10)
		}
		recepies = append(recepies, sum%10)

		elf1 = (elf1 + 1 + recepies[elf1]) % len(recepies)
		elf2 = (elf2 + 1 + recepies[elf2]) % len(recepies)
	}

	sum := 0
	for i := 0; i < 10; i++ {
		sum = sum*10 + recepies[tries+i]
	}

	return sum
}

func part2(find int) int {
	recepies := []int{3, 7}
	elf1 := 0
	elf2 := 1

	for true {
		sum := recepies[elf1] + recepies[elf2]
		if sum >= 10 {
			recepies = append(recepies, sum/10)
		}
		recepies = append(recepies, sum%10)

		elf1 = (elf1 + 1 + recepies[elf1]) % len(recepies)
		elf2 = (elf2 + 1 + recepies[elf2]) % len(recepies)

		if contains(find, recepies, 0) {
			return len(recepies)
		} else if contains(find, recepies, 1) {
			return len(recepies) - 1
		}
	}

	return -1
}

func contains(find int, recepies []int, offset int) bool {
	i := 1 + offset
	for find > 0 && i < len(recepies) {
		if find%10 != recepies[len(recepies)-i] {
			return false
		}
		find = find / 10
		i++
	}
	return true
}
