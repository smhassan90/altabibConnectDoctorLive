import React, { useEffect, useState } from 'react';
import TitleBar from './../../../../components/TitleBar';
import { colors, paddingM, paddingL, styles, spacingL, spacingS } from './../../../../app/styles';
import { Card, Image, Text, View, XStack, YStack } from 'tamagui';
import { StyleSheet, TextInput, TouchableOpacity, Button, FlatList } from 'react-native';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import Header from './../../../../components/Header';
import NotificationCard from './card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { RefreshControl } from 'react-native-gesture-handler';
import dayjs from 'dayjs';
type Notification = {
  read: boolean;
  timestamp: number;
  [key: string]: any;
};

export default function Page() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [refresh, setRefresh] = useState(false);
  const isFocused = useIsFocused();
  const loadNotifications = async () => {
    const stored = await AsyncStorage.getItem('notifications');
    if (stored) {
      const notifications = JSON.parse(stored);
      const now = dayjs();
      const filtered = notifications.filter((notification) => {
        const notificationTime = dayjs(notification.timestamp);
        const diffInMinutes = now.diff(notificationTime, 'minute');
        return diffInMinutes <= 5;
      });
      setNotifications(filtered);
    }
  };
  useEffect(() => {
    if (isFocused) {
      loadNotifications();
    }
    setRefresh(false);
  }, [isFocused, refresh]);
  const handleNotificationPress = async (index) => {
    const updated = [...notifications];
    if (!updated[index].read) {
      updated[index].read = true;
      await AsyncStorage.setItem('notifications', JSON.stringify(updated));
      setNotifications(updated);
    }
  };
  return (
    <AlertNotificationRoot>
      <View flex={1} backgroundColor={colors.primary}>
        <Header>
          <TitleBar title="Summary" />
        </Header>
        {/* <YStack padding={paddingM}>
          {notifications?.map((notification, index) => (
            <NotificationCard key={index} notification={notification} />
          ))}
        </YStack> */}
        <YStack flex={1} paddingTop={spacingL}>
          <FlatList
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refresh}
                colors={[colors.yellow]}
                tintColor={colors.white}
                onRefresh={() => {
                  setRefresh(true);
                }}
              />
            }
            refreshing={true}
            horizontal={false}
            decelerationRate="normal"
            data={notifications}
            keyExtractor={(item: any) => item.timestamp.toString()}
            renderItem={({ item, index }) => (
              <NotificationCard
                notification={item}
                onPress={() => handleNotificationPress(index)}
              />
            )}
          />
        </YStack>
      </View>
    </AlertNotificationRoot>
  );
}

const inp = StyleSheet.create({
  input: {
    borderColor: colors.lightGray,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: colors.white,
  },
});
