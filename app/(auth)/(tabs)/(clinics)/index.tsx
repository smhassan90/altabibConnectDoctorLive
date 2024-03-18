import { FlatList, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Card, Text, XStack, YStack } from 'tamagui';
import axios from 'axios';
import { colors, styles } from '~/app/styles';
import { url } from '~/env';
import TitleBar from '~/components/TitleBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Spinner from '~/components/Spinner';
import { TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const Page = () => {
  const [clinicArr, setclinicArr] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = SecureStore.getItem('token');
  //var totalApps = 0;
  const [totalAppointments, setTotalAppointment] = useState<number>();

  const [pendingApps, setPendingApps] = useState<number>();
  const [successApps, setSuccessApps] = useState<number>();

  //USE YOUR OWN URL!!
  useEffect(() => {
    // Axios GET request to fetch doctors data
    console.log('Token RES:', token);
    axios
      .get(`${url}getClinics?token=${token}`)
      .then((res) => {
        console.log('Response Clinic Data:', JSON.stringify(res.data.data, null, 2));
        
        SecureStore.setItem("doctorId",res.data.data.id.toString())


        setclinicArr(res.data.data.doctorClinicDALS);
        setLoading(false);

        // res.data.data.doctorClinicDALS.map((item: any) => {
        //   const clinicID = item.clinic.id;
        //   //console.log('Clinic ID:', item.clinic.id);
        //   axios
        //     .get(`${url}viewAppointments?token=${token}&visitDate=&clinicId=${clinicID}`)
        //     .then((res) => {
        //       //console.log('Response ViewAppointment Data:', JSON.stringify(res.data.data, null, 2));
        //       setTotalAppointment(res.data.data.appointments.length);
        //       //console.log('Total Overall Appointments:', totalAppointments);
        //     });
        // });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleViewAppointment = (clinicId: string, dateOfApp: string) => {
    SecureStore.setItem('clinicId', clinicId);
    router.push('/getAppointment');
    console.log('HomeScreen Clinic ID:', clinicId);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TitleBar />
      <Card padding={10} gap={10} backgroundColor={colors.lightGray} alignItems="center">
        <Text fontFamily={'ArialB'} color={colors.linkBlue} fontSize={18}>
          Total Appointments today: <Text color={colors.green}>{totalAppointments}</Text>
        </Text>
        <Text fontFamily={'ArialB'} color={colors.linkBlue} fontSize={18}>
          Completed Appointments today: <Text color={colors.green}>{successApps}</Text>
        </Text>
        <Text fontFamily={'ArialB'} color={colors.linkBlue} fontSize={18}>
          Pending Appointments today: <Text color={colors.yellow}>{pendingApps}</Text>
        </Text>
      </Card>
        {loading ? (
          <Spinner title="Loading your Clinics" />
        ) : (
          <>
            <Text fontFamily={'ArialB'} color={colors.white} alignSelf="center" fontSize={24}>
              Clinic List
            </Text>
            <FlatList
              refreshing={true}
              horizontal={false}
              decelerationRate="normal"
              data={clinicArr}
              //keyExtractor={(item: any) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={{ paddingBottom: 15, gap: 5 }}>
                  {/* Doctor's information */}
                  <Card
                    style={{
                      borderWidth: 1,
                      borderColor: colors.border,
                      padding: 10,
                      paddingVertical: 15,
                      borderRadius: 10,
                      backgroundColor: colors.white,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View style={{ gap: 10 }}>
                      <XStack gap={5}>
                        <Text fontFamily={'ArialB'} fontSize={'$6'} color={colors.yellow}>
                          Clinic ID:
                        </Text>
                        <Text fontFamily={'ArialB'} fontSize={'$6'} color={colors.linkBlue}>
                          {item.clinic.id}
                        </Text>
                      </XStack>
                      <XStack gap={5}>
                        <Text fontFamily={'ArialB'} fontSize={'$6'} color={colors.yellow}>
                          Clinic Name:
                        </Text>
                        <Text fontFamily={'ArialB'} fontSize={'$6'} color={colors.linkBlue}>
                          {item.clinic.name}
                        </Text>
                      </XStack>
                      <XStack gap={5}>
                        <Text fontFamily={'ArialB'} fontSize={'$6'} color={colors.yellow}>
                          Clinic Timings:
                        </Text>
                        <Text fontFamily={'ArialB'} fontSize={'$6'} color={colors.linkBlue}>
                          {item.startTime} - {item.endTime}
                        </Text>
                      </XStack>
                      <XStack gap={5}>
                        <Text fontFamily={'ArialB'} fontSize={'$6'} color={colors.yellow}>
                          Charges:
                        </Text>
                        <Text fontFamily={'ArialB'} fontSize={'$6'} color={colors.linkBlue}>
                          {item.charges}
                        </Text>
                      </XStack>
                    </View>
                  </Card>
                  {/* Check Appointment Button */}
                  <XStack gap={5}>
                    <TouchableOpacity activeOpacity={0.6} style={[styles.primBtn,{flex:1}]}>
                      <Text color={colors.white} fontSize={13} fontFamily={'ArialB'}>
                        Get Token
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.6}
                      onPress={() => handleViewAppointment(item.clinic.id.toString(), '2024-03-04')}
                      style={[styles.secBtn,{flex:1}]}>
                      <Text color={colors.white} fontSize={13} fontFamily={'ArialB'}>
                        View Appoinments
                      </Text>
                    </TouchableOpacity>
                  </XStack>
                </View>
              )}
            />
          </>
        )}

    </SafeAreaView>
  );
};
export default Page;