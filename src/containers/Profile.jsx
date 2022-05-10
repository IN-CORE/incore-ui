import {connect} from "react-redux";
import ProfileComponent from "../components/Profile";

const mapStateToProps = (state) => {
	return {
		loginError: state.user.loginError,
		datasetUsage: state.usage.datasetUsage,
		hazardUsage: state.usage.hazardUsage,
		labUsage: state.usage.labUsage,
		allocation: state.usage.allocations,
	};
};

const Profile = connect(mapStateToProps, null)(ProfileComponent);

export default Profile;
