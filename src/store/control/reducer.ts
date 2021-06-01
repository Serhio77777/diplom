import { Reducer } from 'redux';
import { ControlActionTypes, IControlState } from './types';

const initialState: IControlState = {
	currentModel: {
		name: 'chair',
		path: 'images/chair.glb'
	},
	modelList: [
		{ value: 'images/chair.glb', label: 'Chair' },
		{ value: 'images/computer_table.glb', label: 'Computer Table' },
		{ value: 'images/round_table.glb', label: 'Round Table' },
		{ value: 'images/shelve.glb', label: 'Shelve' }
	],
	error: ''
};

const reducer: Reducer<IControlState> = (state = initialState, action) => {
	switch (action.type) {
	case ControlActionTypes.SET_MODEL:
		return {
			...state,
			...{ currentModel: action.payload.model }
		};
		break;

	default:
		return state;
	}
};

export { reducer as controlReducer };
