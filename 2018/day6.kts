val input = """108, 324
46, 91
356, 216
209, 169
170, 331
332, 215
217, 104
75, 153
110, 207
185, 102
61, 273
233, 301
278, 151
333, 349
236, 249
93, 155
186, 321
203, 138
103, 292
47, 178
178, 212
253, 174
348, 272
83, 65
264, 227
239, 52
243, 61
290, 325
135, 96
165, 339
236, 132
84, 185
94, 248
164, 82
325, 202
345, 323
45, 42
292, 214
349, 148
80, 180
314, 335
210, 264
302, 108
235, 273
253, 170
150, 303
249, 279
255, 159
273, 356
275, 244""".lines()

val testInput = """1, 1
1, 6
8, 3
3, 4
5, 5
8, 9""".lines()


data class Point(val x: Int, val y: Int)

fun Point.max() = Math.max(this.x, this.y)
fun Point.dist(x: Int, y: Int) = Math.abs(this.x - x) + Math.abs(this.y - y)


fun makePoints(l: List<String>): List<Point> {
    return l.map { s -> println(s); Point(s.split(", ")[0].toInt(), s.split(", ")[1].toInt()) }
}

fun dist(p1: Point, p2: Point): Int {
    return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y)
}


fun calcClosest(points: List<Point>, size: Int): Map<Point, Int> {
    val res = mutableMapOf<Point, Int>()
    for (x in -size..size) {
        for (y in -size..size) {
            val dists = points.map { it to it.dist(x, y) }.toMap()
            val sorted = dists.toList().sortedBy { (_, value) -> value }

            if (sorted[0].second < sorted[1].second) {
                val p = sorted[0].first
                res[p] = res.getOrDefault(p, 0) + 1
            }
        }
    }

    return res
}

fun part1(input: List<String>): Int {
    val points = makePoints(input)
    val max = points.fold(0) { max, p -> Math.max(max, p.max()) } * 2

    val maxInFirst = calcClosest(points, max)
    val maxInSecond = calcClosest(points, max + 30)

    // If they grow beyond the first they are unlimited
    val sorted = maxInSecond.toList().sortedBy { (_, value) -> -value }

     println(maxInFirst)
     println(sorted)
    for (e in sorted) {
        if (e.second == maxInFirst[e.first]) {
            return e.second
        }
    }

    return -1
}

fun part2(input: List<String>): Int {
    val points = makePoints(input)
    val max = points.fold(0) { max, p -> Math.max(max, p.max()) } * 2

    var region = 0
    for (x in -max..max) {
        for (y in -max..max) {
            val dist = points.fold(0) { sum, p -> sum + p.dist(x, y) }

            if (dist < 10000) {
                region++
            }
        }
    }

    return region
}


println("Part1: ${part1(input)}")
println("Part1: ${part2(input)}")
