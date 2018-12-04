from functools import reduce

def has_pairs_threes(word):
  for 
  return reduce(lambda m, l: m.get(l, 0) + 1, word, {})

print(str(has_pairs_threes("abccd")))
