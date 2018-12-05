# input = [line.strip() for line in open("day2.input", 'r')]
test_input = ["abcdef", "bababc", "abbcde", "abcccd", "aabcdd", "abcdee", "ababab"]

def has_pairs_threes(box):
  m = {}
  for c in box:
    m[c] = m.get(c, 0) + 1
  
  pairs = 0
  threes = 0
  for k, v in m.items():
    if v == 2:
      pairs = 1
    elif v == 3:
      threes = 1

  return (pairs, threes)

assert has_pairs_threes("abcdef") == (0, 0)
assert has_pairs_threes("bababc") == (1, 1)
assert has_pairs_threes("abbcde") == (1, 0)
assert has_pairs_threes("abcccd") == (0, 1)
assert has_pairs_threes("aabcdd") == (1, 0)
assert has_pairs_threes("abcdee") == (1, 0)
assert has_pairs_threes("ababab") == (0, 1)

def calc_hash(boxes):
  pairs = 0
  threes = 0
  for box in boxes:
    a = has_pairs_threes(box)
    pairs += a[0]
    threes += a[1]
  return pairs * threes

assert calc_hash(test_input) == 12
print("Hash of input is " + str(calc_hash(test_input)))