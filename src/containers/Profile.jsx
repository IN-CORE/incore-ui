import {connect} from "react-redux";
import ProfileComponent from "../components/Profile";
import {fetchLabUsage, fetchUsage} from "../actions";

const mapStateToProps = (state) => {
	return {
		loginError: state.user.loginError,
		usage: state.usage.usage,
		labUsage: state.usage.labUsage,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getUsage: () => {
			dispatch(fetchUsage());
		},
		// TODO fetch lab usage is not actually being used yet
		getLabUsage:() =>{
			dispatch(fetchLabUsage());
		},
	};
};

const Profile = connect(mapStateToProps, mapDispatchToProps)(ProfileComponent);

export default Profile;
