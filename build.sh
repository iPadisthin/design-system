#!/bin/bash

echo -e "\033[0;32mBuilding site...\033[0m"

#delete previous build
rm -rf docs

#build Site
hugo
