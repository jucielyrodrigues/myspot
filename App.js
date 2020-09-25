import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, ViewBase } from 'react-native';
import { Button, TextInput, Appbar } from 'react-native-paper';

export default function App() {
  let [lat, setLat] = useState(0);
  let [lng, setLng] = useState(0);

  console.log(lng);
  return (
    <View>
      <Appbar.Header>
        <Appbar.Content style={{ textAlign: 'center' }} title="MySpot" />
      </Appbar.Header>

      <MapView style={styles.mapStyle}>
        <Marker
          coordinate={{ latitude: parseFloat(lat), longitude: parseFloat(lng) }}
        />
      </MapView>

      <View style={styles.container}>
        <TextInput
          mode="outlined"
          placeholder="Latitude"
          onChangeText={setLat}
        />
        <TextInput
          mode="outlined"
          placeholder="Longitude"
          onChangeText={setLng}
        />
        <Button mode="contained" onPress={() => console.log('Pressed')}>
          Search
        </Button>
        <Text> </Text>
        <Text style={{ textAlign: 'center' }}>My Location</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  mapStyle: {
    width: '90%',
    height: '47%',
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: 10,
  },
});
