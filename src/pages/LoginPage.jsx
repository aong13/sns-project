import React, {useState} from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { login } from '../apis/Auth';


const LoginScreen = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const loginData = {
        email,
        password,
      };
      const res = await login(loginData);
      console.log("잘갔나염",res);
      navigation.replace('MainTab');
      // 성공 모달 띄우기
    } catch (error) {
      //에러처리
    }
  };

  const handleSignup = () => {
    navigation.navigate('SignupPage');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
      <TextInput
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          value={email} 
          onChangeText={(text) => setEmail(text)} 
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)} 
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupButtonText}>회원가입</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#3498db',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signupButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  signupButtonText: {
    color: '#3498db',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default LoginScreen;
