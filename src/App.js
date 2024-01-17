//App.js
import { Provider } from "react-redux";
import store from "./redux/store";

import "./App.css";
import ListCount from "./components/ListCount";
import Router from "./router/Router";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        {/* <ListCount /> */}

        <Router />
      </div>
    </Provider>
  );
}

export default App;
