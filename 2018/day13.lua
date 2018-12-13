

function is_left(t) if t.cart == "<" then return true else return false end end
function is_right(t) if t.cart == ">" then return true else return false end end
function is_up(t) if t.cart == "^" then return true else return false end end
function is_down(t) if t.cart == "v" then return truen else return false end end
function is_cart(t) return is_left(t) or is_right(t) or is_up(t) or is_down(t) end

function read_tracks(file)
    tracks = {}
    for line in io.lines(file) do
        row = {}
        for i = 1, #line do
            local c = line:sub(i,i) 
            local track = { cart = nil, moved = 0 }
            -- print(c)
            if c == "<" or c == ">" then
                track.path = "-"
                track.cart = c
            elseif c == "^" or c == "v" then
                track.path = "-"
                track.cart = c
            else
                track.path =  c
            end
            row[i] = track
        end
        tracks[#tracks + 1] = row
    end
    
    return tracks
end

function cart(old_track, new_track)
    --print("cart(" .. old_track.cart .. ", " .. new_track.path)
  if old_track.cart == "<" then
    if new_track.path == "\\" then return "^"
    elseif new_track.path == "/" then return "v"
    else return "<" end
  elseif old_track.cart == ">" then
    if new_track.path == "\\" then return "v" 
    elseif new_track.path == "/" then return "^"
    else return ">" end
  elseif old_track.cart == "v" then 
    if new_track.path == "\\" then return ">" 
    elseif new_track.path == "/" then return "<"
    else return "v" end
  else 
    if new_track.path == "\\" then return "<" 
    elseif new_track.path == "/" then return ">"
    else return "^" end
  end
end

function tick(tracks, turn) -- continue on turn
    for i = 1, #tracks do
        row = tracks[i]
        for j = 1, #row do
            track = row[j]
            if track.cart then
                -- print(i .. " " .. j .. " " .. track.moved)
            end
            if track.cart and track.moved < turn then
                -- print(i .. " " .. j .. " - " .. track.cart .. " " .. track.path)
                if track.cart == "<" then
                    --print("in left")
                    if row[j-1].cart then
                        return true, i, j-1
                    end
                    row[j-1].cart = cart(track, row[j-1])
                    row[j-1].moved = turn

                elseif track.cart == ">" then
                    if row[j+1].cart then
                        return true, i, j+1
                    end
                    row[j+1].cart = cart(track, row[j+1])
                    row[j+1].moved = turn

                elseif track.cart == "^" then
                    if tracks[i-1][j].cart then
                        return true, i-1, j
                    end
                    tracks[i-1][j].cart = cart(track, tracks[i-1][j])
                    tracks[i-1][j].moved = turn

                else
                    if tracks[i+1][j].cart then
                        return true, i+1, j
                    end
                    tracks[i+1][j].cart = cart(track, tracks[i+1][j])
                    tracks[i+1][j].moved = turn
                end
                row[j].cart = nil
            end
        end
    end

    return false, 0, 0
end

function print_track(track)
    for i = 1, #tracks do
        row = tracks[i]
        for j = 1, #row do
          if row[j].cart then
            io.write(row[j].cart)
          else
            io.write(row[j].path)
          end
        end
        print("")
    end
    print("")
end
    

local track = read_tracks("day13.input")
print_track(track)
-- local coll, x, y = tick(track, 1)
-- print(tostring(coll) .. "-" .. x .. "x" .. y)
-- print_track(track)

local collision = false
local x, y = 0
local turn = 1
while (collision == false and turn < 15) do
    collision, x, y = tick(track, turn)
    print_track(track)
    turn = turn + 1
end
print("Collision at " .. x .. ", " .. y)



