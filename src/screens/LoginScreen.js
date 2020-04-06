import React from "react"
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, StatusBar, LayoutAnimation } from "react-native"

import * as firebase from 'firebase'

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        header: null
    }
    state = {
        email: "",
        password: "",
        errorMessage: null
    }

    handleLogin = () => {
        const {email, password } = this.state
        
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch(error => this.setState({ errorMessage: error.message}))
    }



    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content"></StatusBar>
               <Text style={styles.greeting}>{`Hello again.\nWelcome back`}</Text>

            <View style={styles.errorMessage}>
               {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
            </View>

            <View style={styles.form}>
                <View >
                    <Text style={styles.inputTitle}>Email Addres</Text>
                    <TextInput style={styles.input} 
                    autoCapitalize="none"
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                    ></TextInput>
                </View>

                <View style={styles.containerPassword}>
                    <Text style={styles.inputTitle}>Password</Text>
                    <TextInput style={styles.input} 
                    secureTextEntry 
                    autoCapitalize="none"
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                    ></TextInput>
                </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
                <Text style={styles.buttonSignIn}>Sign in</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.containerSignUp} onPress={() => this.props.navigation.navigate("Register")}>
                <Text style={styles.headerTextSignUp}>
                        New to SocialApp? <Text style={styles.signUp}>Sign Up</Text>
                </Text>
            </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    greeting: {
        marginTop: 50,
        fontSize: 18,
        fontWeight: "400",
        textAlign: "center",
    },
    errorMessage: {
        height: 72,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 30
    },
    error: {
        color: "#E9446A"
    },
    form : {
        marginBottom: 48,
        marginHorizontal: 30
    },
    inputTitle: {
        color: "#8A8F9E",
        fontSize: 10,
        textTransform: "uppercase"
    },
    input: {
        borderBottomColor: "#8A8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: "#161F3D"
    },
    button: {
        marginHorizontal: 30,
        backgroundColor : "#3498db",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center"
    },
    containerPassword : {
        marginTop: 32
    },
    buttonSignIn: {
     color: "#FFF",
     fontWeight: "500"
    },
    containerSignUp: {
    alignSelf: "center", 
    marginTop: 32
    },
    headerTextSignUp: {
    color: "#414959", 
    fontSize: 13
    },
    signUp: {
    fontWeight:"500", 
    color: "#E9446A"
    }
})
