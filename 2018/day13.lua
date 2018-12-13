

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
            local track = { cart = nil }
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

function cart(old_cart, new_track)
  if old_cart == "<" then
    if new_track.path == "\\" then return "^"
    elseif new_track.path == "/" then return "v"
    else return "<" end
  elseif old_cart == ">" then
    if new_track.path == "\\" then return "v" 
    elseif new_track.path == "/" then return "^"
    else return ">" end
  elseif old_cart == "v" then 
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
                print(i .. " " .. j .. " - " .. track.cart .. " " .. track.path)
                if is_left(track) then
                    if is_cart(row[j-1]) then
                        return true, i, j-i
                    end
                    row[j-1].cart = cart(row[j].cart, row[j-i])
                elseif is_right(track) then
                    if is_cart(row[j+1]) then
                        return true, i, j+1
                    end
                    row[j+1].cart = cart(row[j].cart, row[j+i])
                elseif is_up(track) then
                    if is_cart(tracks[i-1][j]) then
                        return true, i-1, j
                    end
                    tracks[i-1][j].cart = cart(row[j].cart, tracks[i-1][j])
                else
                    if is_cart(tracks[i+1][j]) then
                        return true, i+1, j
                    end
                    tracks[i+1][j].cart = cart(row[j].cart, tracks[i+1][j])
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
local coll, x, y = tick(track)
print(tostring(coll) .. "-" .. x .. "x" .. y)
print_track(track)





