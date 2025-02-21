import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
} from "react-native";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import * as XLSX from "xlsx";

const { width } = Dimensions.get("window");
const buttonWidth = width / 2.5;
const buttonHeight = width / 4.5;

const Home: React.FC = () => {
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

  const [value, setValue] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0); // Time in milliseconds

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Start Stopwatch when any vehicle button is pressed
  const startStopwatch = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10); // Update every 10ms
      }, 10); // Ensure correct type casting
    }
  };

  const incrementCount = (type: string) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [type]: prevCounts[type] + 1,
    }));
    startStopwatch();
  };

  const resetCounts = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
    setTime(0);
    setCounts(
      vehicleTypes.reduce((acc, type) => ({ ...acc, [type.name]: 0 }), {})
    );
  };

  // Format time as HH:MM:SS:MS
  const formatTime = (milliseconds: number) => {
    const ms = milliseconds % 1000;
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}:${String(ms).padStart(3, "0")}`;
  };

  const shareCounts = async () => {
    if (!value.trim()) {
      Alert.alert("Warning", "Please enter a file name.");
      return; // Exit the function if the input field is empty
    }

    const data = vehicleTypes.map((type) => ({
      Vehicle: type.name,
      Count: counts[type.name],
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Vehicle Count");
    const wbout = XLSX.write(wb, { type: "base64", bookType: "xlsx" });
    const uri = FileSystem.cacheDirectory + `${value}.xlsx`;
    await FileSystem.writeAsStringAsync(uri, wbout, {
      encoding: FileSystem.EncodingType.Base64,
    });
    await Sharing.shareAsync(uri);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⏰ {formatTime(time)}</Text>
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
      <TextInput
        style={styles.input}
        placeholder="write file name"
        placeholderTextColor="#888"
        value={value}
        onChangeText={setValue}
      />
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.resetButton} onPress={resetCounts}>
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareButton} onPress={shareCounts}>
          <Text style={styles.shareButtonText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#e2d8db",
  },
  title: {
    color: "#ff6347",
    backgroundColor: "#223333",
    fontSize: 20,
    fontFamily: "poppins-bold",
    marginTop: 30,
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    width: "80%",
    textAlign: "center",
    borderRadius: 8,
    elevation: 5, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  button: {
    width: buttonWidth,
    height: buttonHeight,
    backgroundColor: "#1E1E1E",
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
    color: "#FFF",
    fontSize: 16,
    fontFamily: "poppins-bold",
    marginTop: 10,
  },
  countText: {
    color: "#D2B48C",
    fontSize: 20,
    fontFamily: "poppins-bold",
    marginTop: 4,
  },
  input: {
    width: "90%",
    height: 50,
    backgroundColor: "#E0E0E0", // Same as container to blend
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 30,
    borderRadius: 12,
    fontSize: 16,
    color: "#333",
    textAlign: "left",
    borderWidth: 2, // Outline effect
    borderColor: "#C0C0C0", // Soft gray outline
    shadowColor: "#FFF", // Light top-left shadow
    shadowOffset: { width: -2, height: -2 },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 40,
  },
  resetButton: {
    width: buttonWidth,
    alignItems: "center",
    backgroundColor: "#FF5F1F",
    padding: 14,
    borderRadius: 10,
    marginRight: 10,
  },
  resetButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "poppins-bold",
  },
  shareButton: {
    width: buttonWidth,
    alignItems: "center",
    backgroundColor: "#4682b4",
    padding: 14,
    borderRadius: 10,
  },
  shareButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "poppins-bold",
  },
});

export default Home;
