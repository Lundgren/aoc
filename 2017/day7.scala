import scala.collection.mutable.ArrayBuffer
import scala.collection.mutable.HashMap
import scala.io.Source

val input = Source.fromFile("day7.input.txt").getLines.toArray

case class Program(name: String, weight: Int, parent: String, children: List[String])

def parseProgram(s: String): Program = {
    val progAndChildren = s.split(" -> ")
    val nameAndWeight = progAndChildren(0).split(" ")

    val name = nameAndWeight(0)
    val weight = nameAndWeight(1).replaceAll("[()]", "").toInt

    var children = List.empty[String]
    if (progAndChildren.length > 1) {
        val childNames = progAndChildren(1).split(", ")
        children ++= childNames
    }

    return Program(name, weight, null, children)
}

assert( parseProgram("ktlj (57)") == Program("ktlj", 57, null, List.empty[String]) )
assert( parseProgram("fwft (72) -> ktlj, cntj, xhth") == Program("fwft", 72, null, List("ktlj", "cntj", "xhth")) )


def parseLines(s: Array[String]): HashMap[String, Program] = {
    val progs = s.map(x => parseProgram(x))

    val map = HashMap.empty[String, Program]
    progs.foreach(x => map += x.name -> x)

    progs.foreach(parent => parent.children.foreach(child => map(child) = map(child).copy(parent = parent.name)))

    return map
}

val testInput = """ktlj (57)
fwft (72) -> ktlj
""".split("\n")
assert( parseLines(testInput) == HashMap("ktlj" -> Program("ktlj", 57, "fwft", List.empty[String]), "fwft" -> Program("fwft", 72, null, List("ktlj"))) )


def findTop(map: HashMap[String, Program]): String = {
    var (name, prog) = map.head
    while(prog.parent != null) {
        prog = map(prog.parent)
    }

    return prog.name
}

val exampleInput = """pbga (66)
xhth (57)
ebii (61)
havc (66)
ktlj (57)
fwft (72) -> ktlj, cntj, xhth
qoyq (66)
padx (45) -> pbga, havc, qoyq
tknk (41) -> ugml, padx, fwft
jptl (61)
ugml (68) -> gyxo, ebii, jptl
gyxo (61)
cntj (57)
""".split("\n")
assert( findTop(parseLines(exampleInput)) == "tknk" )

val bottomProgram = findTop(parseLines(input))
println(s"The program at the bottom is called $bottomProgram")


def recursiveFindWeight(name: String, m: HashMap[String, Program]): Int = {
    val prog = m(name)

    val childWeights = prog.children.map(child => recursiveFindWeight(child, m))
    val childWeightSum = childWeights.sum //prog.children.isEmpty ? 0 : childWeights.sum
    
    if (!childWeights.isEmpty && childWeights.max != childWeights.min) {
        println(s"Found weight error for $name's children:")
        prog.children
                .zip(childWeights)
                .foreach{ case (name, childWeights) => println(s"\t$name weights $childWeights (${m(name).weight})") }
    }

    return prog.weight + childWeightSum
}


//recursiveFindWeight("tknk", parseLines(exampleInput))
recursiveFindWeight(bottomProgram, parseLines(input))
