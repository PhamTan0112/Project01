import React, { Component } from "react";
import { Text, View } from "react-native";
import { Appbar } from "react-native-paper";

import { connect } from "react-redux";
import SearchedSingleFlight from "../../components/SearchedSingleFlight";
import { ScrollView } from "react-native-gesture-handler";
import { flightData } from "../../utils/mock";

export class SearchScreen extends Component {
  state = {
    progressBar: 0,
    intervalId: "",
    progressColor: "#b2cede",
  };

  _goBack = () => {
    this.props.navigation.pop();
  };

  render() {
    return (
      <View>
        <Appbar.Header statusBarHeight={0}>
          <Appbar.BackAction onPress={this._goBack} />
          <Appbar.Content title="Search" />
        </Appbar.Header>
        {/* <ActivityIndicator animating={true} color={ConstantColors.tintColor}/> */}
        <ScrollView
          style={{ height: "85%", margin: 15 }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          {flightData.map((flight, i) => (
            <SearchedSingleFlight flight={flight} key={i}/>
          ))}
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    Journey: state.Journey.journey_store,
  };
}

export default connect(mapStateToProps)(SearchScreen);
