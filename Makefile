.PHONY: dev

dev:
	node runner.js $(YEAR) $(DAY)

dev-with-date:
	node runner.js