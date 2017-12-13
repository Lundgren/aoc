module Main exposing (..)

import Html exposing (li, text, ul)
import List.Extra exposing (getAt)


input =
    """0: 3\x0D\x0D
1: 2\x0D\x0D
2: 4\x0D\x0D
4: 4\x0D\x0D
6: 5\x0D\x0D
8: 6\x0D\x0D
10: 8\x0D\x0D
12: 8\x0D\x0D
14: 6\x0D\x0D
16: 6\x0D\x0D
18: 9\x0D\x0D
20: 8\x0D\x0D
22: 6\x0D\x0D
24: 10\x0D\x0D
26: 12\x0D\x0D
28: 8\x0D\x0D
30: 8\x0D\x0D
32: 14\x0D\x0D
34: 12\x0D\x0D
36: 8\x0D\x0D
38: 12\x0D\x0D
40: 12\x0D\x0D
42: 12\x0D\x0D
44: 12\x0D\x0D
46: 12\x0D\x0D
48: 14\x0D\x0D
50: 12\x0D\x0D
52: 12\x0D\x0D
54: 10\x0D\x0D
56: 14\x0D\x0D
58: 12\x0D\x0D
60: 14\x0D\x0D
62: 14\x0D\x0D
64: 14\x0D\x0D
66: 14\x0D\x0D
68: 14\x0D\x0D
70: 14\x0D\x0D
72: 14\x0D\x0D
74: 20\x0D\x0D
78: 14\x0D\x0D
80: 14\x0D\x0D
90: 17\x0D\x0D
96: 18"""


testInput =
    """0: 3\x0D\x0D
1: 2\x0D\x0D
4: 4\x0D\x0D
6: 4"""


main =
    ul []
        [ li [] [ text ("testScore == " ++ toString (countCaughtScore 0 (parse testInput))) ]
        , li [] [ text ("testNotCaught == " ++ toString (dontGetCaught 0 (parse testInput))) ]
        , li [] [ text ("score == " ++ toString (countCaughtScore 0 (parse input))) ]
        , li [] [ text ("notCaught == " ++ toString (dontGetCaught 0 (parse input))) ]
        ]


type Dir
    = Forward
    | Backward


type alias ScanState =
    { layer : Int, range : Int, pos : Int, dir : Dir }


parse : String -> List ScanState
parse s =
    s
        |> String.split "\n"
        |> List.map String.trim
        |> List.map parseLine


parseLine : String -> ScanState
parseLine s =
    let
        val =
            s
                |> String.split ": "
                |> List.map String.toInt
                |> List.map (Result.withDefault 0)

        layer =
            getAt 0 val |> Maybe.withDefault 0

        range =
            getAt 1 val |> Maybe.withDefault 0
    in
        { layer = layer, range = range, pos = 0, dir = Forward }


tick : List ScanState -> List ScanState
tick firewall =
    firewall
        |> List.map tickScanner


tickScanner : ScanState -> ScanState
tickScanner state =
    case state.dir of
        Forward ->
            moveForward state

        Backward ->
            moveBackward state


moveForward : ScanState -> ScanState
moveForward state =
    let
        at_top =
            state.dir == Forward && state.pos == (state.range - 1)
    in
        if at_top then
            { state | pos = state.pos - 1, dir = Backward }
        else
            { state | pos = state.pos + 1 }


moveBackward : ScanState -> ScanState
moveBackward state =
    let
        at_bottom =
            state.dir == Backward && state.pos == 0
    in
        if at_bottom then
            { state | pos = state.pos + 1, dir = Forward }
        else
            { state | pos = state.pos - 1 }


score : Int -> List ScanState -> Int
score player firewall =
    firewall
        |> List.map (severity player)
        |> List.sum


severity : Int -> ScanState -> Int
severity player state =
    let
        l =
            [ state.layer, state.pos, player ]

        caught =
            player == state.layer && state.pos == 0
    in
        if caught then
            state.layer * state.range
        else
            0


countCaughtScore : Int -> List ScanState -> Int
countCaughtScore player firewall =
    let
        moves =
            firewall
                |> List.map (\x -> x.layer)
                |> List.maximum
                |> Maybe.withDefault 0

        atEnd =
            player >= moves

        nextFirewall =
            tick firewall

        caughtScore =
            score player firewall
    in
        if atEnd then
            caughtScore
        else
            caughtScore + countCaughtScore (player + 1) nextFirewall


dontGetCaught : Int -> List ScanState -> Int
dontGetCaught player firewall =
    let
        caught =
            (countCaughtScore player firewall) > 0
    in
        if caught then
            dontGetCaught (player - 1) firewall
        else
            player
