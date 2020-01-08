#!/usr/bin/python3
import os, sys

count = 0
command = "openjscad"
if "linux" in sys.platform:
    command = "time /usr/local/lib/nodejs/bin/openjscad"

for file in os.listdir("."):
    if file.endswith(".jscad"):
        with open(file) as thing:
            first_line = thing.readline().strip()
            if "ignore" in first_line:
                continue
        print("Building ", file)
        outputname = file.replace(".jscad", ".stl")
        jscad_compile = os.system(f"{command} {file} -of stla")
        if jscad_compile != 0:
            print(f"Build failed on file {file}!")
            sys.exit(1)
        else:
            print("Build succeeded!")
            count += 1

print(f"Built {count} files successfully!")
sys.exit(0)