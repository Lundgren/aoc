import os, sys, collections
input = [line.strip() for line in open(
    os.path.join(sys.path[0], "day4.input"), 'r')]
input.sort()

test_input = """[1518-11-01 00:00] Guard #10 begins shift
[1518-11-01 00:05] falls asleep
[1518-11-01 00:25] wakes up
[1518-11-01 00:30] falls asleep
[1518-11-01 00:55] wakes up
[1518-11-01 23:58] Guard #99 begins shift
[1518-11-02 00:40] falls asleep
[1518-11-02 00:50] wakes up
[1518-11-03 00:05] Guard #10 begins shift
[1518-11-03 00:24] falls asleep
[1518-11-03 00:29] wakes up
[1518-11-04 00:02] Guard #99 begins shift
[1518-11-04 00:36] falls asleep
[1518-11-04 00:46] wakes up
[1518-11-05 00:03] Guard #99 begins shift
[1518-11-05 00:45] falls asleep
[1518-11-05 00:55] wakes up""".splitlines()

Event = collections.namedtuple('Event', ['guard', 'sleeping', 'minutes'])
Status = collections.namedtuple('Status', ['sleeping', 'minutes'])
Max = collections.namedtuple('Max', ['slept_minutes', 'guard', 'minute'])
default_list = [0]*60


def convert_logs(logs):
    events = []
    active_guard = ''
    for log in logs:
        p = log.split(' ')
        time = p[1][:-1]
        minutes = int(time[3:])
        action = p[2]
        sleeping = False

        if action == 'Guard':
            active_guard = int(p[3][1:])
        elif action == 'falls':
            sleeping = True

        events.append(Event(active_guard, sleeping, minutes))

    return events


def parse_logs(logs):
    events = convert_logs(logs)
    res = {}

    status = Status(False, 0)
    for e in events:
        if status.sleeping:
            time_list = res.get(e.guard, [0]*60)
            for i in range(status.minutes-1, e.minutes - 1):
                time_list[i+1] += 1
            res[e.guard] = time_list

        status = Status(e.sleeping, e.minutes)

    return res


def find_sleepiest_guard(schedules):
    max = Max(0, 0, 0)
    for guard, schedule in schedules.items():
        total_slept = sum(schedule)
        if total_slept > max.slept_minutes:
            max = Max(total_slept, guard, 0)

    return max.guard


def find_sleepiest_time(input):
    schedules = parse_logs(input)
    sleepiest_guard = find_sleepiest_guard(schedules)

    schedule = schedules[sleepiest_guard]
    max = Max(0, 0, 0)
    for i, slept_minutes in enumerate(schedule):
        if slept_minutes > max.slept_minutes:
            max = Max(slept_minutes, sleepiest_guard, i)

    return sleepiest_guard * max.minute


def find_sleepiest_time2(input):
    schedules = parse_logs(input)

    max = Max(0, 0, 0)
    for guard, schedule in schedules.items():
        for i, slept_minutes in enumerate(schedule):
            if slept_minutes > max.slept_minutes:
                max = Max(slept_minutes, guard, i)

    return max.guard * max.minute


assert find_sleepiest_time(test_input) == 240
print(f'Sleepiest guard * minute: {find_sleepiest_time(input)}')

assert find_sleepiest_time2(test_input) == 4455
print(f'Sleepiest minute * guard: {find_sleepiest_time2(input)}')
