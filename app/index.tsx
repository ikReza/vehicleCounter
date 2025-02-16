import Colors from "@/constant/Colors";
import { useRouter } from "expo-router";
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";

export default function VehicleCounter() {
  const router = useRouter();
  const showAlert = () => {
    Alert.alert(
      "Information",
      "This app is made during Dhaka MRT Line-1 CS project."
    );
  };
  return (
    <View style={styles.container}>
      <Image
        source={require("./../assets/images/landing.png")}
        style={styles.image}
        resizeMode="stretch"
      />
      <View style={styles.content}>
        <Text style={styles.title}>Vehicle Counter</Text>
        <Text style={styles.description}>
          Effortlessly count vehicles on the road. Whether for research,
          surveys, or just for fun, get accurate counts in no time. 🚦
        </Text>
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => router.push("/home")}
        >
          <Text style={styles.startButtonText}>Get Started</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.infoButton} onPress={showAlert}>
          <Text style={styles.infoButtonText}>ⓘ</Text>
        </TouchableOpacity>
        <Text style={styles.footer}>© Ibrahim Kaiser 2025</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    alignItems: "center",
  },
  image: { width: "90%", height: 250, marginBottom: 30 },
  content: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
    padding: 25,
    width: "100%",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  title: {
    color: Colors.TOMATO,
    fontSize: 30,
    textAlign: "center",
    marginBottom: 30,
    fontFamily: "poppinsBold",
  },
  description: {
    color: Colors.WHITE,
    fontSize: 18,
    textAlign: "center",
    fontFamily: "poppins",
  },
  startButton: {
    alignItems: "center",
    backgroundColor: "#339933",
    padding: 12,
    borderRadius: 10,
    marginTop: 60,
  },
  startButtonText: {
    color: "white",
    fontSize: 20,
    fontFamily: "poppinsBold",
  },
  infoButton: {
    position: "absolute",
    bottom: 10,
    left: 20,
    paddingVertical: 2,
    paddingHorizontal: 4,
    backgroundColor: "#eed202",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  infoButtonText: {
    fontSize: 12,
    color: "black",
    fontWeight: "bold",
  },
  footer: {
    position: "absolute",
    color: Colors.WHITE,
    bottom: 10,
    right: 10,
    fontSize: 10,
    fontStyle: "italic",
  },
});
