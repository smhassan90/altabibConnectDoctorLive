import { Dimensions, FlatList, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Card, Text, View, XStack, YStack } from 'tamagui';
import axios from 'axios';
import {
  borderRadiusM,
  colors,
  fontXL,
  paddingL,
  paddingM,
  paddingS,
  spacingL,
  spacingM,
  spacingS,
  styles,
} from '~/app/styles';
import { url } from '~/env';
import TitleBar from '~/components/TitleBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Spinner from '~/components/Spinner';
import * as SecureStore from 'expo-secure-store';
import { CusText } from '~/components/CusText';
import { CusBtn } from '~/components/CusBtn';
import { RefreshControl } from 'react-native-gesture-handler';
import { HeartLoader } from '~/components/CusAnimations';
import constants from 'expo-constants';
import Header from '~/components/Header';
import dayjs from 'dayjs';

const loaderWidth = Dimensions.get('window').width;
const loaderHeight = Dimensions.get('window').height;
const paddTop = constants.statusBarHeight;

const Page = () => {
  const date = dayjs().format('YYYY-MM-DD');
  const [clinicArr, setclinicArr] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = SecureStore.getItem('token');
  const [refresh, setRefresh] = useState(false);

  const [successApps, setSuccessApps] = useState<any>([]);
  const [pendingApps, setPendingApps] = useState<any>([]);

  const [totalSuccessApps, setTotalSuccessApps] = useState(0);
  const [totalPendingApps, setTotalPendingApps] = useState(0);

  //USE YOUR OWN URL!!
  useEffect(() => {
    if (!refresh) {
      console.log('Token RES:', token);
      axios
        .get(`${url}getClinics?token=${token}`)
        .then((res) => {
          //console.log('Response Clinic Data:', JSON.stringify(res.data.data, null, 2));
          SecureStore.setItem('doctorId', res.data.data.id.toString());

          setclinicArr(res.data.data.doctorClinicDALS);
          setLoading(false);

          //console.log('Clinic Array:', JSON.stringify(clinicArr, null, 2));

          clinicArr.map((item: any) => {
            const clinicID = item.clinic.id;

            console.log('Clinic ID:', item.clinic.id);
            axios
              .get(
                `${url}viewAppointments?token=${token}&visitDate=${date}&clinicId=${clinicID}&patientId=0&doctorId=0&appointmentId=0&followupDate=`
              )
              .then((res) => {
                console.log(
                  'Response ViewAppointment Data:',
                  JSON.stringify(res.data.data, null, 2)
                );

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
                setTotalSuccessApps(successAppsArray.length + pendingAppsArray.length);
                setTotalPendingApps(pendingAppsArray.length);

                console.log('Total Appointments today:', successAppsArray.length);
                console.log('Pending Appointments today:', pendingAppsArray.length);
              })
              .catch((error) => {
                console.log('Error fetching Number App data:', error);
              });
          });
        })
        .catch((error) => {
          console.log('Error fetching data:', error);
        });
    }
    setRefresh(false);

    // Axios GET request to fetch doctors data
  }, [refresh]);

  const handleViewAppointment = (clinicId: string, dateOfApp: string) => {
    SecureStore.setItem('clinicId', clinicId);
    router.push('/getAppointment');
    console.log('HomeScreen Clinic ID:', clinicId);
  };

  return (
    <View flex={1} backgroundColor={colors.primary}>
      <Header>
        <TitleBar title="" />
      </Header>
      <YStack flex={1} paddingTop={paddingM} paddingHorizontal={spacingM}>
        <YStack
          borderRadius={borderRadiusM}
          padding={paddingM}
          gap={spacingM}
          backgroundColor={colors.lightGray}
          alignItems="center">
          <CusText bold size="lg" color="primary">
            Total Appointments today: {totalSuccessApps}
          </CusText>
          <CusText bold size="lg" color="primary">
            Pending Appointments today: {totalPendingApps}
          </CusText>
        </YStack>
        {loading ? (
          <View
            gap={spacingS}
            alignItems="center"
            position="absolute"
            alignSelf="center"
            height={loaderHeight}
            //width={loaderWidth}
            jc={'center'}>
            <CusText color="white" bold size="lg">
              Loading Clinics
            </CusText>
            <HeartLoader />
          </View>
        ) : (
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
              data={clinicArr}
              keyExtractor={(item: any) => item.id.toString()}
              renderItem={({ item }) => (
                <View paddingBottom={paddingL} gap={spacingS}>
                  {/* Doctor's information */}
                  <Card
                    padding={paddingM}
                    borderRadius={borderRadiusM}
                    backgroundColor={colors.white}
                    gap={spacingM}>
                    <View gap={spacingM} padding={paddingM}>
                      <XStack gap={5}>
                        <CusText bold size="md" color="yellow">
                          Clinic Name:
                        </CusText>
                        <CusText bold size="md" color="primary">
                          {item.clinic.name}
                        </CusText>
                      </XStack>
                      <XStack gap={spacingS}>
                        <CusText bold size="md" color="yellow">
                          Clinic Timing:
                        </CusText>
                        <CusText bold size="md" color="primary">
                          {item.startTime} - {item.endTime}
                        </CusText>
                      </XStack>
                      <XStack gap={5}>
                        <CusText bold size="md" color="yellow">
                          Charges:
                        </CusText>
                        <CusText bold size="md" color="primary">
                          {item.charges}
                        </CusText>
                      </XStack>
                    </View>
                    <XStack gap={5}>
                      {/* <CusBtn color={colors.yellow} textColor="white">
                        Get Token
                      </CusBtn> */}
                      <CusBtn
                        onPress={() =>
                          handleViewAppointment(item.clinic.id.toString(), '2024-03-04')
                        }
                        color={colors.yellow}
                        textColor="white">
                        View Appoinments
                      </CusBtn>
                    </XStack>
                  </Card>
                  {/* Check Appointment Button */}
                </View>
              )}
            />
          </YStack>
        )}
      </YStack>
    </View>
  );
};
export default Page;
