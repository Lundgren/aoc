import os,sys
input = [line.strip() for line in open(
    os.path.join(sys.path[0], "day3.input"), 'r')]

test_input = ['#1 @ 1,3: 4x4', '#2 @ 3,1: 4x4', '#3 @ 5,5: 2x2']


def make_map(size):
    map = []
    for _ in range(0, size):
        map.append([0]*size)
    return map


def print_map(map):
    for row in map:
        print(*row, sep='')


def add_to_map(map, left, top, width, height):
    right = left + width
    bottom = top + height
    for r in range(top, bottom):
        for c in range(left, right):
            map[r][c] += 1


def parse_to_map(input, size):
    map = make_map(size)

    for e in input:
        p = e.split(' ')
        left, top = p[2][:-1].split(',')
        width, height = p[3].split('x')

        add_to_map(map, int(left), int(top), int(width), int(height))

    return map


def calc_overlaps(input, size):
    map = parse_to_map(input, size)

    overlaps = 0
    for row in map:
        for e in row:
            if e > 1:
                overlaps += 1

    return overlaps


assert calc_overlaps(test_input, 10) == 4
print(f"Square inch overlaps: {calc_overlaps(input, 1000)}")


def only_ones_in_map(map, left, top, width, height):
    right = left + width
    bottom = top + height
    for r in range(top, bottom):
        for c in range(left, right):
            if map[r][c] > 1:
                return False

    return True


def find_intact_claim(input, size):
    map = parse_to_map(input, size)

    for e in input:
        p = e.split(' ')
        left, top = p[2][:-1].split(',')
        width, height = p[3].split('x')

        if only_ones_in_map(map, int(left), int(top), int(width), int(height)):
            return p[0][1:]


assert find_intact_claim(test_input, 10) == '3'
print(f"Intact claim: #{find_intact_claim(input, 1000)}")
