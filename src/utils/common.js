/* place to hold common utility function. Gradually adding... */

export function is3dCurve(DFR3Curve) {
	let curves;
	if ("fragilityCurves" in DFR3Curve) {
		curves = DFR3Curve.fragilityCurves;
	}
	else if ("repairCurves" in DFR3Curve) {
		curves = DFR3Curve.repairCurves;
	}
	else if ("restorationCurves" in DFR3Curve) {
		curves = DFR3Curve.restorationCurves;
	}
	else{
		curves = [];
	}

	for (let i = 0; i < curves.length; i++) {
		let curve = curves[i];

		if (curve.className.includes("CustomExpression") && curve.expression.includes("y")) {
			return true;
		}
	}

	return false;
}

export function exportJson(json) {
	let curveJSON = JSON.stringify(json, null, 4);
	let blob = new Blob([curveJSON], {type: "application/json"});

	const filename = `${json.id}.json`;

	if (window.navigator.msSaveOrOpenBlob) {
		window.navigator.msSaveBlob(blob, filename);
	} else {
		let anchor = window.document.createElement("a");
		anchor.href = window.URL.createObjectURL(blob);
		anchor.download = filename;
		document.body.appendChild(anchor);
		anchor.click();
		document.body.removeChild(anchor);
	}
}
