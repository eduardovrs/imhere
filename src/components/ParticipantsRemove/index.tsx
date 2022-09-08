import React from 'react';

import {
  ParticipantContainer,
  ParticipantText,
  Title,
  RemoveParticipantButton,
  ParticipantTextInputContainer,
} from './styles';

interface IProps {
  name: string;
  id: string;
  onRemove: () => void;
}

export default function ParticipantRemove({name, id, onRemove}: IProps) {
  return (
    <>
      <ParticipantContainer>
        <ParticipantTextInputContainer>
          <ParticipantText>{name}</ParticipantText>
        </ParticipantTextInputContainer>
        <RemoveParticipantButton onPress={onRemove}>
          <Title>-</Title>
        </RemoveParticipantButton>
      </ParticipantContainer>
    </>
  );
}
