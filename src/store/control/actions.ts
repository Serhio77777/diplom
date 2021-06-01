import { action } from 'typesafe-actions';
// import { Scene } from 'three';

import { ControlActionTypes, ICurrentModel } from './types';

export const setModel = (model: ICurrentModel) =>
	action(ControlActionTypes.SET_MODEL, { model });

// export const success = (data: any) => action(ControlActionTypes.REQUEST_SUCCEEDED, { data });
// export const failure = (error: any) => action(ControlActionTypes.REQUEST_FAILURE, { error });
