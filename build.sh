#!/bin/bash

echo -e "\033[0;32mBuilding site...\033[0m"

#delete previous build
echo -e "\033[0;32mDelete previous build...\033[0m"
rm -rf docs
#find ../design-system-site -not -name '.*' ! -path '../design-system-site/.*' -delete

#build Site
hugo
