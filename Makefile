dist/index.html: build/bundled.html dist/ dist/qr.svg build/faviconData.json package.json node_modules/
	npm run html-minifier

# Bundle JS and CSS
build/bundled.html: bundle.js build/ build/index.html build/rules.html build/footer.html build/constants.js build/footer.js build/style.css
	node bundle.js

# Inject favicons
build/index.html: src/index.html package.json build/faviconData.json
	npm run favicon-inject

# Transpile Rules
build/rules.html: build/ src/rules.md package.json node_modules/
	npm run marked

# Transpile Footer
build/footer.html: build/ src/footer.md package.json node_modules/
	npm run marked

# Build Constants.js
build/constants.js: src/constants.js package.json node_modules/
	npm run babel

# Build Footer.js
build/footer.js: src/footer.js package.json node_modules/
	npm run babel

# Sass
build/style.css: src/*.scss package.json node_modules/
	npm run sass

dist/qr.svg: dist/ package.json node_modules/
	npm run qrcode

build/faviconData.json: faviconDescription.json assets/privacy-private.svg package.json
	npm run favicon-generate

build/:
	mkdir -p build

dist/:
	mkdir -p dist

node_modules/:
	npm install

.PHONY: clean

clean:
	rm -rf build/ dist/ node_modules/ src/*.css src/*.css.map
