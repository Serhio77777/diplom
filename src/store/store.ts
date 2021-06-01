import { createStore, applyMiddleware, combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { stringify, parse } from 'flatted';
import storage from 'redux-persist/lib/storage'; 
import { persistStore, persistCombineReducers, createTransform } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import { controlReducer } from './control/reducer';

export const transformCircular = createTransform(
	(inboundState: any, key: any) => stringify(inboundState),
	(outboundState: any, key: any) => parse(outboundState),
);
const persistConfig = {
	key: 'root',
	blacklist: ['routing'],
	storage,
	stateReconciler: autoMergeLevel2,
	transforms: [transformCircular]
};

const rootReducer = persistCombineReducers(persistConfig, {
	control: controlReducer,
	routing: routerReducer
});
const store = createStore(
	rootReducer
);

persistStore(store);

export default store;