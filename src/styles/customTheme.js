import {cyan500, fullBlack, grey300} from "@material-ui/styles/colors";
import {fade} from "@material-ui/utils/colorManipulator";
import {spacing} from "@material-ui/styles/spacing";

export default {
	fontFamily: "Roboto, sans-serif",
	borderRadius: 5,
	textField:{
		padding:24,
		height:48,
		dataHeight:32
	},
	palette: {
		spacing: spacing,
		primary1Color: "#18381b",
		primary2Color: "#333333",
		primary3Color: "#e8a114",
		accent1Color: "#e8a114",
		textColor: "#333333",
		alternateTextColor: "#e8a114",
		borderColor: grey300,
		disabledColor: fade("#333333", 0.3),
		pickerHeaderColor: cyan500,
		clockCircleColor: fade("#333333", 0.07),
		shadowColor: fullBlack,
	},
};
