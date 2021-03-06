import {log, exp, parser} from "mathjs";
import { jStat } from "jstat";

export default class chartSampler {

	static computeExpressionSamples(min, max, numberOfSamples, expression) {
		let steps = ((max - min) / numberOfSamples);
		let mathParser = parser();
		let samples = [];

		for (let i = 1; i <= numberOfSamples; i++) {
			let x = steps * i;
			mathParser.set("x", x);
			let y = mathParser.evaluate(`${expression}`);
			samples.push([x, y]);
		}

		return samples;
	}

	static computeParametricSampes(min, max, numberOfSamples, curveType, parameters){
		let steps = ((max - min) / numberOfSamples);
		let samples = [];

		if (curveType.toLowerCase() === "logit"){
			for (let i = 1; i <= numberOfSamples; i++) {
				let A1 = 1; // coefficient for demand (X)
				let cumulateTerm = 0; // X * Theta'
				for (let j = 0; j< parameters.length; j++){
					let name = parameters[j]["name"].toLowerCase();
					let interceptTermDefault = parameters[j]["interceptTermDefault"];
					let coefficient = parameters[j]["coefficient"];

					if (name === "demand"){
						A1 = coefficient;
					}
					else{
						cumulateTerm += interceptTermDefault * coefficient;
					}
				}

				let y = steps * i;
				let x = exp((log(y/(1-y)) - cumulateTerm) / A1);
				samples.push([x, y]);
			}
		}
		// TODO: else if other curve type

		return samples;
	}

	static async computeExpressionSamples3d(minX, maxX, numberOfSamplesX, minY, maxY, numberOfSamplesY, expression) {
		let stepsX = ((maxX - minX) / numberOfSamplesX);
		let stepsY = ((maxY - minY) / numberOfSamplesY);

		let mathParser = parser();

		mathParser.evaluate(`f(x,y) = ${expression}`);

		let promises = [];

		for (let i = 1; i <= numberOfSamplesX; i++) {
			let x = stepsX * i;

			for (let j = 1; j <= numberOfSamplesY; j++) {
				let y = stepsY * j;

				promises.push(this.calculate(x, y, mathParser));
			}
		}

		let samples = await Promise.all(promises);

		return samples;
	}

	static async calculate(x, y, mathParser) {
		return new Promise(resolve => resolve([x, y, mathParser.evaluate(`f(${  x  }, ${  y  })`)]));
	}

	static sample(min, max, numberOfSamples, alphaType, alpha, beta){
		let samples = [];

		if (alphaType === "median"){
			samples = chartSampler.sampleLogNormalCdf(min, max, numberOfSamples, log(alpha), beta);
		}
		else if (alphaType === "lambda"){
			samples = chartSampler.sampleLogNormalCdf(min, max, numberOfSamples, alpha, beta);
		}

		return samples;
	}

	static sampleConditional(min, max, numberOfSamples, alphaType, rules, alpha, beta){
		let samples = [];

		if (alphaType === "median"){
			samples = chartSampler.sampleLogNormalCdfConditional(min, max, numberOfSamples, rules, alpha.map(a => log(a)), beta);
		}
		else if (alphaType === "lambda"){
			samples = chartSampler.sampleLogNormalCdfConditional(min, max, numberOfSamples, rules, alpha, beta);
		}

		return samples;
	}

	static sampleNormalCdf(min, max, numberOfSamples, mean, std) {
		let steps = ((max - min) / numberOfSamples);

		let samples = [];

		for (let i = 1; i <= numberOfSamples; i++) {
			let x = steps * i;

			let y = jStat.normal.inv(x, mean, std);

			samples.push([y, x]);
		}

		return samples;
	}

	static computePeriodBuildingSamples(min, max, numberOfSamples, a11_param, a12_param, a13_param, a14_param,
		a21_param, a22_param)
	{
		let cutoff_period = 0.87;
		let period = 0;
		let multiplier = cutoff_period - period;

		let steps = ((max - min) / numberOfSamples);
		let samples = [];
		for (let i = 1; i <= numberOfSamples; i++) {
			let hazard = steps * i;
			let y = jStat.normal.cdf(
				(log(hazard) - (cutoff_period * a12_param + a11_param)) / (a13_param + a14_param * cutoff_period)
				+ multiplier * (log(hazard) - a21_param) / a22_param, 0, 1);
			samples.push([hazard, y]);
		}

		return samples;
	}

	static sampleLogNormalCdf(min, max, numberOfSamples, mean, std) {
		let steps = ((max - min) / numberOfSamples);

		let samples = [];

		for (let i = 1; i <= numberOfSamples; i++) {
			let x = steps * i;

			let y = jStat.lognormal.inv(x, mean, std);

			samples.push([y, x]);
		}

		return samples;

	}

	static sampleLogNormalCdfConditional(min, max, numberOfSamples, rules, mean_arr, std_arr) {
		const knownOperator = {
			"EQ": "==",
			"EQUALS": "==",
			"NEQUALS": "!=",
			"GT": ">",
			"GE": ">=",
			"LT": "<",
			"LE": "<=",
		};

		let steps = ((max - min) / numberOfSamples);

		let samples = [];

		for (let key in Object.keys(rules)){

			let mean = mean_arr[parseInt(key)];
			let std = std_arr[parseInt(key)];
			let elements = rules[key][0].split(" ", 3);
			let ruleOperator = elements[1];
			let ruleValue = elements[2];
			if (!(ruleOperator in knownOperator)){
				// console.log( ruleOperator + " Unknown. Cannot parse the rules!");
				return samples;
			}

			for (let i = 1; i <= numberOfSamples; i++) {
				let x = steps * i;
				let y = jStat.lognormal.inv(x, mean, std);

				// if match the rules, put that dot in the curve; otherwise disgard
				if (eval(y.toString() + knownOperator[ruleOperator] + ruleValue)){
					samples.push([y, x]);
				}
			}
		}

		return samples;

	}
}
