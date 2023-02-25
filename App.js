import { Provider } from "react-redux";
import { store } from "./src/states/store";
import Home from "./src/modules/Home";

export default function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}
