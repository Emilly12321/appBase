import React, { useState } from "react";
import { View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { styles } from "../config/styles";
import auth from "@react-native-firebase/auth";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  // Função para lidar com o login
  const handleLogin = async () => {
    if (!email || !senha) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    try {
      // Usar o Firebase Authentication para fazer login com e-mail e senha
      await auth().signInWithEmailAndPassword(email, senha);

      // Se a autenticação for bem-sucedida, navegue para a próxima tela
      navigation.navigate("HomeScreen");
    } catch (error) {
      console.error("Erro na autenticação:", error);
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        setError("Credenciais inválidas. Por favor, tente novamente.");
      } else {
        setError("Erro ao se conectar com a API de autenticação. Tente novamente.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container_inner}>
        <Text>Página de Login!</Text>
        {error && <Text style={{ color: "red" }}>{error}</Text>}
        <Text>{"\n"}</Text>
        <TextInput
          label="Email"
          placeholder="Digite seu e-mail"
          value={email}
          onChangeText={setEmail}
        />
        <Text>{"\n"}</Text>
        <TextInput
          label="Senha"
          placeholder="Digite sua senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry // Para esconder a senha
        />
        <Text>{"\n"}</Text>
        <Button mode="contained" onPress={handleLogin}>Login</Button>
        <Button mode="text" onPress={() => navigation.navigate("RegisterScreen")}>
          Fazer Cadastro
        </Button>
      </View>
    </View>
  );
}
