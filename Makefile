output/index.html: index.html release/
	cp index.html release/index.html

release/:
	mkdir -p release

.PHONY: clean

clean:
	rm -rf release/
