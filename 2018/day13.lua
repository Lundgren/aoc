NEXT_PATH = {
    ['<-']  = "<",
    ["</"]  = "v",
    ["<\\"] = "^",
    [">-"]  = ">",
    [">/"]  = "^",
    [">\\"] = "v",
    ["^|"]  = "^",
    ["^/"]  = ">",
    ["^\\"] = "<",
    ["v|"]  = "v",
    ["v/"]  = "<",
    ["v\\"] = ">",
    ["<+0"] = "v",
    ["<+1"] = "<",
    ["<+2"] = "^",
    [">+0"] = "^",
    [">+1"] = ">",
    [">+2"] = "v",
    ["^+0"] = "<",
    ["^+1"] = "^",
    ["^+2"] = ">",
    ["v+0"] = ">",
    ["v+1"] = "v",
    ["v+2"] = "<"
}

function parse(file)
    local track = {}
    local carts = {}
    for line in io.lines(file) do
        local row = {}
        for i = 1, #line do
            local c = line:sub(i,i) 
            if c == "<" or c == ">" then
                carts[#carts+1] = {id = #carts, x = i, y = #track+1, dir = c, turn = 0}
                row[i] = "-"
            elseif c == "^" or c == "v" then
                carts[#carts+1] = {id = #carts, x = i, y = #track+1, dir = c, turn = 0}
                row[i] = "|"
            else
                row[i] = c
            end
        end
        track[#track + 1] = row
    end
    
    return carts, track
end

function update_cart(cart, track, x, y)
    local p = cart.dir .. track[y][x]
    if track[y][x] == "+" then
        p = p .. (cart.turn % 3)
        cart.turn = cart.turn + 1
    end

    cart.x = x
    cart.y = y
    cart.dir = NEXT_PATH[p]
end

function any_collisions(carts, cart)
    for i = 1, #carts do
        if cart.id ~= carts[i].id and cart.x == carts[i].x and cart.y == carts[i].y and not carts[i].dead and not cart.dead then
            cart.dead = true
            carts[i].dead = true
            return true
        end
    end
    return false
end

function tick(carts, track)
    table.sort(carts, function(c1, c2) return c1.x * 1000 + c1.y < c2.x * 1000 + c2.y end)

    local colliding_cart = nil
    for i = 1, #carts do
        cart = carts[i]

        if cart.dir == "<" then
            update_cart(cart, track, cart.x-1, cart.y)
        elseif cart.dir == ">" then
            update_cart(cart, track, cart.x+1, cart.y)
        elseif cart.dir == "^" then
            update_cart(cart, track, cart.x, cart.y-1)
        else
            update_cart(cart, track, cart.x, cart.y+1)
        end

        if any_collisions(carts, cart) then
            colliding_cart = cart
        end
    end

    return colliding_cart
end

function print_track(carts, track)
    local cart_map = {}
    for i = 1, #carts do
        c = carts[i]
        if not c.dead then
            cart_map[c.y .. c.x] = c.dir
        end
    end

    for y = 1, #track do
        row = track[y]
        for x = 1, #track[y] do
          if cart_map[y .. x] then
            io.write(cart_map[y .. x])
          else
            io.write(track[y][x])
          end
        end
        print("")
    end
    print("")
end
    
function count_carts(carts)
    count = 0
    for i = 1, #carts do
        if not carts[i].dead then
            count = count + 1
        end
    end
    return count
end


local carts, track = parse("day13.input")
-- print_track(carts, track)

local count = count_carts(carts)
while (count > 1) do
    colliding_cart = tick(carts, track)

    if colliding_cart then
        print("Collision at " .. (colliding_cart.x-1) .. "," .. (colliding_cart.y-1))
    end
    
    count = count_carts(carts)
end

for i = 1, #carts do
    if not carts[i].dead then
        print("Last cart at " .. (carts[i].x-1) .. "," .. (carts[i].y-1))
    end
end



