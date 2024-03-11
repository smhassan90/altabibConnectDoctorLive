import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import TitleBar from '~/components/TitleBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, styles } from '~/app/styles';
import { Card, Image, Text, XStack } from 'tamagui';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import { url } from '~/env';

export default function Page() {

  const [docName, setDocName] = useState('');
  const [userName, setUserName] = useState('');
  const [address, setAddress] = useState('');
  const [qualifications, setQualifications] = useState([]);
  const [age , setAge] = useState('');


  useEffect(() => {

    // Axios GET request to fetch user data
    axios
      .get(
        `${url}getClinics?token=17098037520533984`
      )
      .then((res) => {
        console.log('Response Clinic Data:', JSON.stringify(res.data.data, null, 2));

        setDocName(res.data.data.name);
        setUserName(res.data.data.username);
        setAddress(res.data.data.address);
        setQualifications(res.data.data.qualifications);
        setAge(res.data.data.age);
        
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);


  return (
    <SafeAreaView style={styles.safeArea}>
      <TitleBar title="Profile" />
      <Card gap={20} unstyled padded backgroundColor={'white'}>
        <Image
          alignSelf="center"
          height={100}
          width={100}
          borderRadius={50}
          source={{
            uri: 'https://lh3.googleusercontent.com/pw/ABLVV87DzwHP62UImU7R1nHuilbogC05sWMFkxIszzTzyME0YlXojhRgXQsDdn6S-ZQLVJhAlabuAEXUhNfJKTk5yYeYEGOmcfj0usKvHCrRv_SwepxHDhKCoVInKg-4nhSkmOMjjWtXDTZu-ut6e-NtC3fnhQ=w607-h607-s-no-gm',
          }}
        />
        <XStack>
          <Text color={colors.yellow} fontFamily={"ArialB"}>User Name: </Text>
          <Text color={colors.primary} fontFamily={"ArialB"}>{userName}</Text>
        </XStack>
        <XStack>
          <Text color={colors.yellow} fontFamily={"ArialB"}>Name: </Text>
          <Text color={colors.primary} fontFamily={"ArialB"}>{docName}</Text>
        </XStack>
        <XStack>
          <Text color={colors.yellow} fontFamily={"ArialB"}>Address: </Text>
          <Text color={colors.primary} fontFamily={"ArialB"}>{address}</Text>
        </XStack>
        <XStack>
          <Text color={colors.yellow} fontFamily={"ArialB"}>Qualifications: </Text>
          <Text color={colors.primary} fontFamily={"ArialB"}>BDS, MBBS, FCPS</Text>
        </XStack>
        <TouchableOpacity style={styles.primBtn} onPress={() => {}}>
          <Text fontFamily={"ArialB"} color={colors.white}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secBtn} onPress={() => {}}>
          <Text fontFamily={"ArialB"} color={colors.white}>Logout</Text>
        </TouchableOpacity>
      </Card>
    </SafeAreaView>
  );
}