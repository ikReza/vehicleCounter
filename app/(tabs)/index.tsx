import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions
} from "react-native";

const { width } = Dimensions.get('window');
const buttonWidth = width / 2.5;
const buttonHeight = width / 4.5;

const VehicleCounter: React.FC = () => {
  const vehicleTypes: { name: string; icon: string }[] = [
    { name: "Rickshaw", icon: "🦽" },
    { name: "Bicycle", icon: "🚲" },
    { name: "Motorcycle", icon: "🏍" },
    { name: "CNG", icon: "🛺" },
    { name: "Bus", icon: "🚌" },
    { name: "Car", icon: "🚗" },
    { name: "Microbus", icon: "🚐" },
    { name: "Truck", icon: "🚚" },
  ];

  const [counts, setCounts] = useState<Record<string, number>>(
    vehicleTypes.reduce((acc, type) => ({ ...acc, [type.name]: 0 }), {})
  );

  const incrementCount = (type: string) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [type]: prevCounts[type] + 1,
    }));
  };

  const resetCounts = () => {
    setCounts(
      vehicleTypes.reduce((acc, type) => ({ ...acc, [type.name]: 0 }), {})
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vehicle Counter</Text>
      <FlatList
        data={vehicleTypes}
        keyExtractor={(item) => item.name}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.button}
            onPress={() => incrementCount(item.name)}
          >
            <Text style={styles.iconText}>{`${item.icon} ${item.name}`}</Text>
            <Text style={styles.countText}>{counts[item.name]}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.resetButton} onPress={resetCounts}>
        <Text style={styles.resetButtonText}>Reset</Text>
      </TouchableOpacity>
      <Text style={styles.footer}>© Ibrahim Kaiser 2025</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 20,
  },
  button: {
    width: buttonWidth,
    height: buttonHeight,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  iconText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  countText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  resetButton: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  resetButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    fontSize: 10,
    fontStyle: "italic",
  },
});

export default VehicleCounter;
