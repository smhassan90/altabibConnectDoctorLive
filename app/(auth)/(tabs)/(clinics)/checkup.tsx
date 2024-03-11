import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, styles } from '~/app/styles';
import TitleBar from '~/components/TitleBar';
import {
  Button,
  ButtonText,
  Card,
  Text,
  View,
  XStack,
  Checkbox,
  Label,
  CheckboxProps,
  SizeTokens,
  ScrollView,
  YStack,
} from 'tamagui';
import { Alert, Modal, TextInput, TouchableOpacity } from 'react-native';
import dayjs from 'dayjs';
import DateTimePicker, { DateType } from 'react-native-ui-datepicker';
import { BlurView } from 'expo-blur';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import { url } from '~/env';
import { appointmentData, clinicData } from '~/app/getToken';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { ALERT_TYPE, AlertNotificationRoot, Dialog } from 'react-native-alert-notification';

const Page = () => {
  const router = useRouter();

  const [date, setDate] = useState<DateType>(dayjs());
  const [isModalVisible, setIsModalVisible] = useState(false);
  const currDate = date ? dayjs(date).format('YYYY-MM-DD') : 'Choose Follow-up Date';

  const follDate = dayjs(date).format('YYYY-MM-DD');

  const [clinicId, setClinicId] = useState<number>();
  const [appId, setAppId] = useState<number>();

  const [patientName, setPatientName] = useState('');
  const [clinicName, setclinicName] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [tokenNumber, setTokenNumber] = useState(0);

  const [clinicTotalAppointments, setClinicTotalAppointments] = useState(0);
  const [clinicLastAppointmentToken, setClinicLastAppointmentToken] = useState(0);

  const [charges, setCharges] = useState('');
  const [prescription, setPrescription] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [weight, setWeight] = useState('');

  const [upBloodPressure, setUpBloodPressure] = useState('');
  const [lowBloodPressure, setLowBloodPressure] = useState('');

  const bp: string = `${upBloodPressure}/${lowBloodPressure}`;

  const [followupDate, setFollowupDate] = useState('');
  const [checked, setChecked] = useState(false);

  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const [details, setDetails] = useState('');
  const [treatments, setTreatments] = useState([]);

  const handleUpBpChange = (val: string) => setUpBloodPressure(val);
  const handleLowBpChange = (val: string) => setLowBloodPressure(val);

  const handleWeightChange = (val: number) => setWeight(val);
  const handleChargesChange = (val: number) => setCharges(val);
  const handlePrescriptionChange = (val: string) => setPrescription(val);
  const handleDiagnosisChange = (val: string) => setDiagnosis(val);
  //const handleDetailChange = (val: string) => setTreatDetail(val);
  const handleFollowupDateChange = (val: string) => setFollowupDate(val);
  const handelCheckBox = (val: boolean) => setChecked(!checked);

  const dropdownItems = [
    { id: 1, name: 'Crown Luting', detail: 'Detail 1' },
    { id: 2, name: 'Dental Implant', detail: 'Detail 2' },
    { id: 3, name: 'Whitening Treatment', detail: 'Detail 3' },
    // Add more items as needed
  ];

  const handleAddTreatment = () => {
    if (selectedTreatment && !treatments.find((t) => t.id === selectedTreatment.id)) {
      const newTreatment = {
        id: selectedTreatment.id,
        name: selectedTreatment.name,
      };
      setTreatments([...treatments, newTreatment]);
    }
  };

  useEffect(() => {
    // Set initial selected treatment if available
    if (dropdownItems.length > 0 && !selectedTreatment) {
      setSelectedTreatment(dropdownItems[0]);
    }
  }, [dropdownItems, selectedTreatment]);

  useEffect(() => {
    // Axios GET request to fetch doctors data
    fetchSetCheckupData();
  }, []);

  const fetchSetCheckupData = () => {
    clinicData.getClinicId('clinicId').then((res) => {
      if (res) {
        setClinicId(res);
        console.log('ClinicId:', res);
      }
    });
    appointmentData.getAppointmentId('appointmentId').then((res) => {
      if (res) {
        setAppId(res);
        console.log('AppointmentId:', res);
      }
    });

    axios
      .get(`${url}viewAppointments?token=17098037520533984&visitDate=&clinicId=1`)
      .then((res) => {
        console.log('Checkup Response:', JSON.stringify(res.data.data, null, 2));

        res.data.data.appointments.map((item: any) => {
          setAppId(item.id);
          setPatientName(item.patientName);
          setclinicName(item.clinicName);
          setDoctorName(item.doctorName);
          setVisitDate(item.visitDate);
          setTokenNumber(item.tokenNumber);

          console.log('Response id: ', item.id);
          console.log('Response patientName: ', item.patientName);
          console.log('Response clinicName: ', item.clinicName);
          console.log('Response doctorName: ', item.doctorName);
          console.log('Response visitDate: ', item.visitDate);
          console.log('Response tokenNumber: ', item.tokenNumber);
        });

        console.log('Appointment Id:', appId);
        console.log('Patient Name:', patientName);
        console.log('Clinic Name:', clinicName);
        console.log('Doctor Name:', doctorName);
        console.log('Visit Date:', visitDate);
        console.log('Token Number:', tokenNumber);
        console.log('Followup Date:', follDate);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const [selected, setSelected] = useState([]);
  const [treatDetail, setTreatDetail] = useState([]);

  const appObj = {
    id: appId,
    patientName: patientName,
    clinicName: clinicName,
    doctorName: doctorName,
    visitDate: visitDate,
    tokenNumber: tokenNumber,
    status: 1,
    clinicTotalAppointments: clinicTotalAppointments,
    clinicLastAppointmentToken: clinicLastAppointmentToken,
    charges: charges,
    prescription: prescription,
    diagnosis: diagnosis,
    weight: weight,
    bloodPressure: bp,
    followupDate: follDate,
    patientId: 2,
    clinicId: clinicId,
    doctorId: 2,
  };

  const encodedAppObj = encodeURIComponent(JSON.stringify(appObj));

  const updateAppointment = () => {
    axios
      .get(`${url}setAppointment?token=17098037520533984&appointment=${encodedAppObj}`)
      .then((res) => {
        //console.log('Response:', JSON.stringify(res.data, null, 2));

        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Appointment Completed",
          textBody: "This appointment was completed successfully",
          button: "Close",
          onPressButton() {
            router.push("/(auth)/(tabs)/(clinics)");
          },
        });

        console.log('BP: ', bp);
        console.log('Weight: ', weight);
        console.log('Charges: ', charges);
        console.log('Prescription: ', prescription);
        console.log('Diagnosis: ', diagnosis);
        console.log('Followup Date: ', follDate);
      })
      .catch((error) => {
        console.error('Error updating appointment:', error);
      });
  };

  return (
    <AlertNotificationRoot>
      <SafeAreaView style={styles.safeArea}>
        <TitleBar title="Check Up" />
        <Card gap={10} padded backgroundColor={colors.white}>
          {/* Patient Details */}

          <XStack gap={5}>
            <Text fontFamily={'ArialB'} fontSize={20} color={colors.primary}>
              Name:
            </Text>
            <Text fontFamily={'ArialB'} fontSize={20} color={colors.yellow}>
              {patientName}
            </Text>
          </XStack>
          <XStack gap={5}>
            <Text fontFamily={'ArialB'} fontSize={20} color={colors.primary}>
              Age:
            </Text>
            <Text fontFamily={'ArialB'} fontSize={20} color={colors.yellow}>
              null
            </Text>
          </XStack>
          <XStack gap={5}>
            <Text fontFamily={'ArialB'} fontSize={20} color={colors.primary}>
              Visit Date:
            </Text>
            <Text fontFamily={'ArialB'} fontSize={20} color={colors.yellow}>
              {visitDate}
            </Text>
          </XStack>
          <XStack gap={5}>
            <Text fontFamily={'ArialB'} fontSize={20} color={colors.primary}>
              Appointment Token:
            </Text>
            <Text fontFamily={'ArialB'} fontSize={20} color={colors.yellow}>
              {tokenNumber}
            </Text>
          </XStack>
        </Card>

        {/* Checkup Card */}

        <Card padded flex={1} backgroundColor={colors.white}>
          {/* Vital Signs */}

          <ScrollView style={{ flex: 1 }}>
            <YStack gap={10}>
              <XStack alignItems="center" borderRadius={5} backgroundColor={'white'} gap={5}>
                <TextInput
                  value={upBloodPressure}
                  onChangeText={handleUpBpChange}
                  placeholderTextColor={colors.primary}
                  placeholder="Upper BP"
                  style={{
                    fontFamily: 'ArialB',
                    flex: 1,
                    borderBottomColor: colors.yellow,
                    padding: 0,
                    borderBottomWidth: 2,
                  }}></TextInput>
                <TextInput
                  onChangeText={handleLowBpChange}
                  placeholderTextColor={colors.primary}
                  placeholder="Lower BP"
                  style={{
                    fontFamily: 'ArialB',
                    flex: 1,
                    borderBottomColor: colors.yellow,
                    padding: 0,
                    borderBottomWidth: 2,
                  }}></TextInput>
              </XStack>

              {/* Weight */}

              <XStack alignItems="center" borderRadius={5} backgroundColor={'white'} gap={5}>
                <TextInput
                onChangeText={handleWeightChange}
                  placeholder="Weight"
                  placeholderTextColor={colors.primary}
                  style={{
                    fontFamily: 'ArialB',
                    flex: 1,
                    borderBottomColor: colors.yellow,
                    padding: 0,
                    borderBottomWidth: 2,
                  }}></TextInput>
              </XStack>

              {/* Charges */}

              <XStack alignItems="center" borderRadius={5} backgroundColor={'white'} gap={5}>
                <TextInput
                  onChangeText={handleChargesChange}
                  placeholder="Charges"
                  placeholderTextColor={colors.primary}
                  style={{
                    flex: 1,
                    fontFamily: 'ArialB',
                    borderBottomColor: colors.yellow,
                    padding: 0,
                    borderBottomWidth: 2,
                  }}></TextInput>
              </XStack>

              {/* Prescription */}

              <XStack alignItems="center" borderRadius={5} backgroundColor={'white'} gap={5}>
                <TextInput
                onChangeText={handlePrescriptionChange}
                  placeholder="Prescription"
                  placeholderTextColor={colors.primary}
                  style={{
                    flex: 1,
                    fontFamily: 'ArialB',
                    borderBottomColor: colors.yellow,
                    padding: 0,
                    borderBottomWidth: 2,
                  }}></TextInput>
              </XStack>

              {/* Diagnosis */}

              <XStack alignItems="center" borderRadius={5} backgroundColor={'white'} gap={5}>
                <TextInput
                  onChangeText={handleDiagnosisChange}
                  placeholder="Diagnosis"
                  placeholderTextColor={colors.primary}
                  style={{
                    flex: 1,
                    fontFamily: 'ArialB',
                    borderBottomColor: colors.yellow,
                    padding: 0,
                    borderBottomWidth: 2,
                  }}></TextInput>
              </XStack>

              {/* Treatment Selector */}

              <Card
                gap={10}
                borderWidth={2}
                borderColor={colors.yellow}
                borderRadius={10}
                unstyled
                padded>
                <Text>Select Treatment</Text>
                <View gap={10}>
                  <Picker
                    mode="dropdown"
                    selectedValue={selectedTreatment}
                    onValueChange={(itemValue: any, itemIndex: any) =>
                      setSelectedTreatment(itemValue)
                    }>
                    {selectedTreatment ? null : (
                      <Picker.Item label="Select a treatment" value={null} />
                    )}
                    {dropdownItems
                      .filter((item) => item !== selectedTreatment)
                      .map((item, index) => (
                        <Picker.Item key={index} label={item.name} value={item} />
                      ))}
                  </Picker>

                  <TextInput
                    placeholder="Detail"
                    placeholderTextColor={colors.primary}
                    style={{
                      fontFamily: 'ArialB',
                      flex: 1,
                      borderBottomColor: colors.yellow,
                      padding: 0,
                      borderBottomWidth: 2,
                    }}></TextInput>

                  <Button
                    backgroundColor={colors.primary}
                    fontFamily={'ArialB'}
                    onPress={handleAddTreatment}>
                    Add Treatment
                  </Button>
                  {treatments.map((treatment, index) => (
                    <Card
                      gap={10}
                      borderWidth={2}
                      borderColor={colors.yellow}
                      borderRadius={10}
                      unstyled
                      padded
                      flexDirection="row"
                      justifyContent="space-around"
                      alignItems="center"
                      key={index}>
                      <Text>{treatment.name}</Text>
                      <FontAwesome name="check-circle" size={24} color={colors.primary} />
                    </Card>
                  ))}
                </View>
              </Card>

              {/* Detail */}

              {/* <XStack alignItems="center" borderRadius={5} backgroundColor={'white'} gap={5}>
                <TextInput
                  placeholder="Detail"
                  placeholderTextColor={colors.primary}
                  style={{
                    fontFamily: 'ArialB',
                    flex: 1,
                    borderBottomColor: colors.yellow,
                    padding: 0,
                    borderBottomWidth: 2,
                  }}></TextInput>
              </XStack> */}

              {/* Choose followup Date */}

              <Text fontFamily={'ArialB'} color={colors.primary} fontSize={18}>
                Choose Follow-up Date:
              </Text>
              <Button onPress={() => setIsModalVisible(true)} backgroundColor={colors.yellow}>
                <ButtonText fontFamily={'ArialB'}>{currDate}</ButtonText>
              </Button>

              {/*  Checkbox completed */}

              <CheckboxWithLabel size="$4" defaultChecked={checked} />

              {/* Checkup Completed */}

              <XStack gap={10}>
                <Button flex={1} backgroundColor={colors.yellow}>
                  <ButtonText onPress={() => router.push('/patientHistory')} fontFamily={'ArialB'}>
                    Patient History
                  </ButtonText>
                </Button>
                <Button onPress={updateAppointment} flex={1} backgroundColor={colors.primary}>
                  <ButtonText fontFamily={'ArialB'}>Submit</ButtonText>
                </Button>
              </XStack>
            </YStack>
          </ScrollView>
        </Card>
      </SafeAreaView>
      <Modal
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
        animationType="fade">
        <BlurView
          style={{
            padding: 15,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          experimentalBlurMethod="dimezisBlurView">
          <View alignItems="center" backgroundColor={'white'} padding={10} borderRadius={10}>
            <Text fontFamily={'ArialB'} fontSize={22} color={colors.primary} marginBottom={15}>
              Choose Follow-up Date
            </Text>
            <DateTimePicker
              dayContainerStyle={{
                borderWidth: 2,
                borderRadius: 10,
                backgroundColor: 'white',
                borderColor: colors.primary,
              }}
              headerButtonStyle={{ backgroundColor: 'white', borderRadius: 7 }}
              headerContainerStyle={{
                paddingHorizontal: 5,
                backgroundColor: colors.primary,
                borderRadius: 10,
              }}
              headerTextStyle={{
                color: 'white',
                fontSize: 20,
                fontFamily: 'ArialB',
              }}
              displayFullDays={true}
              weekDaysTextStyle={{ color: colors.primary, fontFamily: 'ArialB' }}
              todayTextStyle={{ color: colors.primary, fontFamily: 'ArialB' }}
              headerButtonColor={colors.primary}
              selectedItemColor={colors.primary}
              mode="single"
              date={date}
              onChange={(date) => setDate(date.date)}
            />
            <XStack>
              <TouchableOpacity
                style={{
                  padding: 15,
                  borderRadius: 5,
                  alignItems: 'center',
                  backgroundColor: colors.primary,
                  flex: 1,
                }}
                onPress={() => setIsModalVisible(false)}>
                <Text color={colors.white} fontFamily={'ArialB'}>
                  Close
                </Text>
              </TouchableOpacity>
            </XStack>
          </View>
        </BlurView>
      </Modal>
    </AlertNotificationRoot>
  );
};

function CheckboxWithLabel({
  size,
  label = 'Checkup Completed',
  ...checkboxProps
}: CheckboxProps & { size: SizeTokens; label?: string }) {
  const id = `checkbox-${size.toString().slice(1)}`;
  return (
    <XStack width={300} alignItems="center" space="$2">
      <Checkbox
        //defaultChecked
        backgroundColor={colors.lightGray}
        borderColor={colors.primary}
        borderWidth={2}
        id={id}
        size={size}
        {...checkboxProps}>
        <Checkbox.Indicator>
          <AntDesign name="check" size={16} color={colors.primary} />
        </Checkbox.Indicator>
      </Checkbox>

      <Label fontFamily={'ArialB'} color={colors.primary} size={size} htmlFor={id}>
        {label}
      </Label>
    </XStack>
  );
}
export default Page;
