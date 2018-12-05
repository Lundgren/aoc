import os,sys
input = [line.strip() for line in open(
    os.path.join(sys.path[0], "day2.input"), 'r')]
test_input = ["abcdef", "bababc", "abbcde",
              "abcccd", "aabcdd", "abcdee", "ababab"]


def has_pairs_threes(box):
    m = {}
    for c in box:
        m[c] = m.get(c, 0) + 1

    pairs = 0
    threes = 0
    for _, v in m.items():
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


def calc_checksum(boxes):
    pairs = 0
    threes = 0
    for box in boxes:
        a = has_pairs_threes(box)
        pairs += a[0]
        threes += a[1]
    return pairs * threes


assert calc_checksum(test_input) == 12

print(f"Checksum of input is {calc_checksum(input)}")


def find_matching_in_close_pairs(boxes):
    s = set()
    for box in boxes:
        for i, _ in enumerate(box):
            alt = box[0:i] + "_" + box[i+1:]
            if alt in s:
                return alt.replace('_', '')
            else:
                s.add(alt)


test_input2 = ['abcde', 'fghij', 'klmno', 'pqrst', 'fguij', 'axcye', 'wvxyz']
assert find_matching_in_close_pairs(test_input2) == 'fgij'

print(f'Closest pair have the following common characters {find_matching_in_close_pairs(input)}')
