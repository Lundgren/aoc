def input = new File('day4.input.txt').text

boolean isValidPassphrase(String phrase) {
    def words = phrase.tokenize()
    words == words.toUnique()
}

assert isValidPassphrase("aa bb cc dd ee")
assert isValidPassphrase("aa bb cc dd aa") == false
assert isValidPassphrase("aa bb cc dd aaa")

def count = input.split('\n').findAll { isValidPassphrase(it) }.size()
println("Found " + count + " valid passphrases")


boolean isValidAnagramPassphrase(String phrase) {
    def words = phrase.tokenize().collect { it.split("").sort().join() }
    words == words.toUnique()
}

assert isValidAnagramPassphrase("abcde fghij")
assert isValidAnagramPassphrase("abcde xyz ecdab") == false
assert isValidAnagramPassphrase("a ab abc abd abf abj")
assert isValidAnagramPassphrase("iii oiii ooii oooi oooo")
assert isValidAnagramPassphrase("oiii ioii iioi iiio") == false

def count2 = input.split('\n').findAll { isValidAnagramPassphrase(it) }.size()
println("Found " + count2 + " valid anagram passphrases")