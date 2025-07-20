import React, { useEffect, useState } from "react";
import { SafeAreaView, FlatList, StyleSheet, Text } from "react-native";
 import PriceCard from "./components/PriceCard";
const App = () => {
  const [priceList, setPriceList] = useState([]);
  let previousPrice = null;

  useEffect(() => {
    const ws = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@trade");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const currentPrice = parseFloat(data.p).toFixed(2);
      const currentTime = new Date(data.T).toLocaleTimeString();

      const priceWentUp =
        previousPrice && parseFloat(currentPrice) > parseFloat(previousPrice);

      previousPrice = currentPrice;

      const priceObject = {
        id: data.t,
        price: currentPrice,
        time: currentTime,
        isUp: priceWentUp,
      };

      setPriceList((prev) => [priceObject, ...prev.slice(0, 19)]);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>BTC/USDT Live Price</Text>
      <FlatList
        data={priceList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PriceCard price={item.price} time={item.time} isUp={item.isUp} />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
  },
});

export default App;
