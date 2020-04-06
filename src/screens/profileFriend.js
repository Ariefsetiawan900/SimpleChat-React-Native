import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, ToastAndroid, PermissionsAndroid } from 'react-native'
// import Firebase from '../Config/firebase'
import * as firebase from 'firebase'

import Icon from 'react-native-vector-icons/FontAwesome';


class Profile extends Component {
    state = {
        displayName: '',
        uid: '',
        ImageUrl: '',
        phone: '',
        email: '',
        status: ''
      }
    
    
    
      async componentDidMount() {
        await this.setState({
          uid: await this.props.navigation.getParam('uid'),
        });
        const ref = firebase.database().ref(`/user/${this.state.uid}`)
        await ref.on('value', async snapshot => {
          console.log('snappppp', snapshot.val())
          const date1 = new Date()
          const date2 = new Date(snapshot.val().last_seen)
          var res = Math.abs(date1 - date2) / 1000;
          var minutes = Math.floor(res / 60) % 60;
          await this.setState({
            displayName: snapshot.val().displayName,
            phone: snapshot.val().phone,
            imageUrl: snapshot.val().imageUrl,
            email: snapshot.val().email,
            status: `${snapshot.val().status}`,
       
          })
        
            .then(res =>
              this.setState({
                address: `${res.data.displayName}`,
              }),
            );
        })
        this.lastSeenInterval = setInterval(() => {
          this.getLastSeen()
        }, 60000);
      }
      backHandler = () => {
        this.props.navigation.navigate('Map')
    }
    chatHandler = () => {
        this.props.navigation.navigate('Chat')
    }
    
  
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.containerHeader}>
                    <Text onPress={this.backHandler} style={styles.headerIconLeft}><Icon style={styles.headerIcon} name='arrow-left' size={30} /></Text>
                    <Text onPress={this.chatHandler} style={styles.headerIconRight}><Icon style={styles.headerIcon} name='comment-o' size={30} /></Text>
                   
                </View>
                <View style={styles.containerBottom}>
                    <Image style={styles.circle}  source={{
                uri: `${this.state.imageUrl || null}`,
              }} />
                    <Text style={styles.text}>Hi, {this.state.displayName}</Text>
                    <View style={styles.mainText}>
                        <View style={styles.containerTextProfile}>
                            <Text style={styles.textProfile}>Phone</Text>
                             <Text style={styles.textProfile}>{this.state.phone}</Text>
                        </View>
                        <View style={styles.containerTextProfile}>
                            <Text style={styles.textProfileEmail}>Email</Text>
                             <Text style={styles.textProfile}>{this.state.email}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0e76a8',
    },
    containerHeader: {
        padding: 40,
        height: '30%',
        width: '100%',
        justifyContent: 'space-between',
        flex: 1,
        flexDirection: 'row'
        // backgroundColor: 'pink'
    },
    containerBottom: {
        padding: 40,
        top: 100,
        width: '100%',
        height: '70%',
        flexDirection: 'column',
        // alignItems: 'center',
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        backgroundColor: 'white',
        // justifyContent: 'center',
        alignItems: 'center'
    },
    circle: {
        // backgroundColor: '#262626',
        width: 200,
        height: 200,
        borderRadius: 100,
        top: -250,

    },
    text : {
        top: -220,
        fontSize: 35
    },
    saveButton: {
        marginTop: 10,
        width: '100%',
        backgroundColor: '#262626',
        borderRadius: 15,
        padding: 15,
    },
    mainText: {
        top: -200
    },
    containerTextProfile: {
        flexDirection: 'row',
        fontSize: 24,
        justifyContent: 'space-between',
        alignContent: 'space-between',
        marginBottom: 20,
    },
    headerIconLeft: {
        left:-20,
        top: -20
    },
    headerIconRight: {
        left:20,
        top: -20 
    },
    headerIcon: {
        color:'white'
    },
    textProfile: {
        fontSize: 18 
    },
    textProfileEmail: {
        fontSize: 18,
        paddingRight: 80
    }

})