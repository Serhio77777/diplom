import { Reducer } from 'redux';
import { ControlActionTypes, IControlState } from './types';

const initialState: IControlState = {
	currentModel: {
		name: 'Chair',
		path: 'images/chair.glb',
		elements: [{ name: 'legs' }, { name: 'cushions' }, { name: 'base' }, { name: 'supports' }, { name: 'back' }],
		rotate: Math.PI
	},
	modelList: [
		{
			value: 'images/chair.glb',
			label: 'Chair',
			elements: [{ name: 'legs' }, { name: 'cushions' }, { name: 'base' }, { name: 'supports' }, { name: 'back' }],
			rotate: Math.PI
		},
		{
			value: 'images/computer_table.glb',
			label: 'Computer Table',
			elements: [{ name: 'table' }]
		},
		{
			value: 'images/round_table.glb',
			label: 'Round Table',
			elements: [{ name: 'leg' }]
		},
		{
			value: 'images/shelve.glb',
			label: 'Shelve',
			elements: [{ name: 'shelve' }]
		},
		{
			value: 'images/sofa.glb',
			label: 'Sofa',
			elements: [{ name: 'back' }, { name: 'back' }, { name: 'back_cushion' }, { name: 'seat' }, { name: 'seat_bottom' }, { name: 'sidewall' }],
			rotate: -Math.PI / 2
		}
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
