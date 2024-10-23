import { StyleSheet } from "react-native";
import { Card } from '@rneui/themed';
import {Image} from 'expo-image';

export const RestaurantImage = ({ referenceId }: { referenceId: string }) => {
  return (
    <Image
        placeholderContentFit="cover"
        contentFit="cover"
        recyclingKey={referenceId}
      placeholder={require("../../assets/loading-restaurant.png")}
      cachePolicy={"memory-disk"}
      onError={console.log}
      source={`https://2fcmgeujfbgt25vssnvznzbrmm0crbye.lambda-url.ap-south-1.on.aws/?photo_reference=${referenceId}`}
      style={styles.image}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 220,
  },
});
