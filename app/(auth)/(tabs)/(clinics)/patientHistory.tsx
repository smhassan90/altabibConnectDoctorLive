import React, { useEffect, useState } from 'react';
import TitleBar from '~/components/TitleBar';
import { borderRadiusM, colors, paddingL, spacingM, spacingS } from '~/app/styles';
import { View, XStack, YStack } from 'tamagui';
import axios from 'axios';
import { url } from '~/env';
import * as SecureStore from 'expo-secure-store';
import { FlatList, RefreshControl } from 'react-native';
import Header from '~/components/Header';
import { CusText } from '~/components/CusText';

const Page = () => {
  const token = SecureStore.getItem('token');
  const patientId = SecureStore.getItem('patientId');
  const doctorId = SecureStore.getItem('doctorId');
  const [refresh, setRefresh] = useState(false);

  const [history, setHistory] = useState<any>([]);

  const fetchHistory = () => {
    axios
      .get(`${url}getPatientHistory?token=${token}&patientId=${patientId}&doctorId=0`)
      .then((res) => {
        console.log('GET HISTORY RESPONSE: ', JSON.stringify(res.data.data, null, 2));

        const historyTemp: any[] = [];
        res.data.data.appointments.forEach((item: any) => {
          if (item.status === 1) {
            historyTemp.push(item);
          }
        });
        setHistory(historyTemp);
      })
      .catch((err) => {
        console.log('ERROR FETCHING HISTORY:', err);
      });
    setRefresh(false);
  };

  useEffect(() => {
    console.log('=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=');
    console.log('LOCAL TOKEN:', token);
    console.log('LOCAL PID:,', patientId);
    console.log('LOCAL DOC ID:', doctorId);
    fetchHistory();
  }, [refresh]);

  return (
    <View flex={1} backgroundColor={colors.primary}>
      <Header>
        <TitleBar title="Patient History" />
      </Header>
      <YStack flex={1} padding={spacingM}>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={() => {
                setRefresh(true);
              }}
            />
          }
          contentContainerStyle={{ gap: spacingM }}
          horizontal={false}
          decelerationRate="normal"
          data={history}
          keyExtractor={(item: any) => item.id.toString()}
          renderItem={({ item }) => (
            <YStack
              gap={spacingM}
              backgroundColor={colors.white}
              padding={paddingL}
              borderRadius={borderRadiusM}>
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
                  Prescription:
                </CusText>
                <CusText bold size="md" color="primary">
                  {item.prescription}
                </CusText>
              </XStack>
              <XStack gap={spacingS}>
                <CusText bold size="md" color="yellow">
                  Diagnosis:
                </CusText>
                <CusText bold size="md" color="primary">
                  {item.diagnosis}
                </CusText>
              </XStack>
              <XStack gap={spacingS}>
                <CusText bold size="md" color="yellow">
                  Age:
                </CusText>
                <CusText bold size="md" color="primary">
                  {item.age}
                </CusText>
              </XStack>
              <XStack gap={spacingS}>
                <CusText bold size="md" color="yellow">
                  Weight:
                </CusText>
                <CusText bold size="md" color="primary">
                  {item.weight}
                </CusText>
              </XStack>
              <XStack gap={spacingS}>
                <CusText bold size="md" color="yellow">
                  BP:
                </CusText>
                <CusText bold size="md" color="primary">
                  {item.bloodPressure}
                </CusText>
              </XStack>
            </YStack>
          )}
        />
      </YStack>
    </View>
  );
};

export default Page;
