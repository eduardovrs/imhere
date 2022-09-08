import styled from 'styled-components/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

export const Container = styled.View`
  flex: 1;
  background-color: #000000;
  padding: 15px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #ffffff;
`;

export const Subtitile = styled.Text`
  font-size: 15px;
  color: #c9c9c9;
`;

export const BackButton = styled.TouchableOpacity``;

export const Icon = styled(AntDesign)`
  font-size: 25px;
  color: #ffffff;
  margin-bottom: 15px;
`;

export const ParticipantContainer = styled.View`
  flex-direction: row;
  margin-top: 10px;
  margin-bottom: 40px;
`;

export const ParticipantTextInput = styled.TextInput`
  color: #ffffff;
  width: 80%;
  height: 56px;
  background-color: #1f1e25;
  border-radius: 10px;
  padding: 16px;
`;

export const AddPartipantButton = styled.TouchableOpacity`
  width: 15%;
  height: 56px;
  background-color: green;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  margin-left: 10px;
`;
