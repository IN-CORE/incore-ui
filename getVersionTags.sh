#!/bin/sh

# get the latest version
pyincore=$(curl -s 'https://api.github.com/repos/IN-CORE/pyincore/tags' | jq '.[0].name' || echo '"NA"')
pyincoreViz=$(curl -s 'https://api.github.com/repos/IN-CORE/pyincore-viz/tags' | jq '.[0].name' || echo '"NA"')
incoreUI=$(curl -s 'https://api.github.com/repos/IN-CORE/incore-ui/tags' | jq '.[0].name' || echo '"NA"')
incoreServices=$(curl -s 'https://api.github.com/repos/IN-CORE/incore-services/tags' | jq '.[0].name' || echo '"NA"')
incoreLab=$(curl -s 'https://api.github.com/repos/IN-CORE/incore-lab/tags' | jq '.[0].name' || echo '"NA"')
inocreDocs=$(curl -s 'https://api.github.com/repos/IN-CORE/incore-docs/tags' | jq '.[0].name' || echo '"NA"')

echo {\"pyincore\":$pyincore, \"pyincore-viz\":$pyincoreViz, \"incore-ui\":$incoreUI, \"incore-services\":$incoreServices, \
\"incore-lab\":$incoreLab, \"incore-docs\":$inocreDocs} > github.json



