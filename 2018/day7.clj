;; Don't judge, it only have to work once..

(require '[clojure.string :as str])
(use 'clojure.java.io)

(def input 
  (with-open [r (reader "day7.input")]
    (doall (line-seq r))))

(def test-input 
  (with-open [r (reader "day7.test.input")]
    (doall (line-seq r))))

(defn parse [row]
  (let [p (str/split row #" ")]
    [(nth p 1) (nth p 7)]))


(defn transform [list]
  (doall (map parse list)))


(defn zero-map [steps]
  (merge 
    (reduce #(assoc %1 (%2 0) 0)
      {}
      steps)
    (reduce #(assoc %1 (%2 1) 0)
      {}
      steps)))

;; Map input into how many dependencies each have
(defn count-requirements [steps]
  (reduce #(assoc %1 (%2 1) (inc (%1 (%2 1) 0)))
          (zero-map steps)
          steps))

;; Get the all instruction with 0 requirements, sorted alpabethically
(defn get-next-instructions [steps]
  (let [step-map (count-requirements steps)]
    (into (sorted-map) 
      (filter (comp #{0} last) step-map))))

;; Return true if first element in arrays are the same
(defn same? [instruction step]
  (if (= (instruction 0) (step 0)) true false))
(assert (same? ["G" 0] ["G" "T"]))

;; Delete all steps requiring a specific instruction
(defn filter-steps [steps instruction]
  (remove (partial same? instruction) steps))
(defn filter-steps2 [steps instructions]
  (if (= (count instructions) 0) steps
    (let [instr (first instructions)]
      (filter-steps steps instr))))

(defn part1 [input]
  (loop [steps (transform input)]
    (when (> (count steps) 0)
      (let [instr (first (get-next-instructions steps))]
        (print (instr 0))
        (if (= (count steps) 1)
          (println steps))
        (recur (filter-steps steps instr))))))


(defn step-cost [ts step]
  [(first step) (+ ts 61 (- (int (.charAt (first step) 0)) (int \A)))])

(defn part2 [input]
  (loop [ts 0
         steps (transform input)
         workers (set (range 5))
         ongoing (map (partial step-cost 0) (get-next-instructions steps))]
    (if (or (and (empty? ongoing) (empty? steps)) (= ts 10000))
      (+ 64 ts) ;; This is to compencate for the lost last letter in this calculation
      (let [completed-now (filter (comp #{ts} last) ongoing)
            completed-now-set (set (map first completed-now))
            steps-left (filter-steps2 steps completed-now)
            instrs (get-next-instructions steps-left)
            next-ongoing (map (partial step-cost ts) (get-next-instructions steps))
            ongoing-now-set (set (map first ongoing))
            next-ongoing2 (remove #(contains? ongoing-now-set (first %)) next-ongoing)
            still-ongoing (remove #(contains? completed-now-set (first %)) ongoing)
            nbr-next-ongoing (- 5 (count still-ongoing))
            all-ongoing (concat still-ongoing (take nbr-next-ongoing next-ongoing2))
      ]
      (recur (inc ts)
             steps-left
             workers
             all-ongoing)))))

(println "Part1: ")
(part1 input)
(println "Part2: " (part2 input))
