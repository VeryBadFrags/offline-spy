import os
import re
import htmlmin

input_path = "index.html"
output_folder = "release"
output_path = output_folder + "/" + input_path

input_size = os.stat(input_path).st_size
print("Input size: " + str(input_size) + "B")

if not os.path.exists(output_folder):
    os.makedirs(output_folder)

html_file = open(input_path, "r")
output_file = open(output_path, "w")

content = re.sub(r'  +', ' ', html_file.read())
content = htmlmin.minify(content, remove_comments=True, remove_empty_space=True)

output_file.write(content)

output_file.close()
html_file.close()

print("Minified " + input_path + " to " + output_path)

output_size = os.stat(output_path).st_size
print("Output size: " + str(output_size) + "B")
compression_ratio = round((input_size - output_size) / input_size * 100, 1);
print("Compression: " + str(compression_ratio) + "%")
