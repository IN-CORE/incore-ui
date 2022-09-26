interface AnalysisInput {
	id: string;
	name: string;
	description: string;
	required: boolean;
	advanced: boolean;
	multiple: boolean;
	type: string;
}

interface AnalysisOutput {
	name: string;
	type: string;
	description: string;
}

interface AnalysisParameter {
	id: string;
	name: string;
	description: string;
	required: boolean;
	advanced: boolean;
	multiple: boolean;
	type: string;
}

interface Analysis {
	id: string;
	description: string;
	name: string;
	category: string;
	helpContext: string;
	tag: string;
	datasets: AnalysisInput[];
	outputs: AnalysisOutput[];
	parameter: AnalysisParameter[];
}

type Analyses = Analysis[];

interface AnalysisMetadata {
	id: string;
	description: string;
	name: string;
	category: string;
	helpContext: string;
}

type AnalysesMetadata = AnalysisMetadata[];

interface FileDescriptor {
	id: string;
	deleted: boolean;
	filename: string;
	mimeType: string;
	size: number;
	dataURL: string;
	md5sum: string;
}

interface Dataset {
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
}

/* Earthquakes */
interface HazardDataset {
	hazardType: string;
	datasetId: string;
	demandType: string;
	demandUnits: string;
	period: number;
	recurrenceInterval: number;
	recurrenceUnit: string;
	absTime: Date;
}

interface EqParameters {
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
}

interface Privileges {
	userPrivileges: Object;
	groupPrivileges: Object;
}

interface VisualizationParameters {
	demandType: string;
	demandUnits: string;
	minX: number;
	minY: number;
	maxX: number;
	maxY: number;
	numPoints: number;
	amplifyHazard: boolean;
}

interface RasterDataset {
	hazardType: string;
	datasetId: string;
	demandType: string;
	demandUnits: string;
	period: number;
	eqParameters: EqParameters;
}

interface DeterministicEarthquake {
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
}

interface ProbabilisticEarthquake {
	eqType: string;
	id: string;
	privileges: Privileges;
	name: string;
	description: string;
	hazardDatasets: HazardDataset[];
}

type Earthquake = DeterministicEarthquake | ProbabilisticEarthquake;

/* Tornado */
interface TornadoParameters {
	efRating: string;
	maxWindSpeed: number;
	startLatitude: number;
	startLongitude: number;
	randomSeed: number;
	windSpeedMethod: number;
	numSimulations: number;
	endLatitude: number[];
	endLongitude: number[];
}

interface EfBox {
	efBoxWidths: number[];
}

interface Tornado {
	id: string;
	tornadoModel: string;
	tornadoParameters: TornadoParameters;
	tornadoWidth: number[];
	efBoxes: EfBox[];
	tornadoDatasetId: string;
	privileges: Privileges;
}

/* Hurricane */
interface Hurricane {
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
}

type Hazards = Earthquake[] | Tornado[] | Hurricane[];

type Datasets = Dataset[];

/* DFR3 */
interface DFR3Curve2D {
	className: string;
	description: string;
	alpha: number;
	beta: number;
	curveType: string;
	periodParam2: number;
	periodParam1: number;
	periodParam0: number;
	periodEqnType: number;
}

interface DFR3Curve3D {
	className: string;
	description: string;
	expression: string;
}

interface DFR3Curve {
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
}

type DFR3Curves = DFR3Curve[];

interface DFR3Mappings {
	id: string;
	name: string;
	authors: string[];
	hazardType: string;
	inventoryType: string;
	mappings: Object[];
	mappingType: string;
}

/* States */
interface AnalysesState {
	analysisMetadata: AnalysesMetadata;
}

interface HazardState {
	hazards: Hazards;
}

interface DFR3CurvesState {
	DFR3Curves: DFR3Curves;
}

interface DFR3MappingsState {
	DFR3Mappings: DFR3Mappings;
}

interface DatasetState {
	datasets: Dataset[];
}

interface ExecutionState {
	executionId: string;
}

interface GetState {
	(): Object;
}

interface UserState {
	Authorization: string;
	loginError: boolean;
	loginSuccess: boolean;
}
