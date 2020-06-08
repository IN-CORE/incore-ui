import math from "mathjs";
import { jStat } from "jstat";

export default class chartSampler {

	static computeExpressionSamples(min, max, numberOfSamples, expression) {
		let steps = ((max - min) / numberOfSamples);
		let parser = math.parser();
		let samples = [];

		for (let i = 1; i <= numberOfSamples; i++) {
			let x = steps * i;
			parser.set("x", x);
			let y = parser.eval(`${expression}`);
			samples.push([x, y]);
		}

		return samples;
	}

	static async computeExpressionSamples3d(minX, maxX, numberOfSamplesX, minY, maxY, numberOfSamplesY, expression) {
		let stepsX = ((maxX - minX) / numberOfSamplesX);
		let stepsY = ((maxY - minY) / numberOfSamplesY);

		let parser = math.parser();

		parser.eval(`f(x,y) = ${expression}`);

		let promises = [];

		for (let i = 1; i <= numberOfSamplesX; i++) {
			let x = stepsX * i;

			for (let j = 1; j <= numberOfSamplesY; j++) {
				let y = stepsY * j;

				promises.push(this.calculate(x, y, parser));
			}
		}

		let samples = await Promise.all(promises);

		return samples;
	}

	static async calculate(x, y, parser) {
		return new Promise(resolve => resolve([x, y, parser.eval(`f(${  x  }, ${  y  })`)]));
	}

	static sample(min, max, numberOfSamples, alphaType, alpha, beta){
		let samples = [];

		if (alphaType === "median"){
			samples = chartSampler.sampleLogNormalCdf(min, max, numberOfSamples, Math.log(alpha), beta);
		}
		else if (alphaType === "lambda"){
			samples = chartSampler.sampleLogNormalCdf(min, max, numberOfSamples, alpha, beta);
		}

		return samples;
	}

	static sampleConditional(min, max, numberOfSamples, alphaType, rules, alpha, beta){
		let samples = [];

		if (alphaType === "median"){
			samples = chartSampler.sampleLogNormalCdfConditional(min, max, numberOfSamples, rules, alpha.map(a => Math.log(a)), beta);
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
				if (eval(y.toString() + knownOperator[ruleOperator] + ruleValue)){
					samples.push([y, x]);
				}
			}
		}

		return samples;

	}
}
