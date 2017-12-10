module Main exposing (..)

import Html exposing (li, text, ul)
import List.Extra exposing (splitAt)
import Char
import Bitwise
import ParseInt exposing (toHex)


input =
    "130,126,1,11,140,2,255,207,18,254,246,164,29,104,0,224"


main =
    ul []
        [ li [] [ text ("[3,4,0,1,2] == " ++ toString (wrap (List.range 0 4) 3)) ]
        , li [] [ text ("[2,1,0,3,4] == " ++ toString (knot (List.range 0 4) 0 3)) ]
        , li [] [ text ("[4,3,0,1,2] == " ++ toString (knot [ 2, 1, 0, 3, 4 ] 3 4)) ]
        , li [] [ text ("[4,3,0,1,2] == " ++ toString (knot [ 4, 3, 0, 1, 2 ] 3 1)) ]
        , li [] [ text ("[3,4,2,1,0] == " ++ toString (knot [ 4, 3, 0, 1, 2 ] 1 5)) ]
        , li [] [ text ("12 == " ++ toString (hash_once_product (List.range 0 4) "3,4,1,5")) ]
        , li [] [ text ("Knot hash is: " ++ toString (hash_once_product (List.range 0 255) input)) ]
        , li [] [ text ("[49,44,50,44,51,17,31,73,47,23] == " ++ toString (lengths_seq "1,2,3")) ]
        , li [] [ text ("40 == " ++ toString (list_to_hex_str [ 65, 27, 9, 1, 4, 3, 40, 50, 91, 7, 6, 0, 2, 5, 68, 22 ] "")) ]
        , li [] [ text ("a2582a3a0e66e6e86e3812dcb672a272 == " ++ toString (hash_64_to_hex (List.range 0 255) "")) ]
        , li [] [ text ("33efeb34ea91902bb2f59c9920caa6cd == " ++ toString (hash_64_to_hex (List.range 0 255) "AoC 2017")) ]
        , li [] [ text ("3efbe78a8d82f29979031a4aa0b16a9d == " ++ toString (hash_64_to_hex (List.range 0 255) "1,2,3")) ]
        , li [] [ text ("63960835bcdc130f0b66d7ff4f6a5a8e == " ++ toString (hash_64_to_hex (List.range 0 255) "1,2,4")) ]
        , li [] [ text ("Dense hash is: " ++ toString (hash_64_to_hex (List.range 0 255) input)) ]
        ]


type alias HashStep a =
    { list : List a, pos : Int, skip : Int }


wrap : List a -> Int -> List a
wrap list pos =
    let
        ( pt1, pt2 ) =
            splitAt pos list
    in
        pt2 ++ pt1


knot : List a -> Int -> Int -> List a
knot list pos length =
    let
        ( reverse_part, rest ) =
            splitAt length (wrap list pos)

        wrapped_result =
            (List.reverse reverse_part) ++ rest
    in
        wrap wrapped_result ((List.length list) - pos)


hash_step : Int -> HashStep a -> HashStep a
hash_step length { list, pos, skip } =
    let
        next_pos =
            (pos + length + skip) % (List.length list)

        next_skip =
            skip + 1

        next_list =
            knot list pos length
    in
        { list = next_list, pos = next_pos, skip = next_skip }


hash : List Int -> HashStep a -> Int -> HashStep a
hash lengths step rounds =
    let
        round_res =
            List.foldl hash_step step lengths
    in
        case rounds of
            1 ->
                round_res

            _ ->
                hash lengths round_res (rounds - 1)


hash_once_product : List Int -> String -> Int
hash_once_product list lengths_str =
    let
        init =
            { list = list, pos = 0, skip = 0 }

        lengths =
            lengths_str
                |> String.split ","
                |> List.map String.toInt
                |> List.map (Result.withDefault 0)

        result =
            hash lengths init 1
    in
        List.product (List.take 2 result.list)


lengths_seq : String -> List Int
lengths_seq str =
    str
        |> String.toList
        |> List.map Char.toCode
        |> \x -> List.append x [ 17, 31, 73, 47, 23 ]


list_to_hex_str : List Int -> String -> String
list_to_hex_str list hex_str =
    let
        ( curr, rest ) =
            splitAt 16 list

        hex_val =
            curr
                |> List.foldl Bitwise.xor 0
                |> toHex
                |> String.padLeft 2 '0'

        res_str =
            hex_str ++ hex_val
    in
        case rest of
            [] ->
                String.toLower res_str

            _ ->
                list_to_hex_str rest res_str


hash_64_to_hex : List Int -> String -> String
hash_64_to_hex list lengths_str =
    let
        init =
            { list = list, pos = 0, skip = 0 }

        lengths =
            lengths_seq lengths_str

        result =
            hash lengths init 64
    in
        list_to_hex_str result.list ""
