.PHONY: dev

dev:
	node runner.js $(YEAR) $(DAY)

dev-with-date:
	node runner.js

leaderboard:
	node utils/make_leaderboard.js