import styled from 'styled-components/native';

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

export const EventContainer = styled.View`
  flex-direction: row;
  margin-top: 10px;
`;

export const EventTextInputContainer = styled.View`
  flex-direction: column;
  width: 80%;
  margin-right: 15px;
  height: 200px;
`;

export const EventTextInput = styled.TextInput`
  color: #ffffff;
  width: 100%;
  height: 56px;
  background-color: #1f1e25;
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 8px;
`;

export const DateText = styled.Text`
  color: #ffffff;
  width: 100%;
  height: 56px;
  background-color: #1f1e25;
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 8px;
  justify-content: center;
`;

export const AddEventButton = styled.TouchableOpacity`
  width: 15%;
  height: 150px;
  background-color: green;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;

export const EventListContainer = styled.View`
  flex: 1;
  flex-direction: column;
`;

export const DateButton = styled.TouchableOpacity`
  height: 28px;
  background-color: #1f1e25;
  border-radius: 10px;
  padding: 5px;
  justify-content: center;
  align-items: center;
`;

export const DateButtonText = styled.Text`
  color: #ffffff;
`;
