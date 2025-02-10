import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import * as XLSX from "xlsx";

const { width } = Dimensions.get("window");
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

  const shareCounts = async () => {
    const data = vehicleTypes.map((type) => ({
      Vehicle: type.name,
      Count: counts[type.name],
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Vehicle Count");
    const wbout = XLSX.write(wb, { type: "base64", bookType: "xlsx" });
    const uri = FileSystem.cacheDirectory + "VehicleCount.xlsx";
    await FileSystem.writeAsStringAsync(uri, wbout, {
      encoding: FileSystem.EncodingType.Base64,
    });
    await Sharing.shareAsync(uri);
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
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.resetButton} onPress={resetCounts}>
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareButton} onPress={shareCounts}>
          <Text style={styles.shareButtonText}>Share</Text>
        </TouchableOpacity>
      </View>
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
  buttonRow: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 30,
  },
  resetButton: {
    width: buttonWidth,
    alignItems: "center",
    backgroundColor: "red",
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
  },
  resetButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  shareButton: {
    width: buttonWidth,
    alignItems: "center",
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 10,
  },
  shareButtonText: {
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
