import os, sys
input = [int(line.strip())
         for line in open(os.path.join(sys.path[0], "day1.input"), 'r')]


def freq_changes(freqs):
    res = 0
    for change in freqs:
        res += change

    return res


assert freq_changes([+1 - 2 + 3 + 1]) == 3
assert freq_changes([+1, +1, +1]) == 3
assert freq_changes([+1, +1, -2]) == 0
assert freq_changes([-1, -2, -3]) == -6

print(f"Result1 is: {freq_changes(input)}")


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
assert freq_changes2([-6, +3, +8, +5, -6]) == 5
assert freq_changes2([+7, +7, -2, -7, -4]) == 14

print(f"Result2 is: {freq_changes2(input)}")
