

function is_left(s) if string.match(s:sub(1,1), "<") then return true else return false end end
function is_right(s) if string.match(s:sub(1,1), ">") then return true else return false end end
function is_up(s) if string.match(s:sub(1,1), "^") then return true else return false end end
function is_down(s) if string.match(s:sub(1,1), "v") then return truen else return false end end
function is_cart(s) return is_left(s) or is_right(s) or is_up(s) or is_down(s) end

function read_tracks(file)
    tracks = {}
    for line in io.lines(file) do
        row = {}
        for i = 1, #line do
            local c = line:sub(i,i) 
            if is_left(c) or is_right(c) then
                row[i] = c + "-"
            elseif is_up(c) or is_down(c) then
                row[i] = c + "|"
            else
                row[i] =  c
            end
        end
        tracks[#tracks + 1] = row
    end
    
    return tracks
end

function tick(tracks)
    for i = 1, #tracks do
        row = tracks[i]
        for j = 1, #row do
            s = row[j]
            if #s == 2 then
                if is_left(s) then
                    if is_cart(row[j-1]) then
                        return true, i, j-i
                    end
                    row[j-1] = s:sub(1,1) + row[j-1]
                elseif is_right(s) then
                    if is_cart(row[j+1]) then
                        return true, i, j+1
                    end
                    row[j+1] = s:sub(1,1) + row[j+1]
                elseif is_up(s) then
                    if is_cart(tracks[i-1][j]) then
                        return true, i-1, j
                    end
                    tracks[i-i][j] = s:sub(1,1) + tracks[i-i][j]
                else
                    if is_cart(tracks[i+1][j]) then
                        return true, i+1, j
                    end
                    tracks[i+1][j] = s:sub(1,1) + tracks[i+1][j]
                end
                row[j] = s:sub(2,2)
            end
        end
    end

    return false, 0, 0
end

function print_track(track)
    for i = 1, #tracks do
        row = tracks[i]
        for j = 1, #row do
            io.write(row[j]:sub(1,1))
        end
        print("")
    end
    print("")
end
    

local track = read_tracks("day13.input")
print_track(track)
tick(track)
print_track(track)





