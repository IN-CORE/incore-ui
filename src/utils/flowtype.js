export type Dispatch = (action: any) => null;

export type AnalysisInput = {
	id: string;
	name: string;
	description: string;
	required: boolean;
	advanced: boolean;
	multiple: boolean;
	type: string;
};

export type AnalysisOutput = {
	name: string;
	type: string;
	description: string;
};

export type AnalysisParameter = {
	id: string;
	name: string;
	description: string;
	required: boolean;
	advanced: boolean;
	multiple: boolean;
	type: string;
};

export type Analysis = {
	id: string;
	description: string;
	name: string;
	category: string;
	helpContext: string;
	tag: string;
	datasets: AnalysisInput[];
	outputs: AnalysisOutput[];
	parameter: AnalysisParameter[];
};

export type Analyses = Analysis[];

export type AnalysisMetadata = {
	id: string;
	description: string;
	name: string;
	category: string;
	helpContext: string;
};

export type AnalysesMetadata = AnalysisMetadata[];

export type AnalysesState = {
	analysisMetadata: AnalysesMetadata;
};

export type FileDescriptor = {
	id: string;
	deleted: boolean;
	filename: string;
	mimeType: string;
	size: number;
	dataURL: string;
	md5sum: string;
};

// Semantic types
export type SemanticId = {
	timestamp: number;
	date: number;
};
export type SemanticContext = {
	"@language": string;
	"gml": string;
	"iwfs": string;
	"xlink": string;
	"xsd": string;
	"qudt": string;
	"unit": string;
	"openvocab": string;

}

export type SemanticColumn = {
	name: string;
	titles: string;
	"dc:description": string;
	datatype: string;
	required: string;
	"qudt:unit": string;
}

export type Semantic = {
	_id: SemanticId;
	"@context": (string | SemanticContext)[];
	"dc:license": {
		"@id": string;
	};
	"dc:title": string;
	"dc:description": string;
	url: string;
	"openvocab:versionnumber": string;
	tableSchema: {
		columns: SemanticColumn[];
	}
};

export type Semantics = Semantic[];

export type SemanticState = {
	semantics: Semantics;
};

export type Dataset = {
	id: string;
	deleted: boolean;
	title: string;
	description: string;
	date: Date;
	fileDescriptors: FileDescriptor[];
	contributors: string[];
	creator: string;
	type: string;
	storedUrl: string;
	format: string;
	sourceDataset: string;
	spaces: string[];
};

/* Earthquakes */
export type HazardDataset = {
	hazardType: string;
	datasetId: string;
	demandType: string;
	demandUnits: string;
	period: number;
	recurrenceInterval: number;
	recurrenceUnit: string;
	absTime: Date;
};

export type EqParameters = {
	srcLatitude: Number;
	srcLongitude: Number;
	magnitude: Number;
	coseismicRuptureDepth: Number;
	dipAngle: Number;
	azimuthAngle: Number;
	rakeAngle: Number;
	seismogenicDepth: Number;
	depth: Number;
	depth2p5KmPerSecShearWaveVelocity: Number;
	shearWaveDepth1p0: Number;
	faultTypeMap: Object;
	region: string;
};

export type Privileges = {
	userPrivileges: Object;
	groupPrivileges: Object;
};

export type VisualizationParameters = {
	demandType: string;
	demandUnits: string;
	minX: number;
	minY: number;
	maxX: number;
	maxY: number;
	numPoints: number;
	amplifyHazard: boolean;
};

export type RasterDataset = {
	hazardType: string;
	datasetId: string;
	demandType: string;
	demandUnits: string;
	period: number;
	eqParameters: EqParameters;
};

export type DeterministicEarthquake = {
	eqType: string;
	id: string;
	privileges: Privileges;
	name: string;
	description: string;
	attenuations: Object;
	eqParameters: EqParameters;
	visualizationParameters: VisualizationParameters;
	defaultSiteClass: string;
	siteAmplicfication: string;
	rasterDataset: RasterDataset;
};

export type ProbabilisticEarthquake = {
	eqType: string;
	id: string;
	privileges: Privileges;
	name: string;
	description: string;
	hazardDatasets: HazardDataset[];
};

export type Earthquake = DeterministicEarthquake | ProbabilisticEarthquake;

/* Tornado */
export type TornadoParameters = {
	efRating: string;
	maxWindSpeed: number;
	startLatitude: number;
	startLongitude: number;
	randomSeed: number;
	windSpeedMethod: number;
	numSimulations: number;
	endLatitude: number[];
	endLongitude: number[];
};

export type EfBox = {
	efBoxWidths: number[];
};

export type Tornado = {
	id: string;
	tornadoModel: string;
	tornadoParameters: TornadoParameters;
	tornadoWidth: number[];
	efBoxes: EfBox[];
	tornadoDatasetId: string;
	privileges: Privileges;
};

/* Hurricane */
export type Hurricane = {
	id: string;
	privileges: Privileges;
	name: string;
	description: string;
	gridResolution: number;
	gridResolutionUnits: string;
	rasterResolution: number;
	rasterResolutionUnits: string;
	transD: number;
	transDUnits: string;
	landfallLocation: string;
	modelUsed: string;
	coast: string;
	category: number;
	velocityUnits: string;
	gridPoints: number;
	rfMethod: string;
	times: Date[];
	hazardDatasets: HazardDataset[];
};

export type Hazards = Earthquake[] | Tornado[] | Hurricane[];

export type HazardState = {
	hazards: Hazards;
};

export type Datasets = Dataset[];

/* DFR3 */
export type DFR3Curve2D = {
	className: string;
	description: name;
	alpha: number;
	beta: number;
	curveType: string;
	periodParam2: number;
	periodParam1: number;
	periodParam0: number;
	periodEqnType: number;
};

export type DFR3Curve3D = {
	className: string;
	description: name;
	expression: string;
};

export type DFR3Curve = {
	id: string;
	legacyId: string;
	description: string;
	authors: string[];
	paperReference: string;
	resultUnit: string;
	resultType: string;
	demandTypes: string[];
	demandUnits: string[];
	hazardType: string;
	inventoryType: string;
	fragilityCurves: DFR3Curve2D[] | DFR3Curve3D[];
	privileges: Privileges;
	creator: string;
};

export type DFR3Curves = DFR3Curve[];

export type DFR3CurvesState = {
	DFR3Curves: DFR3Curves;
};

export type DFR3Mappings = {
	id: string;
	name: string;
	authors: string[];
	hazardType: string;
	inventoryType: string;
	mappings: Object[];
	mappingType: string;
};

export type DFR3MappingsState = {
	DFR3Mappings: DFR3Mappings;
};

/* Dataset */
export type DatasetState = {
	datasets: Dataset[];
};

export type ExecutionState = {
	executionId: string;
};

export type GetState = () => Object;

export type UserState = {
	Authorization: string;
	loginError: boolean;
};
