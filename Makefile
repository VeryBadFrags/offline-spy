release/index.html: index.html minify.py
	python3 minify.py

.PHONY: clean

clean:
	rm -rf release/
