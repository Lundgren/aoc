(require '[clojure.string :as str])
(use 'clojure.java.io)

(def input 
  (with-open [r (reader "day7.input")]
    (doall (line-seq r))))

(def test-input 
  (with-open [r (reader "day7.test.input")]
    (doall (line-seq r))))

(defn parse [row]
  ;; (println row)
  (let [p (str/split row #" ")]
    ;; (println p)
    ;; (println (nth p 1))
    ;; (println (nth p 7))
    [(nth p 1) (nth p 7)]))

(defn parse2 [row] "blah")

(defn transform [list]
  (doall (map parse list)))
;; (println input)
;; Step G must be finished before step T can begin.


;; (defn count [])

;; (println (parse "Step B must be finished before step P can begin."))
;; (println (type input))
(println (count input))
;; (println (nth input 2))
;; (println (transform input))

;; Create a map: {letter: 0} for all letters in steps
(defn zero-map [steps]
  (merge 
    (reduce #(assoc %1 (%2 0) 0)
      {}
      steps)
    (reduce #(assoc %1 (%2 1) 0)
      {}
      steps)))
(defn zero-map2 [steps]
    (reduce #(assoc %1 (%2 0) 0)
      {}
      steps))

;; (println (zero-map (transform input)))

;; Map input into how many dependencies each have
(defn count-requirements [steps]
    ;; (println steps)
  (reduce #(assoc %1 (%2 1) (inc (%1 (%2 1) 0)))
          ;; {}
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
  (println instructions)
  (println (first instructions))
  ;; (println (dissoc instructions (first instructions)))
  ;; (println steps)
  ;; (println (peek instructions) (pop instructions))
  (loop [instr (first instructions)
         instrs-left (dissoc instructions (instr 0))
         steps-left steps]
         (println instr)
         (println instrs-left)
        ;;  (println instr instrs-left steps-left)
         (when (< (count instrs-left) 0)
          (recur (peek instrs-left)
                 (pop instrs-left)
                 (filter-steps steps-left instr)))))

(defn part1 [input]
  (loop [steps (transform input)]
    ;; (println (count steps) steps)
    (when (> (count steps) 0)
    ;; (if (empty? steps)
      ;; (println steps)
      (let [instr (first (get-next-instructions steps))]
        (print (instr 0))
        (if (= (count steps) 1)
          (println steps))
        (recur (filter-steps steps instr))))))

(defn get-finished [ts ongoing]
 []) ;; TODO

(defn step-cost [step]
  (+ 61 (- (int (first step)) (int \A))))


(defn part3 [input]
  (loop [steps (transform input)]
    ;; (println (count steps) steps)
    (when (> (count steps) 0)
    ;; (if (empty? steps)
      ;; (println steps)
      (let [instrs (get-next-instructions steps)]
        (println instrs)
        (if (= (count steps) 1)
          (println steps))
        (recur (filter-steps2 steps instrs))))))

(defn part2 [input]
  (loop [ts 0
         steps (transform input)
         workers (set (range 5))
         ongoing []]
    ;; (if (and (empty? ongoing) (empty? steps)
    (when (> (count steps) 0)
      (let [completed-now (get-finished ts ongoing)
            completed-now (filter #(= ts (nth % 1)) ongoing)
            steps-now (filter-steps2 steps completed-now)

      ])
      )))

;; (println res)
;; (println (nth (get-next-instruction res) 0))

;; (println (filter-steps (transform input) (get-next-instruction res)))

;; (println (count-requirements test-input))
;; (part1 input)
(part3 input)

;; (println test-input)

;; (def abc1
;;   (transform test-input))
;; (println abc1)

;; (def abc2
;;   (get-next-instruction abc1))
;; (println abc2)

;; (def abc3
;;   (filter-steps abc1 abc2))
;; (println abc3)

;; ;; (def abc1b
;; ;;   (transform test-input))
;; ;; (println abc1b)

;; (def abc2b
;;   (get-next-instruction abc3))
;; (println abc2b)

;; (def abc3b
;;   (filter-steps abc3 abc2b))
;; (println abc3b)