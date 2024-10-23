import CardsSwipe from "react-native-cards-swipe";
import { cuisines as cuisinesData } from "../../data/cuisines";
import { View, Image, StyleSheet } from "react-native";
import { Text } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";

export const Deck = ({
  onCuisineSelected,
}: {
  onCuisineSelected: (cuisine: string) => void;
}) => {
  return (
    <View>
      <CardsSwipe
        cards={cuisinesData}
        cardContainerStyle={styles.cardContainer}
        onSwipedLeft={() => console.log("Swipe left")}
        onSwipedRight={(card) => {
          onCuisineSelected(cuisinesData[card].name);
        }}
        renderCard={(card) => (
          <View style={styles.card}>
            <Image
              source={card.image}
              style={{ width: "100%", height: "100%" }}
            />
            <LinearGradient
              colors={["rgba(255,255,255,0)", "rgba(0,0, 0,0.8)"]}
              style={styles.linearGradient}
            >
              <Text style={styles.cardText}>{card.name}</Text>
            </LinearGradient>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cardContainer: {
    width: "85%",
    height: "70%",
  },
  card: {
    width: "85%",
    height: "70%",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.07,
    shadowRadius: 3.3,
    overflow: "hidden",
    borderRadius: 15,
  },
  cardText: {
    position: "absolute",
    bottom: 30,
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    width: "100%",
  },
  cardImg: {
    width: "100%",
    height: "100%",
  },
  linearGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 200,
    zIndex: 1,
  },
});
