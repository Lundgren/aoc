# [1518-02-21 00:01] Guard #2129 begins shift
# [1518-04-26 00:26] falls asleep
# [1518-11-15 00:02] Guard #401 begins shift
# [1518-05-14 00:59] wakes up
# [1518-06-10 00:58] wakes up
# [1518-08-09 00:33] wakes up
# [1518-09-18 00:31] falls asleep
# [1518-05-25 00:03] Guard #3301 begins shift
# [1518-07-12 00:59] wakes up
# [1518-10-30 00:56] wakes up
# [1518-07-03 00:56] wakes up
# [1518-11-03 00:28] wakes up
# [1518-08-13 00:42] wakes up

# [1518-02-03 23:57] Guard #509 begins shift
# [1518-02-04 00:13] falls asleep
# [1518-02-04 00:14] wakes up
# [1518-02-04 00:24] falls asleep
# [1518-02-04 00:49] wakes up
# [1518-02-04 23:56] Guard #1553 begins shift
# [1518-02-05 00:28] falls asleep
# [1518-02-05 00:45] wakes up
# [1518-02-05 23:59] Guard #2129 begins shift
# [1518-02-06 00:12] falls asleep
# [1518-02-06 00:14] wakes up
# [1518-02-06 00:18] falls asleep
# [1518-02-06 00:43] wakes up
# [1518-02-07 00:01] Guard #2689 begins shift
# [1518-02-07 00:18] falls asleep
# [1518-02-07 00:19] wakes up
# [1518-02-07 00:29] falls asleep
# [1518-02-07 00:47] wakes up
# [1518-02-07 23:57] Guard #1481 begins shift
# [1518-02-08 00:14] falls asleep
# [1518-02-08 00:55] wakes up
# [1518-02-09 00:02] Guard #1913 begins shift
# [1518-02-09 00:31] falls asleep
# [1518-02-09 00:36] wakes up
# [1518-02-09 00:48] falls asleep

# m['guard id']: arr[120] -- times sleeping per minute between 2300 & 0059
p = log.split(' ')
date = p[0][1:]
time = p[1][:-1].replace(':', '')
action = p[2] #Guard, falls or wakes
guardId = p[3] # if action == Guard

if time.startswith("23"):
  time = int(time[2:])
else:
  time = int(time[2:]) + 60

