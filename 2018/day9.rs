
fn play(players: usize, marbles: usize) -> usize{
    let mut board = vec![0, 1];
    let mut score = vec![0; players];

    let mut marble = 2;
    let mut idx: usize = 1;
    let mut player = 1;

    while marble <= marbles {
        if marble % (marbles/100) == 0 {
            println!("{}%", (marble * 100) / marbles);
        }

        if marble % 23 == 0 {
            let board_size = board.len();
            let remove_idx = (board_size as i32 + (idx as i32 - 9)) as usize % board_size;
            let removed = board.remove(remove_idx);
            score[player] = score[player] + marble + removed;
            idx = remove_idx;
        }
        else {
            board.insert(idx, marble);
        }

        idx = idx + 2;
        if idx > board.len() {
            idx = 1;
        }

        player = player + 1;
        if player >= players {
            player = 0
        }

        // println!("{} [{}] {:?}", marble, player, board);
        marble = marble + 1;
    }

    return score.iter().cloned().fold(0, usize::max);
}


fn main() {
    // assert!(32 == play(9, 25));
    // assert!(8317 == play(10, 1618));
    // assert!(146373 == play(13, 7999));
    // assert!(2764 == play(17, 1104));
    // assert!(54718 == play(21, 6111));
    // assert!(37305 == play(30, 5807));

    // println!("Highscore for 447 players and 71510 marbles: {}", play(447, 71510));
    println!("Highscore for 447 players and 71510*100 marbles: {}", play(447, 71510 * 100));
}