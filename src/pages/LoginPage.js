import React from 'react';
import { TextInput, StyleSheet, ScrollView, Button, View, Image, KeyboardAvoidingView, ActivityIndicator, Alert, Text } from 'react-native';
import FormRow from '../components/FormRow';
import firebase from 'firebase'

export default class LoginPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            senha: '',
            isLoading: false,
            message: "",
        }
    };

    componentDidMount() {
        // Your web app's Firebase configuration
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        var firebaseConfig = {
            apiKey: "AIzaSyA9P66z94Y5BwhQl3afU8x1comtb1FWGE0",
            authDomain: "appledcontroller.firebaseapp.com",
            projectId: "appledcontroller",
            storageBucket: "appledcontroller.appspot.com",
            messagingSenderId: "562482690615",
            appId: "1:562482690615:web:d04a4b3aaabfb3d710ddb2",
            measurementId: "G-1C5VJ1Z6WE"
        };
        // Initialize Firebase
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
    }

    onChageHandler(field, value) {
        this.setState({ [field]: value });
    }

    acessarApp() {
        this.setState({ isLoading: false });
        //this.props.navigation.replace('Habitos');
    }

    renderButton() {
        if (this.state.isLoading)
            return <ActivityIndicator size="large" style={styles.loading} />;

        return (
            <View>

                <View style={[styles.btn, { marginTop: 20 }]}>
                    <Button
                        title='Entrar'
                        color='#FFFFFF'
                        onPress={() => this.login()}
                    />
                </View>

                <View style={styles.btnCadastro}>
                    <Button
                        title='Cadastre-se'
                        color='#33cc33'
                        onPress={() => this.solicitarCadastro()}
                    />
                </View>

            </View>
        )
    }

    login() {
        this.setState({ isLoading: true, message: '' });
        const { email, senha } = this.state;

        return firebase
            .auth()
            .signInWithEmailAndPassword(email, senha)
            .then(user => {
                console.log("Logado");
                this.acessarApp();
            })
            .catch(error => {
                this.setState({
                    message: this.getMsgByErrorCode(error.code),
                    isLoading: false
                })
            })
    }

    getMsgByErrorCode(errorCode) {
        switch (errorCode) {
            case "auth/wrong-password":
                return "Senha incorreta";
            case "auth/invalid-email":
                return "E-mail incorreto";
            case "auth/user-not-found":
                return "Usuário não encontrado";
            case "auth/user-disabled":
                return "Usuário desativado!";
            case "auth/email-already-in-use":
                return "Usuário já está em uso!";
            case "auth/operation-not-allowed":
                return "Operação não permitida!";
            case "auth/weak-password":
                return "Senha muito fraca!";
            default:
                return "Erro desconhecido!";
        }
    }

    renderMessage() {
        const { message } = this.state;
        if (!message)
            return null;

        Alert.alert(
            "Erro!",
            message.toString(),
            [{
                text: 'OK',
                onPress: () => { this.setState({ message: '' }); }
            }]
        )
    }

    cadastrar() {

        const { email, senha } = this.state;

        return firebase
            .auth()
            .createUserWithEmailAndPassword(email, senha)
            .then(user => {
                this.acessarApp();
            })
            .catch(error => {
                this.setState({
                    message: this.getMsgByErrorCode(error.code),
                    isLoading: false
                });
            })

    }

    solicitarCadastro() {

        const { email, senha } = this.state;
        if (!email || !senha) {
            Alert.alert(
                "Cadastramento!",
                "Para se cadastrar informe e-mail e senha"
            );
            return null;
        }
        Alert.alert(
            "Cadastramento!",
            "Deseja cadastrar seu usuário com os dados informados?",
            [{
                text: "CANCELAR",
                style: 'cancel'
            }, {
                text: "CADASTRAR",
                onPress: () => { this.cadastrar() }
            }],
        )

    }

    render() {

        return (
            <KeyboardAvoidingView
                behavior="padding"
                enabled style={{ flex: 1 }}>

                <ScrollView style={styles.container}>

                    <Text style={styles.title}>Led Controller</Text>

                    <View style={styles.logoView}>

                        <Image
                            source={require('../img/pickerLogo.png')}
                            style={styles.logo}
                        />
                    </View>

                    <View style={styles.containerInput}>

                        <Image
                            source={require('../img/user.png')}
                            style={styles.icon}
                        />
                        <TextInput
                            style={styles.input}
                            keyboardType="email-address"
                            placeholder="user@email.com"
                            value={this.state.email}
                            onChangeText={value => this.onChageHandler('email', value)}
                        />

                    </View>

                    <View style={styles.containerInput}>
                        <Image
                            source={require('../img/padlock.png')}
                            style={styles.icon}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="***************"
                            value={this.state.senha}
                            secureTextEntry
                            onChangeText={value => this.onChageHandler('senha', value)}
                        />
                    </View>



                    {this.renderButton()}
                    {this.renderMessage()}

                </ScrollView>
            </KeyboardAvoidingView>

        )
    }


}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#303030',
    },
    containerInput: {
        flexDirection: "row",
        flex: 1,
        padding: 5,
        backgroundColor: 'white',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 25,
        marginRight: 25,
        borderRadius: 10,
        elevation: 0.5,
    },
    input: {
        flex: 0.85,
        alignItems: 'center',
        height: 40,
    },
    btn: {
        borderRadius: 10,
        marginTop: 5,
        backgroundColor: '#7a7a7a',
        marginLeft: 60,
        marginRight: 60,
        fontSize: 11,
    },
    btnCadastro: {
        borderRadius: 10,
        marginTop: 5,
        marginLeft: 100,
        marginRight: 100,
        fontSize: 11,
    },
    icon: {
        aspectRatio: 1,
        flex: 0.15,
        marginRight: 5,
        resizeMode: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
    },
    logo: {
        aspectRatio: 1,
        resizeMode: 'center',
        width: 300,
        height: 300,
    },
    logoView: {
        marginTop: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loading: {
        padding: 20,
    },
    title : {
        alignItems: 'center',
        textCo
    }
});
