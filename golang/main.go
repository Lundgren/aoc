package main

import (
	aoc2015 "aoc/2015"
	aoc2016 "aoc/2016"
	aoc2019 "aoc/2019"
	"aoc/aoc"
	"flag"
	"os"
	"runtime/pprof"
)

func main() {
	cpuprofile := flag.String("cpuprofile", "", "write cpu profile to file")
	debug := flag.Bool("debug", false, "print debug logs")
	all := flag.Bool("all", false, "run all problems")
	flag.Parse()

	if *debug {
		aoc.SetDebug()
	}
	if *cpuprofile != "" {
		f, err := os.Create(*cpuprofile)
		aoc.Check(err)
		pprof.StartCPUProfile(f)
		defer pprof.StopCPUProfile()
	}

	runner := setup()
	if *all {
		runner.RunAll()
	} else {
		runner.RunLatestUnsolved()
	}
}

func setup() *aoc.Runner {
	runner := aoc.NewRunner()
	aoc2015.Register(&runner)
	aoc2016.Register(&runner)
	aoc2019.Register(&runner)
	return &runner
}
