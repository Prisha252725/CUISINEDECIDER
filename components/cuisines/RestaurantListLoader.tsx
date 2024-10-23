import { Skeleton, Card } from "@rneui/themed";
import { StyleSheet, View } from "react-native";

export const RestaurantListLoader = () => {
  return (
    <View>
      {Array.from({ length: 3 }).map((_, index) => (
        <Card containerStyle={styles.card}>
          <Skeleton height={20} width={200} style={styles.skeleton} />
          <Skeleton height={20} width={300} style={styles.skeleton} />
          <Skeleton height={10} width={300} style={styles.skeleton} />
          <Skeleton height={10} width={300} style={styles.skeleton} />
        </Card>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "95%",
    borderRadius: 10,
  },
  skeleton: {
    marginBottom: 10,
  },
});
