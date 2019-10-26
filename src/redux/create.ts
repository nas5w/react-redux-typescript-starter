import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import widgetReducer, { WidgetAction } from "./modules/widgets";
import { StateType } from "typesafe-actions";

const rootReducer = combineReducers({
  widgets: widgetReducer
});

export const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export type RootAction = WidgetAction;
export type Store = StateType<typeof store>;
export type RootState = StateType<ReturnType<typeof rootReducer>>;
