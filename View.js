//View.js//

const api = window.ModuleApi;
const ScripturePane = require("./ScripturePane");
const React = api.React;

class View extends React.Component {

  render() {
    return (
      <ScripturePane />
    );
  }
}

module.exports = {
  name: "ScripturePane",
  view: View
}
