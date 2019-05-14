#!/bin/bash

echo -e "\033[0;32mStarting sass watch and hugo server...\033[0m"

sass --watch --no-source-map static/ltucss/sass:static/ltucss/css & hugo server --disableFastRender && fg
