package day18

import (
	"aoc/aoc"
	"fmt"
	"strings"
)

var CorrectAnswers = []string{"", ""}

var Examples = []aoc.Example{
	{Input: `#########
#b.A.@.a#
#########`, Expected1: "8", Expected2: ""},
	{Input: `########################
#f.D.E.e.C.b.A.@.a.B.c.#
######################.#
#d.....................#
########################`, Expected1: "86", Expected2: ""},
	{Input: `########################
#...............b.C.D.f#
#.######################
#.....@.a.B.c.d.A.e.F.g#
########################`, Expected1: "132", Expected2: ""},
	{Input: `#################
#i.G..c...e..H.p#
########.########
#j.A..b...f..D.o#
########@########
#k.E..a...g..B.n#
########.########
#l.F..d...h..C.m#
#################`, Expected1: "136", Expected2: ""},
	{Input: `########################
#@..............ac.GI.b#
###d#e#f################
###A#B#C################
###g#h#i################
########################`, Expected1: "81", Expected2: ""},
}

type state struct {
	vault string
	width int
	pos   int
	steps int
	keys  keys
}

type keys struct {
	found  string
	needed int
}

func Solve(in aoc.Input) (interface{}, interface{}) {
	// vault := in.Lines()
	start := state{
		vault: strings.ReplaceAll(in.String(), "@", "."),
		width: strings.Index(in.String(), "\n") + 1,
		pos:   strings.Index(in.String(), "@"),
		keys:  keys{},
	}

	for _, c := range start.vault {
		if c >= 'a' && c <= 'z' {
			start.keys.needed++
		}
	}
	fmt.Println(start)

	// for y, l := range vault {
	// 	for x, c := range l {
	// 		if c == '@' {
	// 			start = state{x: x, y: y, keys: ""}
	// 		}
	// 	}
	// }

	// fmt.Println(start.vault)
	// for i, c := range start.vault {
	// 	x, y := i%(start.width), i/start.width
	// 	pos := y*start.width + x
	// 	fmt.Printf("%s|%d: %d,%d = %d\n", string(c), i, x, y, pos)
	// }
	// return 0, 0

	visited := map[string]bool{}

	// var part1 state
	part1 := 0
	n := 0
	aoc.AStar(start, func(step interface{}, addstepFn aoc.AddStep) bool {
		st := step.(state)
		if allCollected(st) {
			part1 = st.steps
			fmt.Println("Done at step", st.steps, st)
			return true
		}
		n++
		if n == 5000000 {
			return true
		}

		aoc.Bfs(nil, func(step interface{}, bfsAdder func(interface{})) bool {

			return false
		})

		addIfValid(-1, 0, st, visited, addstepFn) //left
		addIfValid(1, 0, st, visited, addstepFn)  //right
		addIfValid(0, -1, st, visited, addstepFn) //up
		addIfValid(0, 1, st, visited, addstepFn)  //down
		return false
	})

	// part1 := st.(state)

	return part1, ""
}

func (s *state) get(dX, dY int) (byte, bool) {
	x, y := s.pos%s.width+dX, s.pos/s.width+dY
	if x >= 0 && x < s.width &&
		y >= 0 && y < len(s.vault)/s.width {
		tile := s.vault[y*s.width+x]
		if tile >= 'A' && tile <= 'Z' {
			return tile, s.keys.canOpen(tile)
		}

		return tile, tile != '#'
	}
	return '#', false
}

func (s *state) isValid(dX, dY int) bool {
	x, y := s.pos%s.width+dX, s.pos/s.width+dY
	if x >= 0 && x < s.width &&
		y >= 0 && y < len(s.vault)/s.width {
		tile := s.vault[y*s.width+x]
		if tile >= 'A' && tile <= 'Z' {
			return s.keys.canOpen(tile)
		}

		return tile != '#'
	}
	return false
}

func (s *state) isKey(dX, dY int) bool {
	x, y := s.pos%s.width+dX, s.pos/s.width+dY
	if x >= 0 && x < s.width &&
		y >= 0 && y < len(s.vault)/s.width {
		tile := s.vault[y*s.width+x]
		if tile >= 'a' && tile <= 'z' {
			return s.keys.canOpen(tile)
		}

		return tile != '#'
	}
	return false
}

func addIfValid(dX, dY int, st state, visited map[string]bool, addstepFn aoc.AddStep) {
	x, y := st.pos%st.width+dX, st.pos/st.width+dY
	if x >= 0 && x < st.width &&
		y >= 0 && y < len(st.vault)/st.width {
		st.steps++
		st.pos = y*st.width + x
		tile := st.vault[st.pos]
		if tile >= 'A' && tile <= 'Z' {
			if !st.keys.canOpen(tile) {
				return
				// st.vault = strings.ReplaceAll(st.vault, string(tile), ".")
				// st.keys += string(tile)
			} else {
				// return
			}
		} else if tile >= 'a' && tile <= 'z' {
			// st.vault = strings.ReplaceAll(st.vault, string(tile), ".")
			st.keys.add(tile)
			// st.keys += strings.ToUpper(string(tile))
		}

		// fmt.Printf("[%d,%d=%d] = %s/%s %s - ", x, y, st.pos, string(tile), string(st.vault[st.pos]), st.keys.String())
		if ok := visited[key(st)]; !ok && st.vault[st.pos] != '#' {
			// v := st.vault
			// for _, k := range st.keys.found {
			// 	v = strings.ReplaceAll(v, string(k), ".")
			// 	// v = strings.ReplaceAll(v, strings.ToUpper(string(k)), ".")
			// }
			// b := []rune(v)
			// b[st.pos] = '@'
			// fmt.Printf("Added as step - %d, \n%s", cost(st), string(b))
			visited[key(st)] = true
			addstepFn(st, cost(st))
		}
	}
	// fmt.Println()
}

func allCollected(st state) bool {
	return st.keys.remaining() == 0
	// return len(st.keys) == st.needed
	// for _, c := range st.vault {
	// 	if c != '#' && c != '.' && c != '\n' {
	// 		return false
	// 	}
	// }
	// return true
}

func cost(st state) int {
	return st.steps + st.keys.remaining()
	// return st.steps + len(st.vault) - strings.Count(st.vault, ".") - strings.Count(st.vault, "#")
	// return len(st.vault) - strings.Count(st.vault, ".") - strings.Count(st.vault, "#")
}

func key(st state) string {
	var sb strings.Builder
	sb.WriteByte(byte(st.pos % 255))
	sb.WriteByte(byte(st.pos / 255))
	sb.WriteString(st.keys.found)
	// sb.WriteString(st.vault)
	return sb.String()
	// return fmt.Sprintf("%d-%s-%s", st.pos, st.keys.String(), st.vault)
}

func (k *keys) canOpen(door byte) bool {
	return strings.Contains(k.found, strings.ToLower(string(door)))
}

func (k *keys) add(key byte) {
	ky := string(key)
	if !strings.Contains(k.found, ky) {
		k.found += ky
	}
}

func (k *keys) remaining() int {
	return k.needed - len(k.found)
}
func (k *keys) String() string {
	return fmt.Sprintf("[%s (%d)]", k.found, k.remaining())
}
