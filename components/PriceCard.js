import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PriceCard = ({ price, time, isUp }) => {
  return (
    <View style={[styles.card, { borderLeftColor: isUp ? "green" : "red" }]}>
      <Text style={styles.priceText}>₹ {price}</Text>
      <Text style={styles.timeText}>{time}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 4,
  },
  priceText: {
    fontSize: 18,
    fontWeight: "600",
  },
  timeText: {
    fontSize: 14,
    color: "#555",
  },
});

export default PriceCard;
