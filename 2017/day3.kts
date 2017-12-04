val input = 312051

data class Layer(val layer: Int)

fun Layer.below(): Layer = Layer(this.layer - 1)

assert(Layer(2).below() == Layer(1))


fun Layer.area(): Int = when {
    this.layer < 0 -> 0
    else           -> (this.layer * 2 + 1) * (this.layer * 2 + 1)
}

assert(Layer(-1).area() == 0)
assert(Layer(0).area() == 1)
assert(Layer(1).area() == 9)
assert(Layer(2).area() == 25)


fun Layer.circumference(): Int = this.area() - this.below().area()

assert(Layer(0).circumference() == 1)
assert(Layer(1).circumference() == 8)
assert(Layer(2).circumference() == 16)


fun Layer.directionPositions(): List<Int> {
    val eastPos = this.below().area() + this.layer
    val directionDistance = this.circumference() / 4

    return listOf(
        eastPos, 
        eastPos + directionDistance,
        eastPos + (directionDistance * 2),
        eastPos + (directionDistance * 3)
    )
}

assert(Layer(1).directionPositions() == listOf(2, 4, 6, 8))
assert(Layer(2).directionPositions() == listOf(11, 15, 19, 23))
assert(Layer(3).directionPositions() == listOf(28, 34, 40, 46))


fun Int.toLayer(): Layer {
    return 0.rangeTo(this)
        .asSequence()
        .filter { this <= Layer(it).area() }
        .map { Layer(it) }
        .first()
}

assert(1.toLayer() == Layer(0))
assert(6.toLayer() == Layer(1))
assert(10.toLayer() == Layer(2))


fun calcDistance(pos: Int): Int {
    val layer = pos.toLayer()
    val distToCenterDirection = layer.directionPositions()
                                    .map { Math.abs(pos - it) }
                                    .min()

    return distToCenterDirection!! + layer.layer
}

assert(calcDistance(12) == 3)
assert(calcDistance(23) == 2)
assert(calcDistance(1024) == 31)

val distance = calcDistance(input)
println("Distance to center: $distance")



data class MemPos(val x: Int, val y: Int, val dir: String)

class MemWalker {
    val memMap = mutableMapOf("0|0" to 1)
    var pos = MemPos(0, 0, "E")

    fun next(): Int {
        pos = nextPos()
        memMap["${pos.x}|${pos.y}"] = sumCurrent()
        return memMap["${pos.x}|${pos.y}"]!!
    }

    private fun getValue(x: Int, y: Int): Int = memMap.getOrDefault("$x|$y", 0)

    private fun nextPos(): MemPos = when (pos.dir) {
        "E"  -> if (getValue(pos.x, pos.y + 1) == 0) pos.copy(y = pos.y + 1, dir = "N") else pos.copy(x = pos.x + 1)
        "N"  -> if (getValue(pos.x - 1, pos.y) == 0) pos.copy(x = pos.x - 1, dir = "W") else pos.copy(y = pos.y + 1)
        "W"  -> if (getValue(pos.x, pos.y - 1) == 0) pos.copy(y = pos.y - 1, dir = "S") else pos.copy(x = pos.x - 1)
        else -> if (getValue(pos.x + 1, pos.y) == 0) pos.copy(x = pos.x + 1, dir = "E") else pos.copy(y = pos.y - 1)
    }

    private fun sumCurrent(): Int {
        var sum = 0
        for (x in -1..1) {
            for (y in -1..1) {
                sum += getValue(pos.x + x, pos.y + y)
            }
        }
        return sum
    }
}

val assertWalker = MemWalker()
assert(assertWalker.next() == 1)
assert(assertWalker.next() == 2)
assert(assertWalker.next() == 4)
assert(assertWalker.next() == 5)
assert(assertWalker.next() == 10)


val walker = MemWalker()
var lastWrittenSum = 1
while (lastWrittenSum < input) {
    lastWrittenSum = walker.next()
}
println("First larger written value is $lastWrittenSum")
