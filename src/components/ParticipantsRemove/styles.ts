import styled from 'styled-components/native';

export const ParticipantContainer = styled.View`
  flex: 1;
  flex-direction: row;
  margin-top: 10px;
`;

export const ParticipantText = styled.Text`
  color: #ffffff;
  width: 100%;
  height: 56px;
  background-color: #1f1e25;
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 8px;
`;

export const RemoveParticipantButton = styled.TouchableOpacity`
  width: 15%;
  height: 56px;
  background-color: red;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #ffffff;
`;

export const ParticipantTextInputContainer = styled.View`
  flex-direction: column;
  width: 80%;
  margin-right: 15px;
`;
