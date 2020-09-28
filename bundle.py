import os
import re
import htmlmin
import subprocess

source_folder = "src/"
input_html = source_folder + "index.html"
input_css = source_folder + "style.css"

constants_input_js = source_folder + "constants.js"
header_js = source_folder + "header.js"
footer_js = source_folder + "footer.js"

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

clean_css = subprocess.check_output(['yuicompressor', input_css])

css_link = "<link rel=stylesheet href=style.css>"
content = content.replace(css_link, "\n<style>" + clean_css.decode('utf-8') + "</style>")

# Inject JS

## Constants

constants_file = open(constants_input_js, "r")

js_link = "<script src=constants.js></script>"
content = content.replace(js_link, "\n<script>" + constants_file.read() + "</script>")

constants_file.close()

## Header script

clean_js = subprocess.check_output(['yuicompressor', header_js])

js_link = "<script src=header.js></script>"
content = content.replace(js_link, "\n<script>" + clean_js.decode('utf-8') + "</script>\n")

## Footer script

clean_js = subprocess.check_output(['yuicompressor', footer_js])
js_link = "<script src=footer.js></script>"
content = content.replace(js_link, "\n<script>" + clean_js.decode('utf-8') + "</script>\n")

# Output content

output_file = open(output_path, "w")
output_file.write(content)

output_file.close()

print("Bundled " + source_folder + " into " + output_path)

input_html = os.stat(input_html).st_size
input_css = os.stat(input_css).st_size
header_js = os.stat(header_js).st_size
input_size = input_html + input_css + header_js
print("Input size: " + str(input_size) + "B")
output_size = os.stat(output_path).st_size
print("Output size: " + str(output_size) + "B")
compression_ratio = round((input_size - output_size) / input_size * 100, 1)
print("Compression: " + str(compression_ratio) + "%")
