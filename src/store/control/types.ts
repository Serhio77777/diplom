export interface IModel {
  label: string;
  value: string;
}

export interface ICurrentModel {
  name: string;
  path: string;
}

export interface IControlState {
  currentModel: ICurrentModel;
  modelList: Array<IModel>;
  error: string; // object
}

export enum ControlActionTypes {
  SET_MODEL = '@@control/SET_MODEL',
  // REQUEST_SUCCEEDED = '@@control/REQUEST_SUCCEEDED',
  // REQUEST_FAILURE = '@@control/REQUEST_FAILURE'
}

