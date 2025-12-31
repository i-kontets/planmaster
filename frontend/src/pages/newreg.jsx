import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Platform,
  KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ScrollView 
} from 'react-native';
import axios from 'axios';
import { theme } from '../theme';

// ★ IPアドレスを書き換えてください
const API_URL = Platform.OS === 'web' ? 'http://localhost:5001' : 'http://192.168.0.18:5001';

const NewReg = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!username || !email || !password) {
      Alert.alert('お知らせ', 'すべての項目を入力してください。');
      return;
    }
    try {
      const response = await axios.post(`${API_URL}/register`, { username, email, password });
      if (response.data.success) {
        Alert.alert('完了', '登録が完了しました！ログインしてください。');
        navigation.navigate('Login');
      }
    } catch (error) {
      const msg = error.response?.data?.message || '登録に失敗しました。';
      Alert.alert('エラー', msg);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} disabled={Platform.OS === 'web'}>
        <ScrollView contentContainerStyle={styles.scrollInner}>
          <View style={styles.header}>
            <Text style={styles.logo}>新規登録</Text>
            <Text style={styles.subtitle}>新しいアカウントを作成します。</Text>
          </View>
          <View style={styles.form}>
            <Text style={styles.label}>お名前</Text>
            <TextInput style={styles.input} placeholder="例：山田 太郎" value={username} onChangeText={setUsername} />
            <Text style={styles.label}>メールアドレス</Text>
            <TextInput style={styles.input} placeholder="example@mail.com" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
            <Text style={styles.label}>パスワード</Text>
            <TextInput style={styles.input} placeholder="パスワードを設定" value={password} onChangeText={setPassword} secureTextEntry />
            <TouchableOpacity style={styles.button} onPress={handleRegister}><Text style={styles.buttonText}>登録する</Text></TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.footer} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.footerText}>すでにアカウントをお持ちの方は<Text style={styles.linkText}>こちら</Text></Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  scrollInner: { flexGrow: 1, justifyContent: 'center', padding: theme.spacing.xl },
  header: { alignItems: 'center', marginBottom: 40 },
  logo: { fontSize: 28, fontWeight: '300', color: theme.colors.text, letterSpacing: 2 },
  subtitle: { fontSize: 13, color: theme.colors.textSecondary, marginTop: 8 },
  form: { width: '100%' },
  label: { fontSize: 12, fontWeight: '600', color: theme.colors.textSecondary, marginBottom: 8 },
  input: { backgroundColor: theme.colors.surface, padding: 16, borderRadius: theme.borderRadius.md, marginBottom: 20, borderWidth: 1, borderColor: theme.colors.border },
  button: { backgroundColor: theme.colors.primary, padding: 18, borderRadius: theme.borderRadius.md, alignItems: 'center' },
  buttonText: { color: theme.colors.white, fontWeight: 'bold', fontSize: 16 },
  footer: { marginTop: 30, alignItems: 'center' },
  footerText: { color: theme.colors.textSecondary, fontSize: 14 },
  linkText: { color: theme.colors.primary, fontWeight: 'bold' }
});

export default NewReg;