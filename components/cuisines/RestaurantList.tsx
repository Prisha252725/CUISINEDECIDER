import { View, FlatList, Linking } from "react-native";
import { StyleSheet } from "react-native";
import { Card, Text, Button } from "@rneui/themed";
import { RestaurantImage } from "./RestaurantImage";
import { Rating } from '@kolking/react-native-rating';


export const RestaurantList = ({restaurants, onBackPress}: {restaurants: any[], onBackPress: () => void}) => {

    const onViewableItemsChanged = (info: any) => {
        // console.log(info);
    }

    return (
        <View style={styles.container}>
            <Button buttonStyle={styles.button} onPress={onBackPress}>Select Cuisine</Button>
            <FlatList onViewableItemsChanged={onViewableItemsChanged} initialNumToRender={2} data={restaurants} keyExtractor={(item) => item.photoReference} renderItem={({item}) => (
                <Card containerStyle={styles.card} >
                    <RestaurantImage referenceId={item.photoReference} />
                    <Card.FeaturedTitle style={styles.name}>{item.name}</Card.FeaturedTitle>
                    
                    <Text>{item.address}</Text>

                    <Rating style={styles.rating} size={20} rating={item.rating} />

                    <Button title="View on Google Maps" type="outline" buttonStyle={{width: 180, marginTop: 10, marginBottom: 10}} onPress={() => {
                        Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${item.address}&query_place_id=${item.placeId}`);
                    }} />
                </Card>
            )} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 50,
        paddingTop: 50,
        width: "95%",
    },
    name: {
        marginTop: 15,
        marginBottom: 5,
        color: "#333"
    },
    card: {
      
      borderRadius: 10,
    },
    button: {
        alignSelf: "flex-end",
        width: 180,
        marginBottom: 10,
        marginRight: 20,
    },
    rating: {
        marginVertical: 10,
    }
  });
