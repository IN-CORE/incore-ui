import { connect } from "react-redux";
import ProfileComponent from "../components/Profile";
import { fetchLabUsage, fetchUsage, fetchAllocations } from "../actions";

const mapStateToProps = (state) => {
	return {
		loginError: state.user.loginError,
		usage: state.usage.usage,
		labUsage: state.usage.labUsage,
		allocations: state.usage.allocations
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getUsage: () => {
			dispatch(fetchUsage());
		},
		getAllocations: () => {
			dispatch(fetchAllocations());
		},
		// TODO fetch lab usage is not actually being used yet
		getLabUsage: () => {
			dispatch(fetchLabUsage());
		}
	};
};

const Profile = connect(mapStateToProps, mapDispatchToProps)(ProfileComponent);

export default Profile;
