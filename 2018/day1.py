def freq_changes(freqs):
  res = 0
  for change in freqs:
    res += change

  return res

assert freq_changes([+1 -2 +3 +1]) == 3

def freq_changes2(freqs):
  visited = set()
  curr = 0
  while True:
    for change in freqs:
      curr += change
      if curr in visited:
        return curr
      visited.add(curr)

assert freq_changes2([+3, +3, +4, -2, -4]) == 10