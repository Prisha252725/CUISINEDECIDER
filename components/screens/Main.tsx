import { Session } from "@supabase/supabase-js";
import { View, StyleSheet, SafeAreaView, ImageBackground } from "react-native";
import { Button, Text } from "@rneui/themed";
import { supabase } from "../../lib/supabase";
import { Deck } from "../cuisines/Deck";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { getRestaurants } from "../../data/api";
import { RestaurantList } from "../cuisines/RestaurantList";
import { Skeleton } from '@rneui/themed';
import { RestaurantListLoader } from "../cuisines/RestaurantListLoader";

export default function Main({ session }: { session: Session }) {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [loader, setLoader] = useState(false);
  const [restaurants, setRestaurants] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert(
          "Permission to access location was denied. Please go to settings and grant permission to access location."
        );
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
      setLocation(location);
    })();
  }, []);
  const logout = () => {
    supabase.auth.signOut();
  };

  // return (
  //   <SafeAreaView style={styles.main}>
  //     <Text>You are now logged in</Text>
  //     <Button onPress={logout}>Logout</Button>
  //   </SafeAreaView>
  // );

  const handleCuisineSelected = async (cuisine: string) => {
    console.log(cuisine);
    if(!location) {
      alert("Please grant location permission to use this feature.");
      return;
    }
    setLoader(true);
    const restaurants = await getRestaurants(cuisine, location.coords.latitude, location.coords.longitude);
    setRestaurants(restaurants);
    setLoader(false);
  };

  return (
    <ImageBackground source={require("../../assets/background.png")}>
      <SafeAreaView style={styles.main}>
        {loader ? <RestaurantListLoader /> : restaurants.length > 0 ? <RestaurantList restaurants={restaurants} onBackPress={() => setRestaurants([])} /> : <Deck onCuisineSelected={handleCuisineSelected} />}
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover", // This will ensure the image covers the entire view
    justifyContent: "center", // Center the content
    width: "100%",
    height: "100%",
  },
  main: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});
