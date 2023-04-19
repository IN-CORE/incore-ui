#!/bin/sh

# get the latest version
tags=$(curl -s 'https://api.github.com/repos/IN-CORE/IN-CORE/contents/tags.json' | jq -r ".content" | base64 --decode)

if [ -z "$tags" ]
then
	echo "Abort. Failed to get the latest tag from github."
else
	echo $tags > /usr/share/nginx/html/tags/github.json
fi



