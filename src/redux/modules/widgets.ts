import { action, Action } from "typesafe-actions";
import { Dispatch } from "react";

// Actions
enum WidgetActionType {
  LOAD = "my-app/widgets/LOAD",
  CREATE = "my-app/widgets/CREATE",
  UPDATE = "my-app/widgets/UPDATE",
  REMOVE = "my-app/widgets/REMOVE"
}

export const startWidgetLoad = () => {
  return (dispatch: Dispatch<Action>): Promise<void> =>
    new Promise(() => {
      setTimeout(() => {
        dispatch(loadWidgets());
      }, 1000);
    });
};
export const loadWidgets = () => action(WidgetActionType.LOAD);
export const createWidget = (name: string) =>
  action(WidgetActionType.CREATE, name);
export const updateWidget = (widget: string, newWidget: string) =>
  action(WidgetActionType.UPDATE, { widget, newWidget });
export const removeWidget = (name: string) =>
  action(WidgetActionType.REMOVE, name);

export type WidgetAction = ReturnType<
  | typeof loadWidgets
  | typeof createWidget
  | typeof updateWidget
  | typeof removeWidget
>;

// Initial state
export type WidgetState = {
  readonly widgets: ReadonlyArray<string>;
};

export const initialState: WidgetState = {
  widgets: []
};

// Reducer
export default function reducer(
  state = initialState,
  action: WidgetAction
): WidgetState {
  switch (action.type) {
    case WidgetActionType.LOAD:
      return {
        widgets: ["Widget 1", "Widget 2", "Widget 3"]
      };
    case WidgetActionType.CREATE:
      return {
        widgets: [...state.widgets, action.payload]
      };
    case WidgetActionType.UPDATE:
      const newWidgets = state.widgets.map(widget => {
        if (widget === action.payload.widget) {
          return action.payload.newWidget;
        }
        return widget;
      });
      return {
        widgets: newWidgets
      };
    case WidgetActionType.REMOVE:
      return {
        widgets: state.widgets.filter(widget => widget !== action.payload)
      };
    default:
      return state;
  }
}
