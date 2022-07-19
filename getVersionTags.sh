#!/bin/sh

# get the latest version
pyincore=$(curl -s 'https://api.github.com/repos/IN-CORE/pyincore/releases/latest' | jq '.tag_name')
pyincoreViz=$(curl -s 'https://api.github.com/repos/IN-CORE/pyincore-viz/releases/latest' | jq '.tag_name')
pyincoreData=$(curl -s 'https://api.github.com/repos/IN-CORE/pyincore-data/releases/latest' | jq '.tag_name')
incoreUI=$(curl -s 'https://api.github.com/repos/IN-CORE/incore-ui/releases/latest' | jq '.tag_name')
incoreServices=$(curl -s 'https://api.github.com/repos/IN-CORE/incore-services/releases/latest' | jq '.tag_name')
incoreLab=$(curl -s 'https://api.github.com/repos/IN-CORE/incore-lab/releases/latest' | jq '.tag_name')
incoreDocs=$(curl -s 'https://api.github.com/repos/IN-CORE/incore-docs/releases/latest' | jq '.tag_name')

if [ -z "$pyincore" ] || [ -z "$pyincoreViz" ] || [ -z "$incoreUI" ] || [ -z "$incoreServices" ] || [ -z "$incoreLab" ] || [ -z "$incoreDocs" ]
then
	echo "Abort. Failed to get the latest tag from github."
else
	echo {\"pyincore\":$pyincore, \"pyincore-viz\":$pyincoreViz, \"pyincore-data\":$pyincoreData, \"incore-ui\":$incoreUI, \"incore-services\":$incoreServices, \
\"incore-lab\":$incoreLab, \"incore-docs\":$incoreDocs} > /usr/share/nginx/html/tags/github.json
fi



