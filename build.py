#!/usr/bin/python3
import os, sys

count = 1

for file in os.listdir("."):
    if file.endswith(".scad"):
        print("Building ", file)
        outputname = file.replace(".scad", ".stl")
        scad_compile = os.system(f"openscad --headless {file} --output {outputname}")
        if scad_compile != 0:
            print(f"Build failed on file {file}!")
            sys.exit(1)
        else:
            print("Build succeeded!")
            count += 1

print(f"Built {count} files successfully!")
sys.exit(0)