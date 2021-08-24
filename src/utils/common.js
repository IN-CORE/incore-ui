import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import config from "../app.config";

const cookies = new Cookies();

/* place to hold common utility function. Gradually adding... */

export function is3dCurve(DFR3Curve) {
	if (DFR3Curve.demandTypes.length > 1) return true;
	else{
		// TODO once complete refactored those need to go away
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
// get user token
export function getCurrUserToken(){
	if (!config.hostname.includes("localhost")){
		let cookie = cookies.get("Authorization");
		return decodeURI(cookie);
	}
	return "";
}

// get current user's info from jwt token
export function getCurrUserInfo(){
	if (!config.hostname.includes("localhost")){
		let cookie = cookies.get("Authorization");
		if (cookie !== undefined && cookie !== "" && cookie.split(" ").length > 0){
			try{
				return jwt_decode(cookie.split(" ")[1]);
			}
			catch(err){
				console.log(err);
			}
		}
	}
	return {};
}

export function determineUserGroup(userInfo) {
	let group = "NA";
	if (userInfo !== {} && userInfo["groups"] !== undefined) {
		if (userInfo["groups"].indexOf("incore_ncsa") !== -1) {
			group = "incore_ncsa";
		} else if (userInfo["groups"].indexOf("incore_coe") !== -1) {
			group = "incore_coe";
		} else if (userInfo["groups"].indexOf("incore_user") !== -1) {
			group = "incore_user";
		}
	} else {
		// for localhost, default user is inctest hence default to incore_ncsa group
		group = "incore_ncsa";
	}

	return group;
}

// can be used to sort array of jsons alpbetically by a key
export function compareStrings(a, b) {
	// case-insensitive comparison
	a = a.toLowerCase();
	b = b.toLowerCase();

	return (a < b) ? -1 : (a > b) ? 1 : 0;
}
