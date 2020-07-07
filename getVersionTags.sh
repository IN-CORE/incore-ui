# get the latest version
pyincore=`curl -s 'https://api.github.com/repos/IN-CORE/pyincore/tags' | jq '.[0].name'`
pyincoreViz=`curl -s 'https://api.github.com/repos/IN-CORE/pyincore-viz/tags' | jq '.[0].name'`
incoreUI=`curl -s 'https://api.github.com/repos/IN-CORE/incore-ui/tags' | jq '.[0].name'`
incoreServices=`curl -s 'https://api.github.com/repos/IN-CORE/incore-services/tags' | jq '.[0].name'`
incoreLab=`curl -s 'https://api.github.com/repos/IN-CORE/incore-lab/tags' | jq '.[0].name'`
inocreDocs=`curl -s 'https://api.github.com/repos/IN-CORE/incore-docs/tags' | jq '.[0].name'`

echo {\"pyincore\":$pyincore, \"pyincore-viz\":$pyincoreViz, \"incore-ui\":$incoreUI, \"incore-services\":$incoreServices, \
\"incore-lab\":$incoreLab, \"incore-docs\":$inocreDocs} > github.json



