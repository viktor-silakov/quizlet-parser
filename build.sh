#!/bin/bash

# Read the JavaScript code from a file
javascript_code=$(cat bookmarklet.js)

# Remove newlines and escape single quotes in the JavaScript code
javascript_code=${javascript_code//$'\n'/}
javascript_code=${javascript_code//\'/\\\'}

# Construct the bookmarklet URL by encoding the JavaScript code
bookmarklet_url="javascript:(function(){${javascript_code}})();"

# Output the bookmarklet URL
echo "Bookmarklet URL:"
echo "$bookmarklet_url" >> dist.txt
