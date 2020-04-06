import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ToastAndroid, Image, PermissionsAndroid, ScrollView } from 'react-native';
// import Firebase from '../Config/firebase'
import  * as firebase from 'firebase'
import Icon from 'react-native-vector-icons/FontAwesome';
import Geolocation from 'react-native-geolocation-service';

class Edit extends Component {
    
    constructor(props) {
        super(props)
        

        this.state = {
            displayName: "",
            imageUrl: "",
            phone: "",
            status: "",

            latitude: "",
            longitude: "",
        }
    }
    componentDidMount() {
        const { displayName } = firebase.auth().currentUser
        this.setState({ displayName: displayName })
    }
    

    getUserData = async () => {
        const uid = firebase.auth().currentUser.uid;
        const ref = firebase.database().ref(`/user/${uid}`)
        ref
            .on('value', snapshot => {
                this.setState({
                    spesificData: snapshot.val(),
                    displayName: snapshot.val() != null ? snapshot.val().displayName : "",
                    phone: snapshot.val() != null ? snapshot.val().phone : '',
                    status: snapshot.val() != null ? snapshot.val().status : '',
                })
            })
            .then(res => {
                res
                    ? console.log('statedata', this.state.spesificData)
                    : ToastAndroid.showWithGravity(
                        `Insert Your Data`,
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                    )
            })
            .catch(error => {
                console.log(error);

            })
    }

    profileHandler = async () => {
        const { displayName, status, imageUrl, phone, latitude, longitude } = this.state
        const uid = firebase.auth().currentUser.uid
        const email = firebase.auth().currentUser.email
        const ref = firebase.database().ref(`/user/${uid}`)

        setTimeout(async () => {
            await ref.set({
                uid: uid,
                email: email,
                displayName,
                status,
                imageUrl,
                phone,
                longitude,
                latitude,
            })
            ToastAndroid.showWithGravity(
                'Data Updated',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            )
        }, 4000)
        setTimeout(async() => {
            await this.props.navigation.navigate('Profile')
        }, 5000)
    }
    async componentWillMount() {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'ReactNativeCode Location Permision',
                message: 'ReactNativeCode App needs access to your location'
            }
        )
        if (granted) {
            Geolocation.getCurrentPosition(
                position => {
                    this.setState({
                        latitude: String(position.coords.latitude),
                        longitude: String(position.coords.longitude)
                    })
                    console.log('posisi', position.coords.latitude);

                },
                error => {
                    console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            )
        }
        let data = await firebase.auth().currentUser;
        await this.setState({
            data: data,
            email: data.email
        })
        await this.getUserData()
    }

     backButtonHandler = () => {
        this.props.navigation.navigate('Profile')
    }
    
    render() {
        return (
            
            <View style={styles.container}>
                <View style={{backgroundColor: 'white', elevation: 0, width: '128%', top: -39}}>
                <View style={{paddingVertical: 15, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',}}>
                    <TouchableOpacity activeOpacity={1} onPress={this.backButtonHandler}>
                        <Icon name='arrow-left' style={{fontSize: 25}} />
                    </TouchableOpacity>
                    <Text>Configure</Text>
                     <Text>{''}</Text>
                </View>
                </View>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.ImageIcon}
                        source={require('../../src/assets/draw.png')}
                    />
                </View>
                <View style={styles.headerContainer}>
                    <Text style={{ fontSize: 30 }}>Hi, {this.state.displayName}</Text>
                    <Text style={{ fontSize: 17, color: '#262626' }}>
                        Configure your profile
                    </Text>
                </View>

                <View style={styles.formContainer}>
                    <TextInput
                        onChangeText={value => this.setState({ imageUrl: value })}
                        style={styles.inputForm}
                        placeholder="Profile Image URL"
                    />
                    <TextInput
                        onChangeText={value => this.setState({ phone: value })}
                        style={styles.inputForm}
                        placeholder="Phone Number"
                        keyboardType = 'numeric'
                    />
                    <TextInput
                        onChangeText={value => this.setState({ status: value })}
                        style={styles.inputFormBio}
                        placeholder="Status"
                        multiline={true}
                    />
                </View>

                <View style={styles.formButtonContainer}>
                    <TouchableOpacity
                        style={styles.formSaveButton}
                        onPress={this.profileHandler}>
                        <Text style={{ color: '#fff', fontSize: 20, textAlign: 'center' }}>
                            Save
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default Edit;

const styles = StyleSheet.create({
    container: {
        padding: 40,
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    imageContainer: {
        top: -30,
        width: 100,
        height: 120
    },
    ImageIcon: {
        width: '100%',
        height: '100%'
    },
    headerContainer: {
        top: -65,
        marginTop: 35,
        width: '100%',
        textAlign: 'left',
        // backgroundColor: 'red',
    },
    formContainer: {
        top: -50,
        marginTop: 15,
        // backgroundColor: 'yellow',
        width: '100%',
    },
    inputForm: {
        height: 50,
        marginBottom: 15,
        padding: 10,
        borderRadius: 10,
        fontSize: 17,
        // backgroundColor: 'yellow',
        borderWidth: 1,
        borderColor: '#B2B2B2',
    },
    inputFormBio: {
        height: 80,
        marginBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 10,
        fontSize: 17,
        // backgroundColor: 'yellow',
        borderWidth: 1,
        borderColor: '#B2B2B2',
    },
    formButtonContainer: {
        // backgroundColor: 'aqua',
        width: '100%',
    },

    formSaveButton: {
        backgroundColor: '#5C93C4',
        padding: 10,
        marginVertical: 10,
        borderRadius: 10,
    },
    signUpLinkContainer: {
        marginVertical: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    circleImageContainer: { width: 500, height: 210 },
    circleImage: {
        zIndex: -1,
        position: 'absolute',
        bottom: 5,
        width: 260,
        height: '100%',
    },
    errorMessage: {
        marginTop: 10,
        width: '100%',
    },
    errorText: { textAlign: 'center', color: 'red', fontSize: 16 },
})