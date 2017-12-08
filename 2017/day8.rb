input = File.readlines 'day8.input.txt'

test_input = ["b inc 5 if a > 1", "a inc 1 if b < 5", "c dec -10 if a >= 1", "c inc -20 if c == 10"]


def handle_line(line, registry, save_top_anytime)
    parts = line.split
    evaluated = eval("#{registry[parts[4]]} #{parts[5]} #{parts[6]}")

    if evaluated and parts[1] == "inc"
        registry[parts[0]] = registry[parts[0]] + parts[2].to_i
    elsif evaluated and parts[1] == "dec"
        registry[parts[0]] = registry[parts[0]] - parts[2].to_i
    end

    if save_top_anytime
        registry["top-anytime"] = [registry["top-anytime"], registry[parts[0]]].max
    end
end

def build_registry(arr, save_top_anytime = false)
    reg = Hash.new(0)
    arr.each { |line| handle_line(line, reg, save_top_anytime) }
    reg
end

reg = build_registry(test_input)
puts "#{reg["a"]} == 1 && #{reg["c"]} == -10"

def max_hash(hash)
    hash.max_by{|k,v| v}
end

puts "#{max_hash(reg)} == [a, 1]"


key, val = max_hash(build_registry(input))
puts "Max registry value is #{val}"

key2, val2 = max_hash(build_registry(input, true))
puts "Top anytime registry value is #{val2}"