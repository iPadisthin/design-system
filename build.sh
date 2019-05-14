#!/bin/bash

#delete previous build
echo -e "\033[0;32mDelete previous build...\033[0m"
rm -rf docs
#find ../design-system-site -not -name '.*' ! -path '../design-system-site/.*' -delete

#compile css for website
echo -e "\033[0;32mCompile sass...\033[0m"
sass --no-source-map static/ltucss/sass:static/ltucss/css

#build Site
echo -e "\033[0;32mBuilding site...\033[0m"
hugo
