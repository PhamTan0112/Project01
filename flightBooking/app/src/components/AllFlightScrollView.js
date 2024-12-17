import * as React from "react";
import { View, ScrollView, Text, StyleSheet, Image } from "react-native";
import { Avatar, Button, Card, Paragraph } from "react-native-paper";
import Title from "./common/Title";

import { flightData } from "../utils/mock";
import { TouchableOpacity } from "react-native-gesture-handler";

const AllFlightScrollView = () => (
  <View style={styles.container}>
    {/* <View style={{marginTop: 20}}>
    <Title>Our Flightes</Title>
    </View> */}

    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={200}
      decelerationRate="fast"
    >
      {flightData.map((flight, i) => (
        <TouchableOpacity key={i} style={styles.cardContainer}>
          <View style={styles.cardWrapper}>
            <Image style={styles.tinyLogo} source={{ uri: flight.image }} />
            <Card style={styles.flightDetails}>
              <Text style={{ fontWeight: "bold" }}>{flight.title}</Text>
              <Text>{flight.price}</Text>
            </Card>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    // height: "40%",
    width: "100%",
    // position: "absolute",
    // bottom: 5,
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center"
  },
  cardContainer: {
    // marginLeft: 10,
    marginRight: 10,
    width: 150,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    height: "100%",
  },
  cardWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  flightDetails: {
    width: "100%",
    height: "35%",
    padding: 5,
  },
  tinyLogo: {
    width: "100%",
    height: 80,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
});

export default AllFlightScrollView;
