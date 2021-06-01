export interface IModel {
  label: string;
  value: string;
  elements: any[]
}

export interface ICurrentModel {
  name: string;
  path: string;
  elements: any[]
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

