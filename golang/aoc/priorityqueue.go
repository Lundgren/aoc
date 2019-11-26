package aoc

import (
	"container/heap"
)

const MAX_PRIORITY = 1<<63 - 1

type PriorityQueue struct {
	queue prioQueue
}

func NewPriorityQueue() *PriorityQueue {
	q := prioQueue{}
	heap.Init(&q)
	return &PriorityQueue{
		queue: q,
	}
}

func (pq *PriorityQueue) Push(x interface{}, prio int) {
	heap.Push(&pq.queue, &wrapper{
		value:    x,
		priority: prio,
	})
}

func (pq *PriorityQueue) Pop() (interface{}, int) {
	wrap := heap.Pop(&pq.queue).(*wrapper)
	return wrap.value, wrap.priority
}

func (pq PriorityQueue) Len() int {
	return pq.queue.Len()
}

type wrapper struct {
	value    interface{}
	priority int
}

// A PriorityQueue implements heap.Interface and holds Items.
type prioQueue []*wrapper

func (pq prioQueue) Len() int {
	return len(pq)
}

func (pq prioQueue) Less(i, j int) bool {
	// We want Pop to give us the highest, not lowest, priority so we use greater than here.
	return pq[i].priority > pq[j].priority
}

func (pq prioQueue) Swap(i, j int) {
	if pq.Len() == 0 {
		return
	}
	pq[i], pq[j] = pq[j], pq[i]
}

func (pq *prioQueue) Push(x interface{}) {
	wrap := x.(*wrapper)
	*pq = append(*pq, wrap)
}

func (pq *prioQueue) Pop() interface{} {
	old := *pq
	n := len(old)
	wrap := old[n-1]
	old[n-1] = nil // avoid memory leak
	*pq = old[0 : n-1]
	return wrap
}
