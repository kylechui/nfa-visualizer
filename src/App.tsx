import React from "react";
import "./App.css";
import { ForceGraph2D } from "react-force-graph";
import useApp from "./App.hook";

function App() {
  const {
    states,
    transitions,
    userStatus,
    addState,
    addTransition,
    handleUserStatus,
  } = useApp();
  return (
    <div className="App">
      <header className="App-header">
        <ForceGraph2D
          graphData={{
            nodes: states,
            links: transitions,
          }}
          nodeLabel="id"
          nodeCanvasObjectMode={() => "after"}
          nodeCanvasObject={(node, ctx) => {
            const fontSize = 6;
            ctx.font = `${fontSize}px Sans-Serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "black";
            ctx.fillText(node.id, node.x ?? 0, node.y ?? 0);
          }}
          linkDirectionalArrowLength={3.5}
          linkDirectionalArrowRelPos={1}
          onBackgroundClick={() => {
            if (userStatus._tag === "default") {
              addState({ id: states.length.toString() });
            }
            handleUserStatus({ _tag: "default" });
          }}
          onNodeClick={({ id }) => {
            switch (userStatus._tag) {
              case "default":
                handleUserStatus({ _tag: "adding", state: { id } });
                break;
              case "adding":
                addTransition({ source: userStatus.state.id, target: id });
                handleUserStatus({ _tag: "default" });
                break;
            }
          }}
        />
      </header>
    </div>
  );
}

export default App;
