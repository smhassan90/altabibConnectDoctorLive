import axios from 'axios';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Platform, Modal } from 'react-native';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import { Button, ButtonText, Card, Text, View, XStack, YStack } from 'tamagui';
import { borderRadiusM, colors, fontBold, fontM, spacingM, spacingS } from '~/app/styles';
import TitleBar from '~/components/TitleBar';
import { url } from '~/env';
import * as SecureStore from 'expo-secure-store';
import dayjs from 'dayjs';
import { CusText } from '~/components/CusText';
import { CusBtn } from '~/components/CusBtn';
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import Header from '~/components/Header';

export default function Page() {
  const token = SecureStore.getItem('token');
  const clinicId = SecureStore.getItem('clinicId');
  const doctorId = SecureStore.getItem('doctorId');

  const [activeTab, setActiveTab] = useState('PENDING');

  // DATE TIME PICKER
  const [date, setDate] = useState(new Date());
  const [dateStr, setDateStr] = useState('');
  const formatDate = dayjs(date).format('YYYY-MM-DD');

  const [showPicker, setShowPicker] = useState(false);
  const [mode, setMode] = useState('date');
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  // SUCCESS AND PENDING APPS
  const [successApps, setSuccessApps] = useState<any>([]);
  const [pendingApps, setPendingApps] = useState<any>([]);

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
  };

  //USE YOUR OWN URL!!
  useEffect(() => {
    // Axios GET request to fetch doctors data
    axios
      .get(
        `${url}viewAppointments?token=${token}&visitDate=${formatDate}&clinicId=${clinicId}&appointmentId=0&patientId=0&doctorId=${doctorId}&followupDate`
      )
      .then((res) => {
        console.log('Response:', JSON.stringify(res.data.data, null, 2));
        console.log('Response Appointment Data:', JSON.stringify(res.data.data, null, 2));

        const successAppsArray: any[] = [];
        const pendingAppsArray: any[] = [];

        res.data.data.appointments.forEach((item: any) => {
          if (item.status === 1) {
            // Replace existing items in successApps array with new items
            successAppsArray.push(item);
          } else {
            // Replace existing items in pendingApps array with new items
            pendingAppsArray.push(item);
          }
        });

        setSuccessApps(successAppsArray);
        setPendingApps(pendingAppsArray);

        console.log('Pending Apps:', JSON.stringify(pendingApps, null, 2));
        console.log('Successfull Apps:', JSON.stringify(successApps, null, 2));
        setRefresh(false);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching Succ/Pen Appointments:', error);
        console.log('SET APP TOKEN:', token);
        console.log('SET APP clinicId:', clinicId);
        setRefresh(false);
      });
    setRefresh(false);
    console.log('clinicid', clinicId);
    console.log('Format Date:', formatDate);
    console.log('Doctor ID:', doctorId);
  }, [refresh, formatDate]);

  const goToHisory = (val: string) => {
    SecureStore.setItem('patientId', val);
    router.push('/patientHistory');
    console.log('Patient ID:', val);
  };

  const goToCheckup = (
    date: string,
    appId: number,
    pId: number,
    doctorId: number,
    clinicId: number
  ) => {
    SecureStore.setItem('appDate', date);
    SecureStore.setItem('appId', appId.toString());
    SecureStore.setItem('clinicId', appId.toString());
    SecureStore.setItem('patientId', pId.toString());
    SecureStore.setItem('doctorId', doctorId.toString());
    router.push('/checkup');
  };

  const toggleDate = () => {
    setShowPicker(!showPicker);
  };

  const onChange = ({ type }, selectedDate: Date) => {
    if (type === 'set') {
      const currentDate = selectedDate;
      setDate(currentDate);
      setShowPicker(false);
      if (Platform.OS === 'android') {
        toggleDate();
        setDate(currentDate);
      }
    } else {
      toggleDate();
    }
  };

  const confirmIOSDate = () => {
    setDateStr(date.toDateString());
    setShowPicker(false);
  };

  return (
    <View flex={1} backgroundColor={colors.primary}>
      <Header>
        <TitleBar title="" />
      </Header>

      <YStack flex={1} gap={spacingM} padding={spacingM}>
        <XStack>
          <TouchableOpacity
            onPressIn={toggleDate}
            style={{
              backgroundColor: colors.yellow,
              padding: 5,
              borderRadius: borderRadiusM,
              flex: 1,
              alignItems: 'center',
            }}>
            <Text color={colors.white}>{dayjs(formatDate).format('D/M/YYYY')}</Text>
          </TouchableOpacity>
        </XStack>
        {showPicker && Platform.OS === 'android' && (
          <RNDateTimePicker
            textColor="white"
            themeVariant="dark"
            accentColor={colors.primary}
            testID="dateTimePicker"
            value={date}
            mode="date"
            display="default"
            style={{
              paddingHorizontal: spacingM,
              backgroundColor: colors.yellow,
            }}
            onChange={onChange}
          />
        )}

        <Card
          paddingVertical={spacingM}
          borderRadius={borderRadiusM}
          backgroundColor={colors.lightGray}
          justifyContent={'center'}
          alignItems={'center'}>
          <Text fontFamily={'ArialB'} fontSize={18} color={colors.primary}>
            Total Income: 0
          </Text>
        </Card>
        <View backgroundColor={colors.primary} flexDirection="row">
          <TouchableOpacity
            style={[styles.tabItem, activeTab === 'PENDING' && styles.activeTabItem]}
            onPress={() => handleTabPress('PENDING')}>
            <CusText bold size="lg" color="white">
              Pending
            </CusText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabItem, activeTab === 'SUCCESSFUL' && styles.activeTabItem]}
            onPress={() => handleTabPress('SUCCESSFUL')}>
            <CusText bold size="lg" color="white">
              Successful
            </CusText>
          </TouchableOpacity>
        </View>
        {activeTab === 'PENDING' && pendingApps.length === 0 && (
          <YStack alignItems="center" flex={1} justifyContent="center">
            <CusText bold size="md" color="white">
              No appointments for this day
            </CusText>
          </YStack>
        )}
        {activeTab === 'SUCCESSFUL' && successApps.length === 0 && (
          <YStack alignItems="center" flex={1} justifyContent="center">
            <CusText bold size="md" color="white">
              No completed appointments on this day
            </CusText>
          </YStack>
        )}
        {activeTab === 'PENDING' ? (
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={refresh}
                onRefresh={() => {
                  setRefresh(true);
                }}
              />
            }
            style={{ width: '100%' }}
            horizontal={false}
            decelerationRate="normal"
            data={pendingApps}
            keyExtractor={(item: any) => item.id.toString()}
            renderItem={({ item }) => (
              <>
                <Card
                  borderRadius={borderRadiusM}
                  marginBottom={spacingM}
                  padded
                  gap={spacingM}
                  width={'100%'}
                  flexDirection="column"
                  backgroundColor={colors.white}>
                  <XStack gap={spacingS}>
                    <CusText bold size="md" color="yellow">
                      Patient Name:
                    </CusText>

                    <CusText bold size="md" color="primary">
                      {item.patientName}
                    </CusText>
                  </XStack>
                  <XStack gap={spacingS}>
                    <CusText bold size="md" color="yellow">
                      Appointment Token:
                    </CusText>
                    <CusText bold size="md" color="primary">
                      {item.tokenNumber}
                    </CusText>
                  </XStack>
                  <XStack gap={spacingS}>
                    <CusText bold size="md" color="yellow">
                      Appointment Date:
                    </CusText>
                    <CusText bold size="md" color="primary">
                      {dayjs(item.visitDate).format('DD-MMM-YYYY')}
                    </CusText>
                  </XStack>
                  <XStack gap={spacingM}>
                    <CusBtn
                      onPress={() => goToHisory(item.patientId.toString())}
                      color={colors.primary}
                      textColor="white">
                      Patient History
                    </CusBtn>
                    <CusBtn
                      onPress={() => goToCheckup(item.visitDate, item.id)}
                      color={colors.yellow}
                      textColor="white">
                      Checkup
                    </CusBtn>
                  </XStack>
                </Card>
              </>
            )}
          />
        ) : (
          <FlatList
            style={{ width: '100%' }}
            refreshControl={
              <RefreshControl
                refreshing={refresh}
                onRefresh={() => {
                  setRefresh(true);
                }}
              />
            }
            horizontal={false}
            decelerationRate="normal"
            data={successApps}
            //keyExtractor={(item: any) => item.id.toString()}
            renderItem={({ item }) => (
              <Card
                marginBottom={spacingM}
                padded
                gap={spacingM}
                width={'100%'}
                flexDirection="column"
                backgroundColor={colors.white}>
                <XStack gap={5}>
                  <CusText bold size="md" color="yellow">
                    Patient Name:
                  </CusText>
                  <CusText bold size="md" color="yellow">
                    {item.patientName}
                  </CusText>
                </XStack>
                <XStack gap={5}>
                  <CusText bold size="md" color="yellow">
                    Appointment Token:
                  </CusText>
                  <CusText bold size="md" color="yellow">
                    {item.tokenNumber}
                  </CusText>
                </XStack>
                <XStack gap={5}>
                  <CusText bold size="md" color="yellow">
                    Doctor:
                  </CusText>
                  <CusText bold size="md" color="yellow">
                    {item.doctorName}
                  </CusText>
                </XStack>
                <XStack gap={5}>
                  <CusText bold size="md" color="yellow">
                    Clinic:
                  </CusText>
                  <CusText bold size="md" color="yellow">
                    {item.clinicName}
                  </CusText>
                </XStack>
                <XStack gap={5}>
                  <CusText bold size="md" color="yellow">
                    Diagnosis:
                  </CusText>
                  <CusText bold size="md" color="yellow">
                    {item.diagnosis}
                  </CusText>
                </XStack>
                <XStack gap={spacingM}>
                  <Button
                    onPress={() => goToHisory(item.patientId.toString())}
                    flex={1}
                    backgroundColor={colors.primary}>
                    <ButtonText fontFamily={fontBold} fontSize={14} color={colors.white}>
                      Patient History
                    </ButtonText>
                  </Button>
                </XStack>
              </Card>
            )}
          />
        )}
      </YStack>
    </View>
  );
}

const styles = {
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTabItem: {
    paddingVertical: spacingM,
    borderBottomWidth: 3,
    borderBottomColor: colors.white,
  },
};
