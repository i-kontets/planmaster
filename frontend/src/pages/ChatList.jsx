import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { deleteToken } from '../utils/authStorage';

const ChatList = ({ onLogout }) => {
  const handleLogout = async () => {
    await deleteToken();
    onLogout(); // 親コンポーネント（App.jsx）の状態を更新してログイン画面へ戻す
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>チャット一覧</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logoutText}>ログアウト</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>まだトーク履歴はありません</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: { 
    paddingTop: 60, paddingHorizontal: 20, paddingBottom: 20, 
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    borderBottomWidth: 1, borderBottomColor: '#EEE' 
  },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  logoutText: { color: '#FF3B30', fontWeight: 'bold' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: '#999', fontSize: 16 }
});

export default ChatList;