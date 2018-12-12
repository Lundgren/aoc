test_init_state = "#..#.#..##......###...###"
init_state = "#....##.#.#.####..#.######..##.#.########..#...##...##...##.#.#...######.###....#...##..#.#....##.##"

test_input = """...## => #
..#.. => #
.#... => #
.#.#. => #
.#.## => #
.##.. => #
.#### => #
#.#.# => #
#.### => #
##.#. => #
##.## => #
###.. => #
###.# => #
####. => #"""

input = """.#.## => #
.#.#. => #
..#.# => #
##.#. => #
##... => #
..### => #
.##.. => #
..#.. => #
.##.# => #
####. => #
#...# => #
###.# => #
...#. => #
.#..# => #
#.##. => #"""

def map_input(input):
  lines = input.splitlines()
  res = set()

  for line in lines:
    p = line.split(' => ')
    res.add(p[0])

  return res

def evolve(state, rules, generations):
  state = "." * generations + state + "." * generations

  for g in range(0, generations):
    next_state = "." * len(state)
    for i in range(2, len(state) - 2):
      if state[i-3:i+2] in rules:
        next_state = next_state[:i-1] + "#" + next_state[i:]
    
    state = next_state
  
  sum = 0
  for i in range(0, len(state)):
    if state[i] == "#":
      sum += i - generations

  return sum


assert evolve(test_init_state, map_input(test_input), 20) == 325

score1 = evolve(init_state, map_input(input), 300)
print(f"Result 1 is {score1}")

# Printing the first few hundreds tells us that the score increases by 15 / generation after generation 90
score2 = evolve(init_state, map_input(input), 90) + (50000000000 - 90) * 15
print(f"Result 2 is {score2}")