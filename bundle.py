import os
import re
import htmlmin

source_folder = "src/"
input_html = source_folder + "index.html"
input_css = source_folder + "style.css"
input_js = source_folder + "headScript.js"

output_folder = "release/"
output_path = output_folder + "index.html"

if not os.path.exists(output_folder):
    os.makedirs(output_folder)

# Minify HTML

html_file = open(input_html, "r")

content = re.sub(r'  +', ' ', html_file.read())
html_file.close()

content = htmlmin.minify(content, remove_comments=True, remove_empty_space=True)

# Inject CSS

css_file = open(input_css, "r")

css_link = "<link rel=stylesheet href=style.css>"
content = content.replace(css_link, "\n<style>" + css_file.read() + "</style>")

css_file.close()

# Inject JS

js_file = open(input_js, "r")

js_link = "<script src=headScript.js></script>"
content = content.replace(js_link, "\n<script>" + js_file.read() + "</script>")

js_file.close()

# Output content

output_file = open(output_path, "w")
output_file.write(content)

output_file.close()

print("Bundled " + source_folder + " into " + output_path)

input_html = os.stat(input_html).st_size
input_css = os.stat(input_css).st_size
input_js = os.stat(input_js).st_size
input_size = input_html + input_css + input_js
print("Input size: " + str(input_size) + "B")
output_size = os.stat(output_path).st_size
print("Output size: " + str(output_size) + "B")
compression_ratio = round((input_size - output_size) / input_size * 100, 1)
print("Compression: " + str(compression_ratio) + "%")
