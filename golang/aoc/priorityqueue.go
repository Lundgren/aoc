package aoc

import (
	"container/heap"
)

type PriorityQueue struct {
	queue prioQueue
}

func NewPriorityQueue(init interface{}) *PriorityQueue {
	q := make(prioQueue, 1)
	// q := prioQueue{}
	q[0] = &wrapper{
		value:    init,
		priority: 0,
	}
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

func (pq *PriorityQueue) Pop() interface{} {
	// fmt.Println("pop()", pq)
	wrap := heap.Pop(&pq.queue).(*wrapper)
	return wrap.value
}
func (pq PriorityQueue) Len() int {
	return pq.queue.Len()
}

// An Item is something we manage in a priority queue.
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
	// fmt.Println("Push", len(*pq))
	wrap := x.(*wrapper)
	*pq = append(*pq, wrap)
}

func (pq *prioQueue) Pop() interface{} {
	// fmt.Println("Pop", len(*pq))
	old := *pq
	n := len(old)
	wrap := old[n-1]
	old[n-1] = nil // avoid memory leak
	*pq = old[0 : n-1]
	return wrap
}
