import {format} from 'date-fns';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {FlatList, ScrollView} from 'react-native';
import ParticipantRemove from '../../components/ParticipantsRemove';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import {
  Container,
  Title,
  Subtitile,
  ParticipantTextInput,
  AddPartipantButton,
  ParticipantContainer,
  BackButton,
  Icon,
} from './styles';

interface IParticipants {
  name: string;
  id: string;
}

const Participants = ({route, navigation}) => {
  const [participants, setParticipants] = useState([] as IParticipants[]);
  const [participantName, setParticipantName] = useState('');
  const [state, setState] = useState<boolean>(true);
  const randomId = String(Math.floor(1000000 + Math.random() * 999999));
  const [data, setData] = useState<IParticipants[]>([]);
  const [asyncInfo, setAsyncInfo] = useState<IParticipants[]>([]);
  const [teste, setTeste] = useState('');
  const dataKey = '@imhere:participants';

  async function addNewParticipant() {
    const verifyParticipantName = asyncInfo.some(item => {
      return item.name === participantName;
    });

    if (verifyParticipantName) {
      return Toast.show('Já existe um participante com esse nome');
    }

    if (!participantName) {
      return Toast.show('Não é possível adicionar um participante sem nome.');
    }

    const tempObj = {
      id: randomId,
      name: participantName,
    };

    setParticipants(prevState => [...prevState, tempObj]);
    setParticipantName('');

    try {
      const eventData = await AsyncStorage.getItem(dataKey);
      const curentData = eventData ? JSON.parse(eventData) : [];
      const formatedData = [...curentData, tempObj];
      await AsyncStorage.setItem(dataKey, JSON.stringify(formatedData));
      setState(!state);
    } catch (error) {
      console.log(error);
    }
  }

  const getAsyncParticipants = useCallback(async () => {
    const result = await AsyncStorage.getItem(dataKey);
    const formatedResult = result ? JSON.parse(result) : [];
    if (!result) {
      return;
    }
    setAsyncInfo(formatedResult);
  }, []);

  useEffect(() => {
    getAsyncParticipants();
  }, [getAsyncParticipants, state]);

  const removeAsyncParticipants = useCallback(
    async (id: string) => {
      const response = await AsyncStorage.getItem(dataKey);
      const previousData = response ? JSON.parse(response) : [];
      const removeParticipant = previousData.filter(
        (participant: IParticipants) => participant.id !== id,
      );
      setState(!state);
      await AsyncStorage.setItem(dataKey, JSON.stringify(removeParticipant));
      setData(removeParticipant);
    },
    [state],
  );

  const renderAsyncParticipants = useMemo(() => {
    return (
      <FlatList
        data={asyncInfo}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <ScrollView>
              <ParticipantRemove
                id={item.id}
                name={item.name}
                onRemove={() => {
                  removeAsyncParticipants(item.id);
                }}
              />
            </ScrollView>
          );
        }}
      />
    );
  }, [asyncInfo, removeAsyncParticipants]);

  return (
    <Container>
      <BackButton
        onPress={() => {
          navigation.navigate('Events');
        }}>
        <Icon name={'arrowleft'} />
      </BackButton>
      <Title>{route.params.name}</Title>
      <Subtitile>
        {format(new Date(route.params.date), 'dd/MM/yyyy HH:mm')}
      </Subtitile>
      <ParticipantContainer>
        <ParticipantTextInput
          placeholder={'Nome do participante'}
          placeholderTextColor={'#6b6b6b'}
          onChangeText={setParticipantName}
          value={participantName}
        />
        <AddPartipantButton onPress={addNewParticipant}>
          <Title>+</Title>
        </AddPartipantButton>
      </ParticipantContainer>
      {renderAsyncParticipants}
    </Container>
  );
};

export default Participants;
