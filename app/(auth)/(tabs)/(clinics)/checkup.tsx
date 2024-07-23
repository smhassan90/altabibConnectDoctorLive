import React, { useEffect, useState } from 'react';
import { colors, spacingM, spacingS } from '~/app/styles';
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
import { Modal, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import dayjs from 'dayjs';
import DateTimePicker, { DateType } from 'react-native-ui-datepicker';
import { BlurView } from 'expo-blur';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import { url } from '~/env';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { ALERT_TYPE, AlertNotificationRoot, Dialog } from 'react-native-alert-notification';
import * as SecureStore from 'expo-secure-store';
import Header from '~/components/Header';
import { CusText } from '~/components/CusText';
import { useSelector } from 'react-redux';

const Page = () => {
  const router = useRouter();

  const token = SecureStore.getItem('token');

  const selectedPatient = useSelector((state: any) => state.selectedPatient);

  console.log('Selected Patient for checkup:', JSON.stringify(selectedPatient, null, 2));

  const [date, setDate] = useState<DateType>(dayjs());
  const [isModalVisible, setIsModalVisible] = useState(false);
  const currDate = date ? dayjs(date).format('YYYY-MM-DD') : 'Choose Follow-up Date';

  const follDate = dayjs(date).format('YYYY-MM-DD');

  const [charges, setCharges] = useState('');
  const [prescription, setPrescription] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [weight, setWeight] = useState<number>();

  const [upBloodPressure, setUpBloodPressure] = useState('');
  const [lowBloodPressure, setLowBloodPressure] = useState('');

  const bp: string = `${upBloodPressure}/${lowBloodPressure}`;

  const [followupDate, setFollowupDate] = useState('');
  const [checked, setChecked] = useState(false);

  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const [treatments, setTreatments] = useState([]);

  const handleUpBpChange = (val: string) => setUpBloodPressure(val);
  const handleLowBpChange = (val: string) => setLowBloodPressure(val);

  const handleWeightChange = (val: number) => {
    console.log('New weight value:', val);
    setWeight(val);
  };
  const handleChargesChange = (val: string) => setCharges(val);
  const handlePrescriptionChange = (val: string) => setPrescription(val);
  const handleDiagnosisChange = (val: string) => setDiagnosis(val);

  const dropdownItems = [
    {
      id: 4,
      name: 'Root Canal',
      charges: 0,
      doctorType: 3,
      updateDate: '2022-09-01 09:56:08',
    },
    {
      id: 5,
      name: 'Consultation',
      charges: 0,
      doctorType: 3,
      updateDate: '2022-09-01 09:56:08',
    },
    {
      id: 6,
      name: 'X-RAY',
      charges: 0,
      doctorType: 3,
      updateDate: '2022-09-01 09:56:08',
    },
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

  const appObj = {
    id: selectedPatient.selectedPatient.id,
    patientName: selectedPatient.selectedPatient.patientName,
    clinicName: selectedPatient.selectedPatient.clinicName,
    doctorName: selectedPatient.selectedPatient.doctorName,
    visitDate: checked ? selectedPatient.selectedPatient.visitDate : follDate,
    tokenNumber: selectedPatient.selectedPatient.tokenNumber,
    status: checked ? 1 : 0,
    clinicTotalAppointments: selectedPatient.selectedPatient.clinicTotalAppointments,
    clinicLastAppointmentToken: selectedPatient.selectedPatient.clinicLastAppointmentToken,
    charges: charges,
    prescription: prescription,
    diagnosis: diagnosis,
    weight: weight,
    bloodPressure: bp,
    followupDate: checked ? ' ' : follDate,
    patientId: selectedPatient.selectedPatient.patientId,
    clinicId: selectedPatient.selectedPatient.clinicId,
    doctorId: selectedPatient.selectedPatient.doctorId,
    //hardcoded treatment for now
    treatments: [{ id: 1, name: 'Crown Luting', detail: 'Detail 1' }],
  };

  const encodedAppObj = encodeURIComponent(JSON.stringify(appObj));

  const updateAppointment = () => {
    console.log('checkbox:', checked);
    axios
      .get(`${url}setAppointment?token=${token}&appointment=${encodedAppObj}`)
      .then((res) => {
        console.log('Response:', JSON.stringify(res.data, null, 2));

        console.log('APPOBJ:', JSON.stringify(appObj, null, 2));

        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Appointment Completed',
          textBody: 'This appointment was completed successfully',
          button: 'Close',
          onPressButton() {
            // router.push('/(auth)/(tabs)/(clinics)');
            Dialog.hide();
          },
        });
      })
      .catch((error) => {
        console.error('Error updating appointment:', error);
        console.log('APPOBJ:', JSON.stringify(appObj, null, 2));
      });
  };

  return (
    <AlertNotificationRoot>
      <View flex={1} backgroundColor={colors.primary}>
        <Header>
          <TitleBar title="Checkup" />
        </Header>
        <YStack flex={1} gap={spacingM} padding={spacingM}>
          <Card gap={spacingM} padded backgroundColor={colors.white}>
            {/* Patient Details */}

            <XStack gap={spacingS}>
              <CusText bold size="md" color="primary">
                Name:
              </CusText>
              <CusText bold size="md" color="yellow">
                {selectedPatient.selectedPatient.patientName}
              </CusText>
            </XStack>
            <XStack gap={spacingS}>
              <CusText bold size="md" color="primary">
                Age:
              </CusText>
              <CusText bold size="md" color="yellow">
                {selectedPatient.selectedPatient.age}
              </CusText>
            </XStack>
            <XStack gap={spacingS}>
              <CusText bold size="md" color="primary">
                Visit Date:
              </CusText>
              <CusText bold size="md" color="yellow">
                {selectedPatient.selectedPatient.visitDate &&
                  dayjs(selectedPatient.selectedPatient.visitDate).format('D/M/YYYY')}
              </CusText>
            </XStack>
            <XStack gap={spacingS}>
              <CusText bold size="md" color="primary">
                Appointment Token:
              </CusText>
              <CusText bold size="md" color="yellow">
                {selectedPatient.selectedPatient.tokenNumber}
              </CusText>
            </XStack>
          </Card>

          {/* Checkup Card */}

          <Card padded flex={1} backgroundColor={colors.white}>
            {/* Vital Signs */}

            <ScrollView style={{ flex: 1 }}>
              <YStack gap={spacingM}>
                <XStack
                  alignItems="center"
                  borderRadius={5}
                  backgroundColor={'white'}
                  gap={spacingS}>
                  <TextInput
                    value={upBloodPressure}
                    onChangeText={handleUpBpChange}
                    placeholderTextColor={colors.primary}
                    placeholder="Upper BP"
                    keyboardType="numeric"
                    style={styl.input}></TextInput>
                  <TextInput
                    keyboardType="numeric"
                    onChangeText={handleLowBpChange}
                    placeholderTextColor={colors.primary}
                    placeholder="Lower BP"
                    style={styl.input}></TextInput>
                </XStack>

                {/* Weight */}

                <XStack
                  alignItems="center"
                  borderRadius={5}
                  backgroundColor={'white'}
                  gap={spacingS}>
                  <TextInput
                    keyboardType="numeric"
                    onChangeText={handleWeightChange}
                    placeholder="Weight"
                    placeholderTextColor={colors.primary}
                    style={styl.input}
                  />
                </XStack>

                {/* Charges */}

                <XStack
                  alignItems="center"
                  borderRadius={5}
                  backgroundColor={'white'}
                  gap={spacingS}>
                  <TextInput
                    keyboardType="numeric"
                    onChangeText={handleChargesChange}
                    placeholder="Charges"
                    placeholderTextColor={colors.primary}
                    style={styl.input}></TextInput>
                </XStack>

                {/* Prescription */}

                <XStack
                  alignItems="center"
                  borderRadius={5}
                  backgroundColor={'white'}
                  gap={spacingS}>
                  <TextInput
                    onChangeText={handlePrescriptionChange}
                    placeholder="Prescription"
                    placeholderTextColor={colors.primary}
                    style={styl.input}></TextInput>
                </XStack>

                {/* Diagnosis */}

                <XStack
                  alignItems="center"
                  borderRadius={5}
                  backgroundColor={'white'}
                  gap={spacingS}>
                  <TextInput
                    onChangeText={handleDiagnosisChange}
                    placeholder="Diagnosis"
                    placeholderTextColor={colors.primary}
                    style={styl.input}></TextInput>
                </XStack>

                {/* Treatment Selector */}

                <Card
                  gap={spacingM}
                  borderWidth={2}
                  borderColor={colors.yellow}
                  borderRadius={10}
                  unstyled
                  padded>
                  <CusText bold size="md" color="primary">
                    Select Treatment
                  </CusText>
                  <View gap={spacingM}>
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
                      style={styl.input}></TextInput>

                    <Button
                      backgroundColor={colors.primary}
                      fontFamily={'ArialB'}
                      onPress={handleAddTreatment}>
                      Add Treatment
                    </Button>
                    {treatments.map((treatment, index) => (
                      <Card
                        gap={spacingM}
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

                {/* Choose followup Date */}

                <CusText bold size="md" color="primary">
                  Choose Follow-up Date:
                </CusText>
                <Button onPress={() => setIsModalVisible(true)} backgroundColor={colors.yellow}>
                  <ButtonText fontFamily={'ArialB'}>{currDate}</ButtonText>
                </Button>

                {/*  Checkbox completed */}

                <CheckboxWithLabel size="$4" checked={checked} onChange={setChecked} />

                {/* Checkup Completed */}

                <XStack gap={spacingM}>
                  <Button flex={1} backgroundColor={colors.yellow}>
                    <ButtonText
                      onPress={() => router.push('/patientHistory')}
                      fontFamily={'ArialB'}>
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
        </YStack>
      </View>
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
  checked,
  onChange,
  label = 'Checkup Completed',
  ...checkboxProps
}: CheckboxProps & {
  size: SizeTokens;
  label?: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  const id = `checkbox-${size.toString().slice(1)}`;
  return (
    <XStack width={300} alignItems="center" space="$2">
      <Checkbox
        //defaultChecked
        backgroundColor={colors.lightGray}
        borderColor={colors.primary}
        borderWidth={2}
        checked={checked}
        onCheckedChange={onChange}
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

const styl = StyleSheet.create({
  input: {
    fontFamily: 'ArialB',
    flex: 1,
    borderBottomColor: colors.yellow,
    padding: 0,
    borderBottomWidth: 2,
  },
});
