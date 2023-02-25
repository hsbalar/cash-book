import { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  StatusBar,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchRows } from "../states/sheet";

export default function Home() {
  const dispatch = useDispatch();
  const { rows, loading } = useSelector((state) => state.sheet);

  useEffect(() => {
    dispatch(fetchRows());
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={rows}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item: { remark, balance, total } }) => (
          <View
            style={[
              styles.row,
              {
                flexDirection: "row",
              },
            ]}
          >
            <View style={{ flex: 3 }}>
              <Text>{remark}</Text>
            </View>
            <View style={{ flex: 2 }}>
              <Text style={balance > 0 ? styles.credit : styles.debit}>
                {balance}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text>{total}</Text>
            </View>
          </View>
        )}
        renderSectionHeader={({ section: { date } }) => (
          <Text style={styles.sectionHeader}>{date}</Text>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    padding: 8,
  },
  container: {
    flex: 1,
    paddingTop: 22,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: "bold",
    backgroundColor: "rgba(247,247,247,1.0)",
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  credit: {
    color: "green",
  },
  debit: {
    color: "red",
  },
});
