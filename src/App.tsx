import React, { useEffect, useState } from "react";
import { RootState, RootAction } from "./redux/create";
import {
  removeWidget,
  createWidget,
  updateWidget,
  startWidgetLoad
} from "./redux/modules/widgets";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

const mapStateToProps = (state: RootState) => ({
  widgets: state.widgets.widgets
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(
    {
      startWidgetLoad,
      removeWidget,
      createWidget,
      updateWidget
    },
    dispatch
  );

type AppProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const App: React.FC<AppProps> = ({
  widgets,
  startWidgetLoad,
  removeWidget,
  createWidget,
  updateWidget
}) => {
  const [newWidgetName, setNewWidgetName] = useState("");
  const [selectedWidget, setSelectedWidget] = useState<typeof widgets[0]>(
    widgets[0]
  );
  const [formMode, setFormMode] = useState<"create" | "edit">("create");

  useEffect(() => {
    startWidgetLoad();
  }, [startWidgetLoad]);

  return (
    <React.Fragment>
      <h1>Widgets:</h1>
      <ul>
        {widgets.map(widget => (
          <li key={widget}>
            {widget}{" "}
            <button
              onClick={() => {
                setFormMode("edit");
                setSelectedWidget(widget);
                setNewWidgetName(widget);
              }}
            >
              Edit Widget
            </button>
            <button
              onClick={() => {
                removeWidget(widget);
                setFormMode("create");
              }}
            >
              Remove Widget
            </button>
          </li>
        ))}
      </ul>
      <form>
        <h3>
          {formMode === "create"
            ? "Create Widget:"
            : `Edit Widget "${selectedWidget}":`}
        </h3>
        <input
          type="textbox"
          value={newWidgetName}
          onChange={e => setNewWidgetName(e.target.value)}
        />
        <button
          onClick={e => {
            if (formMode === "create") {
              createWidget(newWidgetName);
            } else {
              updateWidget(selectedWidget, newWidgetName);
              setFormMode("create");
            }
            setNewWidgetName("");
            e.preventDefault();
          }}
        >
          {formMode === "create" ? "+ Create" : "Update"} Widget
        </button>
      </form>
    </React.Fragment>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
