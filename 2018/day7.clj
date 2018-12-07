(require '[clojure.string :as str])

(def input 
  (with-open [r (reader "day7.input")]
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


(println (parse "Step B must be finished before step P can begin."))
(println (type input))
(println (count input))
(println (nth input 2))
(println (transform input))