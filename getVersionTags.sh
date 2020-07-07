#!/bin/sh

# get the latest version
pyincore=$(curl -s 'https://api.github.com/repos/IN-CORE/pyincore/tags' | jq '.[0].name')
pyincoreViz=$(curl -s 'https://api.github.com/repos/IN-CORE/pyincore-viz/tags' | jq '.[0].name')
incoreUI=$(curl -s 'https://api.github.com/repos/IN-CORE/incore-ui/tags' | jq '.[0].name')
incoreServices=$(curl -s 'https://api.github.com/repos/IN-CORE/incore-services/tags' | jq '.[0].name')
incoreLab=$(curl -s 'https://api.github.com/repos/IN-CORE/incore-lab/tags' | jq '.[0].name')
incoreDocs=$(curl -s 'https://api.github.com/repos/IN-CORE/incore-docs/tags' | jq '.[0].name')

if [[ -z "$pyincore" || -z "$pyincoreViz" || -z "$incoreUI" || -z "$incoreServices" || -z "$incoreLab" || -z "$incoreDocs" ]]
then
	echo "Abort. Failed to get the latest tag from github."
else
	echo {\"pyincore\":$pyincore, \"pyincore-viz\":$pyincoreViz, \"incore-ui\":$incoreUI, \"incore-services\":$incoreServices, \
\"incore-lab\":$incoreLab, \"incore-docs\":$incoreDocs} > github.json
fi



