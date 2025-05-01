import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";
export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [confirm, setConfirm] = useState(null);
  const navigation = useNavigation();

  const signInWithPhoneNumber = async () => {
    try {
      const phoneRegex = /^\+\d{1,4} \d{1,15}$/;
      if (!phoneRegex.test(phoneNumber)) {
        alert("Invalid Phone Number!");

        return;
      }

      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
    } catch (error) {
      alert("Error Sendind Code. Please try again later.");
      console.log("Error sending code : ", error);
    }
  };
  const confirmCode = async () => {
    try {
      if (!code || code.length !== 6) {
        alert("Invalid code");
        return;
      }
      const userCredential = await confirm.confirm(code);
      const user = userCredential.user;

      const userDocument = await firestore()
        .collection("users")
        .doc(user.uid)
        .get();
      if (userDocument.exists) {
        navigation.navigate("Dashboard");
      } else {
        navigation.navigate("Detail", { uid: user.uid });
      }
    } catch (error) {
      alert("Invalid code");
      console.log("Invalid error", error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#000",
        position: "relative",
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "#000",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "25%",
        }}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: "#ADD8E6",
          padding: 20,
          borderTopLeftRadius: 100,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          top: "25%",
        }}
      >
        <Text
          style={{
            fontSize: 32,
            fontWeight: "bold",
            marginBottom: 40,
            marginTop: 20,
            textAlign: "center",
          }}
        >
          Bug Ninza Chat App
        </Text>
      </View>
      {!confirm ? (
        <>
          <Text
            style={{
              marginBottom: 20,
              fontSize: 18,
              color: "#808080",
            }}
          >
            Enter your phone number with country code.
          </Text>
          <TextInput
            style={{
              height: 50,
              width: "100%",
              borderColor: "black",
              borderWidth: 1,
              marginBottom: 30,
              paddingHorizontal: 10,
              borderRadius: 10,
            }}
            placeholder="e.g., +1 650-555-5848"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />

          <TouchableOpacity
            onPress={signInWithPhoneNumber}
            style={{
              padding: 10,
              borderRadius: 5,
              alignItems: "center",
              marginBottom: 20,
              backgroundColor: "#007BFF",
            }}
          >
            <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
              Verify Phone Number
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text
            style={{
              marginBottom: 20,
              fontSize: 18,
              color: "#808080",
            }}
          >
            Enter the code sent to your phone.
          </Text>
          <TextInput
            style={{
              height: 50,
              width: "100%",
              borderColor: "black",
              borderWidth: 1,
              marginBottom: 30,
              paddingHorizontal: 10,
              borderRadius: 10,
            }}
            placeholder="Enter Code"
            value={code}
            onChangeText={setCode}
            keyboardType="phone-pad"
          />
          <TouchableOpacity
            onPress={confirmCode}
            style={{
              backgroundColor: "#007BFF",
              padding: 10,
              borderRadius: 5,
              marginBottom: 20,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
              confirm code
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
