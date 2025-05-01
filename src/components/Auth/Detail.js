import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import DatePicker from "react-native-date-picker";
import { Picker } from "@react-native-picker/picker";

export default function Detail({ route, navigation }) {
  const { uid } = route.params;
  const [name, setName] = useState("");
  const [dob, setDob] = usestate(new Date());
  const [gender, setGender] = useState("Male");

  const saveDetails = async () => {
    try {
      await firestore()
        .collection("users")
        .doc(uid)
        .set({
          name,
          dob: dob.toISOString().slice(0, 10),
          gender,
          displayName: name,
        });
      navigation.navigate("Dashboard");
    } catch (error) {
      console.log("Error saving details: ", error);
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
      >
        <Text
          style={{
            fontSize: 32,
            fontWeight: "bold",
            marginBottom: 40,
            marginTop: 150,
          }}
        >
          Enter your details:
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
          placeholder="Name"
          value={name}
          onChangeText={setName}
        ></TextInput>
        <DatePicker
          style={{
            height: 80,
            marginBottom: 30,
            width: Dimensions.get("window").width - 40,
          }}
          date={dob}
          onDateChange={setDob}
          mode="date"
        ></DatePicker>
        <Picker
          style={{
            height: 50,
            width: "100%",
            marginBottom: 30,
          }}
          selectedValue={gender}
          onValueChange={setGender}
        >
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
        <TouchableOpacity
          style={{
            backgroundColor: "#007BFF",
            padding: 10,
            borderRadius: 5,
            marginBottom: 20,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 22,
              fontWeight: "bold",
            }}
          >
            Save Details
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
