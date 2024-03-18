import axios from 'axios';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, ButtonText, Card, Text, XStack } from 'tamagui';
import { appointmentData, clinicData, tokenCache } from '~/app/getToken';
import { colors } from '~/app/styles';
import TitleBar from '~/components/TitleBar';
import { url } from '~/env';
import * as SecureStore from 'expo-secure-store';
import dayjs from 'dayjs';

export default function Page() {
  const [activeTab, setActiveTab] = useState('PENDING');

  const [dateOfApp, setDateOfApp] = useState('');

  const [loading, setLoading] = useState(true);
  const [appData, setAppData] = useState([]);

  const [successApps, setSuccessApps] = useState([]);
  const [pendingApps, setPendingApps] = useState([]);

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
  };

  //USE YOUR OWN URL!!
  useEffect(() => {
    const token = SecureStore.getItem('token');
    const clinicId = SecureStore.getItem('clinicId');

    // Axios GET request to fetch doctors data
    axios
      .get(
        `${url}viewAppointments?token=${token}&visitDate=&clinicId=${clinicId}&appointmentId=0&patientId=0&doctorId=0&followupDate`
      )
      .then((res) => {
        console.log('Response:', JSON.stringify(res.data.data, null, 2));
        setAppData(res.data.data.appointments);
        //console.log('Response Appointment Data:', JSON.stringify(appData, null, 2));sssssssss

        res.data.data.appointments.map((item: any) => {
          if (!successApps.some((app: any) => app.id === item.id) && item.status === 1) {
            successApps.push(item);
          } else if (!pendingApps.some((app: any) => app.id === item.id) && item.status !== 1) {
            pendingApps.push(item);
          }
        });

        console.log('Pending Apps:', JSON.stringify(pendingApps, null, 2));
        console.log('Successfull Apps:', JSON.stringify(successApps, null, 2));
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching Succ/Pen Appointments:', error);
        console.log('SET APP TOKEN:', token);
        console.log('SET APP clinicId:', clinicId);
      });
  }, []);

  const goToHisory = (val: string) => {
    SecureStore.setItem('patientId', val);
    router.push('/patientHistory');
    console.log('Patient ID:', val);
  };

  return (
    <SafeAreaView style={{ rowGap: 10, padding: 10, backgroundColor: colors.linkBlue, flex: 1 }}>
      {/* Title Bar */}
      <TitleBar title="Get Appointment" />

      {/* Total Income Card */}
      <Card
        paddingVertical={10}
        borderRadius={10}
        backgroundColor={colors.lightGray}
        justifyContent={'center'}
        alignItems={'center'}>
        <Text fontFamily={'ArialB'} fontSize={18} color={colors.primary}>
          Total Income: 0
        </Text>
      </Card>

      {/* Tab Bar */}

      {/* Content */}
      <Card
        gap={20}
        padding={10}
        borderRadius={10}
        backgroundColor={colors.lightGray}
        flex={1}
        alignItems={'center'}>
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[styles.tabItem, activeTab === 'PENDING' && styles.activeTabItem]}
            onPress={() => handleTabPress('PENDING')}>
            <Text fontFamily={'ArialB'} fontSize={18} color={colors.primary}>
              Pending
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabItem, activeTab === 'SUCCESSFUL' && styles.activeTabItem]}
            onPress={() => handleTabPress('SUCCESSFUL')}>
            <Text fontFamily={'ArialB'} fontSize={18} color={colors.primary}>
              Successful
            </Text>
          </TouchableOpacity>
        </View>
        {activeTab === 'PENDING' ? (
          <FlatList
            style={{ width: '100%' }}
            refreshing={true}
            horizontal={false}
            decelerationRate="normal"
            data={pendingApps}
            //keyExtractor={(item: any) => item.id.toString()}
            renderItem={({ item }) => (
              <Card
                padded
                gap={10}
                width={'100%'}
                flexDirection="column"
                backgroundColor={colors.white}>
                <XStack gap={5}>
                  <Text fontFamily={'ArialB'} fontSize={18} color={colors.yellow}>
                    Patient Name:
                  </Text>
                  <Text fontFamily={'ArialB'} fontSize={18} color={colors.primary}>
                    {item.patientName}
                  </Text>
                </XStack>
                <XStack gap={5}>
                  <Text fontFamily={'ArialB'} fontSize={18} color={colors.yellow}>
                    Appointment Token:
                  </Text>
                  <Text fontFamily={'ArialB'} fontSize={18} color={colors.primary}>
                    {item.tokenNumber}
                  </Text>
                </XStack>
                <XStack gap={5}>
                  <Text fontFamily={'ArialB'} fontSize={18} color={colors.yellow}>
                    Appointment Date:
                  </Text>
                  <Text fontFamily={'ArialB'} fontSize={18} color={colors.primary}>
                    {dayjs(item.visitDate).format('DD-MMM-YYYY')}
                  </Text>
                </XStack>
                <XStack gap={10}>
                  <Button
                    onPress={() => goToHisory(item.patientId.toString())}
                    flex={1}
                    backgroundColor={colors.yellow}>
                    <ButtonText fontFamily={'ArialB'} fontSize={14} color={colors.white}>
                      Patient History
                    </ButtonText>
                  </Button>
                  <Button
                    onPress={() => router.push('checkup')}
                    flex={1}
                    backgroundColor={colors.primary}>
                    <ButtonText fontFamily={'ArialB'} fontSize={14} color={colors.white}>
                      Checkup
                    </ButtonText>
                  </Button>
                </XStack>
              </Card>
            )}
          />
        ) : (
          <FlatList
            style={{ width: '100%' }}
            refreshing={true}
            horizontal={false}
            decelerationRate="normal"
            data={successApps}
            //keyExtractor={(item: any) => item.id.toString()}
            renderItem={({ item }) => (
              <Card
                padded
                gap={10}
                width={'100%'}
                flexDirection="column"
                backgroundColor={colors.white}>
                <XStack gap={5}>
                  <Text fontFamily={'ArialB'} fontSize={18} color={colors.yellow}>
                    Patient Name:
                  </Text>
                  <Text fontFamily={'ArialB'} fontSize={18} color={colors.primary}>
                    {item.patientName}
                  </Text>
                </XStack>
                <XStack gap={5}>
                  <Text fontFamily={'ArialB'} fontSize={18} color={colors.yellow}>
                    Appointment Token:
                  </Text>
                  <Text fontFamily={'ArialB'} fontSize={18} color={colors.primary}>
                    {item.tokenNumber}
                  </Text>
                </XStack>
                <XStack gap={5}>
                  <Text fontFamily={'ArialB'} fontSize={18} color={colors.yellow}>
                    Age:
                  </Text>
                  <Text fontFamily={'ArialB'} fontSize={18} color={colors.primary}>
                    0
                  </Text>
                </XStack>
                <XStack gap={5}>
                  <Text fontFamily={'ArialB'} fontSize={18} color={colors.yellow}>
                    Phone:
                  </Text>
                  <Text fontFamily={'ArialB'} fontSize={18} color={colors.primary}>
                    +923323583308
                  </Text>
                </XStack>
                <XStack gap={10}>
                  <Button
                    onPress={() => goToHisory(item.patientId.toString())}
                    flex={1}
                    backgroundColor={colors.yellow}>
                    <ButtonText fontFamily={'ArialB'} fontSize={14} color={colors.white}>
                      Patient History
                    </ButtonText>
                  </Button>
                </XStack>
              </Card>
            )}
          />
        )}
      </Card>
    </SafeAreaView>
  );
}

const styles = {
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  tabBar: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTabItem: {
    paddingVertical: 10,
    borderBottomWidth: 3,
    borderBottomColor: colors.yellow,
  },
};
