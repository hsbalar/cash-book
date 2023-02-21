import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import { store } from "./src/states/store";
import Home from "./src/modules/Home";

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Home />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
