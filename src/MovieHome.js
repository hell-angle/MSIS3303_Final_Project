import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image,ImageBackground } from 'react-native';
import { Navbar, Nav } from 'react-bootstrap';

export const MovieHome = ({ navigation }) => {
  const [username, setUsername] = useState('');
  useEffect(() => {
    // Fetch user information from the backend
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    // Make a request to the backend to get user information
    try {
      const response = await fetch('http://127.0.0.1:5000/home');
      const data = await response.json();
      setUsername(data.username);
    } catch (error) {
      console.error('Error fetching user information:', error);
    }
  };

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  return (
    
    <View style={[styles.container, { backgroundColor: '#b0c4de' }] }>
        
      <View style={styles.userInfo}>
        <Text style={styles.username}>{username}</Text>
      </View>
      <Text style={styles.welcomeText}>Cinema Management - Group 3</Text>
      <View style={styles.teamContainer}>
        <View style={styles.memberContainer}>
          <Image source={require('./image/20522058.png')} style={styles.memberImage} />
          <Text style={styles.memberName}>Đỗ Công Trình</Text>
          <Text style={styles.memberID}>20522058</Text>
          <Text style={styles.memberRole}>Coder</Text>
        </View>
        <View style={styles.memberContainer}>
          <Image source={require('./image/f1.png')} style={styles.memberImage} />
          <Text style={styles.memberName}>Lê Minh Thông</Text>
          <Text style={styles.memberID}>20522058</Text>
          <Text style={styles.memberRole}>Write Docs,create slide</Text>
        </View>
        <View style={styles.memberContainer}>
          <Image source={require('./image/f2.png')} style={styles.memberImage} />
          <Text style={styles.memberName}>Hà Gia Huy</Text>
          <Text style={styles.memberID}>20522058</Text>
          <Text style={styles.memberRole}>Coder</Text>
        </View>
        <View style={styles.memberContainer}>
          <Image source={require('./image/f3.png')} style={styles.memberImage} />
          <Text style={styles.memberName}>Nguyễn Hữu Thiên</Text>
          <Text style={styles.memberID}>20522058</Text>
          <Text style={styles.memberRole}>Write Docs,create slide</Text>
        </View>
      </View>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 10,
    marginBottom: 10,
  },
  username: {
    marginRight: 5,
    fontWeight: 'bold',
  },
  welcomeText: {
    fontSize: 40,
    marginBottom: 20,
  },
  teamContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  memberContainer: {
    alignItems: 'center',
    marginBottom: 20,
    width: '50%',
  },
  memberImage: {
    width: 400,
    height: 400,
    borderRadius: 195,
    marginBottom: 10,

  },
  memberName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  memberID: {
    fontWeight: 'gray',
    fontSize: 16,
  },
  memberRole: {
    color: 'gray',
  },
});

export default MovieHome;
