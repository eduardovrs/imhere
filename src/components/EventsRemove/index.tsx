import {addHours, format} from 'date-fns';
import React from 'react';

import {
  EventContainer,
  EventText,
  Title,
  DateText,
  RemoveEventButton,
  EventTextInputContainer,
} from './styles';

interface IProps {
  id: string;
  name: string;
  date: string;
  onRemove: () => void;
}

export default function EventRemove({name, onRemove, date, id}: IProps) {
  return (
    <>
      <EventContainer>
        <EventTextInputContainer>
          <EventText>{name}</EventText>
          <DateText>{format(new Date(date), 'dd/MM/yyyy HH:mm')}</DateText>
        </EventTextInputContainer>
        <RemoveEventButton onPress={onRemove}>
          <Title>-</Title>
        </RemoveEventButton>
      </EventContainer>
    </>
  );
}
