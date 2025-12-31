import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Platform,
  KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ScrollView 
} from 'react-native';
import axios from 'axios';
import { saveToken } from '../utils/authStorage';
import { theme } from '../theme';

// PCのIPアドレスに書き換えてください
const API_URL = Platform.OS === 'web' ? 'http://localhost:5001' : 'http://192.168.0.18:5001';

const Login = ({ navigation, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('お知らせ', 'メールアドレスとパスワードを入力してください。');
      return;
    }
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      if (response.data.success) {
        await saveToken(response.data.token);
        onLoginSuccess(response.data.token);
      }
    } catch (error) {
      Alert.alert('ログイン失敗', '入力内容をご確認ください。');
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} disabled={Platform.OS === 'web'}>
        <ScrollView contentContainerStyle={styles.scrollInner}>
          <View style={styles.header}>
            <Text style={styles.logo}>PlanMaster</Text>
            <Text style={styles.subtitle}>日々の計画と対話を、もっと身近に。</Text>
          </View>
          <View style={styles.form}>
            <Text style={styles.label}>メールアドレス</Text>
            <TextInput style={styles.input} placeholder="example@mail.com" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
            <Text style={styles.label}>パスワード</Text>
            <TextInput style={styles.input} placeholder="パスワードを入力" value={password} onChangeText={setPassword} secureTextEntry />
            <TouchableOpacity style={styles.button} onPress={handleLogin}><Text style={styles.buttonText}>ログイン</Text></TouchableOpacity>
          </View>
          <View style={styles.footer}>
            <Text style={styles.footerText}>アカウントをお持ちでないですか？</Text>
            <TouchableOpacity onPress={() => navigation.navigate('NewReg')}>
              <Text style={styles.registerText}>新規登録はこちら</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  scrollInner: { flexGrow: 1, justifyContent: 'center', padding: theme.spacing.xl },
  header: { alignItems: 'center', marginBottom: 50 },
  logo: { fontSize: 34, fontWeight: '300', color: theme.colors.text, letterSpacing: 2 },
  subtitle: { fontSize: 13, color: theme.colors.textSecondary, marginTop: 10 },
  form: { width: '100%' },
  label: { fontSize: 12, fontWeight: '600', color: theme.colors.textSecondary, marginBottom: 8 },
  input: { backgroundColor: theme.colors.surface, padding: 16, borderRadius: theme.borderRadius.md, marginBottom: 24, borderWidth: 1, borderColor: theme.colors.border },
  button: { backgroundColor: theme.colors.primary, padding: 18, borderRadius: theme.borderRadius.md, alignItems: 'center' },
  buttonText: { color: theme.colors.white, fontWeight: 'bold', fontSize: 16 },
  footer: { marginTop: 40, alignItems: 'center' },
  footerText: { color: theme.colors.textSecondary, fontSize: 14 },
  registerText: { color: theme.colors.primary, fontWeight: 'bold', marginTop: 8 }
});

export default Login;