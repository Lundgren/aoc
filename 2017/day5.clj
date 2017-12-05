(require ['clojure.string :as 'str])

(def input (vec (map read-string (str/split-lines (slurp "day5.input.txt")))))

(defn move [pos offsets]
  (loop [pos pos 
         offsets offsets 
         sum 0]
    (cond
      (< pos 0) sum
      (>= pos (count offsets)) sum
      :else (recur (+ pos (nth offsets pos))
                   (update offsets pos inc)
                   (inc sum)))))

(assert (= (move 0 [0 3 0 1 -3]) 5))

(println (format "Took %d steps to reach the exit" (move 0 input)))


(defn move2 [pos offsets]
  (loop [pos pos 
         offsets offsets 
         sum 0]
    (cond
      (< pos 0) sum
      (>= pos (count offsets)) sum
      :else (recur (+ pos (nth offsets pos))
                   (update offsets pos (if (< (nth offsets pos) 3) inc dec))
                   (inc sum)))))


(assert (= (move2 0 [0 3 0 1 -3]) 10))

(println (format "Took %d steps to reach the second exit" (move2 0 input)))