release/index.html: release/ minify.py index.html release/qr.png
	python3 minify.py

release/:
	mkdir -p release

release/qr.png:
	qrencode -s 4 -m 2 -o release/qr.png "https://spy.verybadfrags.com"

.PHONY: clean

clean:
	rm -rf release/
