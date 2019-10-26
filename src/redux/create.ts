import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import widgetReducer, { WidgetAction } from "./modules/widgets";
import { StateType } from "typesafe-actions";

const rootReducer = combineReducers({
  widgets: widgetReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootAction = WidgetAction;
export type Store = StateType<typeof store>;
export type RootState = StateType<ReturnType<typeof rootReducer>>;
