import { useState } from 'react';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { Heading, VStack, Icon, useTheme } from "native-base";
import { Envelope, Key } from 'phosphor-react-native'

import Logo from '../assets/logo_primary.svg';

import { Input } from "../components/Input";
import { Button } from "../components/Button";


export function SignIn(){
    const [email, setEmail] =  useState('');
    const [password, setPassword] =  useState('');
    const[isLoading, setIsLoading] = useState(false);
    const { colors } = useTheme();

    function handleSignIn(){
        if(!email || !password){
            return Alert.alert('Entrar', 'Informe e-mail e senha.');
        }
        setIsLoading(true);
        auth()
        .signInWithEmailAndPassword(email, password)
        .catch((error) => {
            console.log(error);
            setIsLoading(false);

            if(error.code === 'auth/invalid-email'){
                return Alert.alert('Entrar', 'E-mail inválido.');
            }
            
            if(error.code === 'auth/wrong-password'){
                return Alert.alert('Entrar', 'E-mail ou Senha Inválida.');
            }

            if(error.code === 'auth/user-not-found'){
                return Alert.alert('Entrar', 'E-mail ou Senha Inválida.');
            }

            return Alert.alert('Entrar', 'Não foi possível entrar.')
        } )
    }

    return(
        <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
            <Logo/>

            <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
                Acesse sua Conta
            </Heading>

            <Input 
                placeholder="E-mail"
                mb={4}
                InputLeftElement={<Icon as={<Envelope color={colors.gray[300]}/>} ml={4}/>}
                onChangeText={setEmail}
            />
            <Input 
                placeholder="Senha"
                mb={8}
                InputLeftElement={<Icon as={<Key color={colors.gray[300]}/>} ml={4}/>}
                secureTextEntry
                onChangeText={setPassword}
                />

            <Button 
            title="Entrar" 
            w="full" 
            onPress={handleSignIn}
            isLoading={isLoading}

            />
        </VStack>

    )
}