release/index.html: index.html minify.py release/qr.png
	python3 minify.py

release/qr.png:
	qrencode -s 4 -m 1 -o release/qr.png "https://spy.verybadfrags.com"

.PHONY: clean

clean:
	rm -rf release/
