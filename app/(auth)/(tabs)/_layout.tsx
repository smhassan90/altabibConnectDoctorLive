import { AntDesign, FontAwesome, Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { colors } from './../../styles';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.yellow,
        tabBarStyle: {
          backgroundColor: colors.white,
          height: '9%',
          paddingTop: 10,
        },
      }}>
      <Tabs.Screen
        name="(clinics)"
        options={{
          headerShown: false,
          tabBarLabel: 'Clinics',
          tabBarIcon: ({color}) => <AntDesign name="home" size={30} color={color} />,
        }}
      />
      <Tabs.Screen
        name="(summary)"
        options={{
          headerShown: false,
          tabBarLabel: 'Summary',
          tabBarIcon: ({color}) => <SimpleLineIcons name="graph" size={24} color={color} />
        }}
      />
      <Tabs.Screen
        name="(notifications)"
        options={{
          headerShown: false,
          tabBarLabel: 'Notification',
          tabBarIcon: ({color}) => <Ionicons name="notifications" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{
          headerShown: false,
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => <FontAwesome name="user-md" size={24} color={color} />
        }}
      />
    </Tabs>
  );
}