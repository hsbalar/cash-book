import { useEffect } from "react";
import { Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchRows } from "../states/sheet";

export default function Home() {
  const dispatch = useDispatch();
  const { rows, loading } = useSelector((state) => state.sheet);

  useEffect(() => {
    dispatch(fetchRows());
  }, []);
  console.log(rows);
  return (
    <>
      <Text>Open up App.js to start working on your app! wohho </Text>
    </>
  );
}
