import md5
from itertools import groupby

def three_five(hv):
    grouped_L = [(k, sum(1 for i in g)) for k,g in groupby(hv)]
    return (x for x in grouped_L if x[1] >= 3)

debug = False
def otp(salt, v=1):
    global debug
    i=0
    keycnt = 0
    keys = []
    to_search = []
    highest_key = 0

    while keycnt < 64 or len(to_search) > 0:

        hv = md5.md5("%s%s" % (salt, i)).hexdigest()
        if v== 2:
            for k in range(2016):
                hv = md5.md5(hv).hexdigest()
        parts = three_five(hv)
        search3 = keycnt < 64
        for p in parts:
            if p[1] >= 3 and search3:
                to_search.append((p[0], i, i+1000))
                search3 = False
                if debug:
                    print("Triple at %s: %s" % (i, p))
            if p[1] >= 5:
                if debug:
                    print("5* at %s: %s" % (i, p))
                for s in to_search:
                    if s[0] == p[0] and i > s[1] and i <= s[2]:
                        if s[1] not in keys:
                            if debug:
                                print("%s is a key: corresponding 5* at %s %s" % (s[1], i, s))
                            keys.append(s[1])

                            keycnt += 1
        if debug:    
            print("%r %r %r" % (keycnt, i, len(to_search)))
        to_search = [x for x in to_search if x[2] > i]
        i+=1

    keys.sort()
    print("found %r keys in %r iterations" % (len(keys), i))
    return keys[:64]

test = False
if test == True:
    keys = otp("abc")
    print("%s %r" % (len(keys), keys))
else:
    keys = otp("qzyelonm")
    print("%s %r" % (len(keys), keys))
    keys = otp("qzyelonm", 2)
    print("%s %r" % (len(keys), keys))