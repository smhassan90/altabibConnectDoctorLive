import React, { useEffect, useState } from 'react';
import TitleBar from '~/components/TitleBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, styles } from '~/app/styles';
import { Card, Text, XStack } from 'tamagui';
import { tokenCache } from '~/app/getToken';
import axios from 'axios';
import { url } from '~/env';

const Page = () => {
  const [token, setToken] = useState('');
  const [patientName, setPatientName] = useState('');
  const [appDate, setAppDate] = useState('');
  const [tokenNumber, setTokenNumber] = useState('');
  const [charges, setCharges] = useState('');
  const [prescription, setPrescription] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [weight, setWeight] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [followupDate, setFollowupDate] = useState('');


  tokenCache.getToken('token').then((res) => {
    if (res) {
      setToken(res);
    } else {
      console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=');
      console.log('No token found');
    }
  });

  const fetchHistory = () => {
    axios
      .get(`${url}getPatientHistory?token=17098037520533984&patientId=2&doctorId=2`)
      .then((res) => {
        console.log("GET HISTORY RESPONSE: ",JSON.stringify(res.data.data,null,2));

        res.data.data.appointments.map((item: any) => {
          setPatientName(item.patientName);
          setAppDate(item.visitDate);
          setTokenNumber(item.tokenNumber);
          setCharges(item.charges);
          setPrescription(item.prescription);
          setDiagnosis(item.diagnosis);
          setWeight(item.weight);
          setBloodPressure(item.bloodPressure);
          setFollowupDate(item.followupDate);

          console.log('Patient Name:', patientName);
          console.log('Visit Date:', appDate);
          console.log('Token Number:', tokenNumber);
          console.log('Charges:', charges);
          console.log('Prescription:', prescription);
          console.log('Diagnosis:', diagnosis);
          console.log('Weight:', weight);
          console.log('Blood Pressure:', bloodPressure);
          console.log('Followup Date:', followupDate);
        });

      })
      .catch((err) => {
        console.log('ERROR FETCHING HISTORY:', err);
      });
  };

  useEffect(() => {
    fetchHistory()
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <TitleBar title="Patient History" />
      <Card
        unstyled
        borderWidth={1}
        borderColor={colors.white}
        padded
        justifyContent="center"
        backgroundColor={colors.lightGray}
        animation="bouncy"
        gap={10}>
        <XStack gap={10}>
          <Text color={colors.yellow} fontSize={16} fontFamily={'ArialB'}>
            Name:
          </Text>
          <Text color={colors.primary} fontSize={16} fontFamily={'ArialB'}>
            {patientName}
          </Text>
        </XStack>
        <XStack gap={10}>
          <Text color={colors.yellow} fontSize={16} fontFamily={'ArialB'}>
            Age:
          </Text>
          <Text color={colors.primary} fontSize={16} fontFamily={'ArialB'}>
            null
          </Text>
        </XStack>
        <XStack gap={10}>
          <Text color={colors.yellow} fontSize={16} fontFamily={'ArialB'}>
            Appointment Date:
          </Text>
          <Text color={colors.primary} fontSize={16} fontFamily={'ArialB'}>
            {appDate}
          </Text>
        </XStack>
        <XStack gap={10}>
          <Text color={colors.yellow} fontSize={16} fontFamily={'ArialB'}>
            Follow-up Date:
          </Text>
          <Text color={colors.primary} fontSize={16} fontFamily={'ArialB'}>
            {followupDate}
          </Text>
        </XStack>
        <XStack gap={10}>
          <Text color={colors.yellow} fontSize={16} fontFamily={'ArialB'}>
            Diagnosis
          </Text>
          <Text color={colors.primary} fontSize={16} fontFamily={'ArialB'}>
            {diagnosis}
          </Text>
        </XStack>
        <XStack gap={10}>
          <Text color={colors.yellow} fontSize={16} fontFamily={'ArialB'}>
            Prescription:
          </Text>
          <Text color={colors.primary} fontSize={16} fontFamily={'ArialB'}>
            {prescription}
          </Text>
        </XStack>
        <XStack gap={10}>
          <Text color={colors.yellow} fontSize={16} fontFamily={'ArialB'}>
            Charges:
          </Text>
          <Text color={colors.primary} fontSize={16} fontFamily={'ArialB'}>
            {charges}
          </Text>
        </XStack>
        <XStack gap={10}>
          <Text color={colors.yellow} fontSize={16} fontFamily={'ArialB'}>
            BP:
          </Text>
          <Text color={colors.primary} fontSize={16} fontFamily={'ArialB'}>
            {bloodPressure}
          </Text>
        </XStack>
        <XStack gap={10}>
          <Text color={colors.yellow} fontSize={16} fontFamily={'ArialB'}>
            Weight:
          </Text>
          <Text color={colors.primary} fontSize={16} fontFamily={'ArialB'}>
            {weight}
          </Text>
        </XStack>
      </Card>
    </SafeAreaView>
  );
};

export default Page;
