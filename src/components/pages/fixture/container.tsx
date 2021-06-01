import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IControlState, ICurrentModel } from '../../../store/control/types';
import Fixture, { IDispatchProps, IProps } from './index';
import * as ControlActions from '../../../store/control/actions';

const mapStateToProps = (state: { control: IControlState }): IProps => {
	return {
		currentModel: state.control.currentModel,
		modelList: state.control.modelList
	};
};

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
	setModel(model: ICurrentModel) {
		dispatch(ControlActions.setModel(model));
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Fixture);
