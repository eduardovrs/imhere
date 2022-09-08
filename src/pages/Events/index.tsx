import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useContext,
} from 'react';
import {FlatList, ScrollView, TouchableOpacity} from 'react-native';
import EventRemove from '../../components/EventsRemove';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import DatePicker from 'react-native-date-picker';
import {format} from 'date-fns';
import {
  Container,
  Title,
  EventTextInput,
  AddEventButton,
  EventContainer,
  EventTextInputContainer,
  DateText,
  DateButton,
  DateButtonText,
} from './styles';
interface IEvents {
  name: string;
  date: string;
  id: string;
}

const Events = ({navigation}) => {
  const [events, setEvents] = useState([] as IEvents[]);
  const [state, setState] = useState<boolean>(true);
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState<Date>(new Date());
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<IEvents[]>([]);
  const randomId = String(Math.floor(1000000 + Math.random() * 999999));
  const [asyncInfo, setAsyncInfo] = useState<IEvents[]>([]);
  const dataKey = '@imhere:events';

  const getAsyncItems = useCallback(async () => {
    const result = await AsyncStorage.getItem(dataKey);
    const formatedResult = result ? JSON.parse(result) : [];
    if (!result) {
      return;
    }
    setAsyncInfo(formatedResult as unknown as IEvents[]);
  }, []);

  useEffect(() => {
    getAsyncItems();
  }, [getAsyncItems, state]);

  async function addNewEvent() {
    const verifyEventName = asyncInfo.some(item => {
      return item.name === eventName;
    });

    if (verifyEventName) {
      return Toast.show('Já existe um evento com esse nome.');
    }

    if (!eventName) {
      return Toast.show('Não é possível adicionar um evento sem nome.');
    }
    const tempObj = {
      id: randomId,
      name: eventName,
      date: eventDate,
    };
    setEvents(prevState => [...prevState, tempObj]);
    setEventName('');

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

  const removeAsyncEvent = useCallback(
    async (id: string) => {
      const response = await AsyncStorage.getItem(dataKey);
      const previousData = response ? JSON.parse(response) : [];

      const removeEvent = previousData.filter(
        (event: IEvents) => event.id !== id,
      );
      await AsyncStorage.setItem(dataKey, JSON.stringify(removeEvent));
      setData(removeEvent);
      setState(!state);
    },
    [state],
  );

  const renderAsyncItems = useMemo(() => {
    return (
      <FlatList
        data={asyncInfo}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <ScrollView>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Participants', {
                    name: item.name,
                    date: item.date,
                  });
                }}>
                <EventRemove
                  id={item.id}
                  date={item.date}
                  name={item.name}
                  onRemove={() => {
                    removeAsyncEvent(item.id);
                  }}
                />
              </TouchableOpacity>
            </ScrollView>
          );
        }}
      />
    );
  }, [asyncInfo, navigation, removeAsyncEvent]);

  return (
    <Container>
      <Title>Adicionar novo evento</Title>
      <EventContainer>
        <EventTextInputContainer>
          <EventTextInput
            placeholder={'Nome do evento'}
            placeholderTextColor={'#6b6b6b'}
            onChangeText={setEventName}
            value={eventName}
          />
          <DateText>{format(new Date(eventDate), 'dd/MM/yyyy HH:mm')}</DateText>
          <DateButton onPress={() => setOpen(true)}>
            <DateButtonText>Escolher Data</DateButtonText>
            <DatePicker
              modal
              title={'Selecione a data do evento'}
              open={open}
              date={eventDate}
              mode={'datetime'}
              locale={'pt_BR'}
              is24hourSource="locale"
              onConfirm={date => {
                setOpen(false);
                setEventDate(date);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
          </DateButton>
        </EventTextInputContainer>
        <AddEventButton
          onPress={() => {
            addNewEvent();
          }}>
          <Title>+</Title>
        </AddEventButton>
      </EventContainer>
      <Title>Lista de eventos</Title>
      {renderAsyncItems}
    </Container>
  );
};

export default Events;
