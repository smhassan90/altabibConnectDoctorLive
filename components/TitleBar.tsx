import React from "react";
import { Text, XStack } from "tamagui";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { router, useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";

const TitleBar = ({ title }: { title: string }) => {

  const navigation = useNavigation();

  const onToggle = () => {
    navigation.dispatch(DrawerActions.openDrawer())
  };

  return (
    <XStack alignItems="center" marginVertical={10}>
      <TouchableOpacity onPress={onToggle}>
        <Ionicons name="menu" size={35} color="white" />
      </TouchableOpacity>
      <XStack gap={5} flex={1}>
        {title ? (
          <Text
            marginLeft={10}
            color={"white"}
            fontSize={28}
            fontFamily={"ArialB"}
          >
            {title}
          </Text>
        ) : (
          <>
            <Text
              color={"white"}
              fontSize={28}
              marginLeft={10}
              fontFamily={"ArialB"}
            >
              Al-Tabib
            </Text>
            <Text color={"white"} fontSize={28} fontFamily={"ArialB"}>
              Connect
            </Text>
          </>
        )}
      </XStack>
    </XStack>
  );
};

export default TitleBar;
