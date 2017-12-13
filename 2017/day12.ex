defmodule Day12 do

  def get_prog_map() do
    File.read!("day12.input.txt")
      |> String.split("\n")
      |> Enum.with_index
      |> Enum.map(&parse/1)
      |> Enum.reduce(%{}, fn x, acc -> Map.put(acc, x.id, x) end)
      |> re_group
  end

  def parse({s, id}) do
    [_, rest] = String.split s, " <-> "
    talks_to = String.split(rest, ", ") |> Enum.map(&String.to_integer/1)
    %{id: id, talks_to: talks_to, group: Enum.min([id | talks_to])}
  end
  
  def re_group(map) do
    new_map = Map.values(map) |> Enum.reduce(map, &re_group_prog/2)
    
    case Map.equal?(map, new_map) do
      true  -> new_map
      false -> re_group(new_map)
    end
  end
  
  def re_group_prog(prog, map) do
    min_group = Enum.map([prog.id | prog.talks_to], &(get_in(map, [&1, :group]))) |> Enum.min
    put_in map, [prog.id, :group], min_group
  end
end

prog_map = Day12.get_prog_map()
programs_in_group_0 = Enum.count(prog_map, fn {_, v} -> v.group == 0 end)
unique_groups = prog_map
      |> Map.values
      |> Enum.map(fn x -> x.group end)
      |> Enum.uniq
      |> Enum.count
    
IO.puts("There are #{ programs_in_group_0 } programs in group 0")
IO.puts("There are #{ unique_groups } unique groups")