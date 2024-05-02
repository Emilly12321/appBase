import React, { useState } from "react";
import { View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { styles } from "../config/styles";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [repetirSenha, setRepetirSenha] = useState("");
  const [error, setError] = useState("");

  // Função para verificar se o e-mail é válido
  const isEmailValid = (email) => {
    // Expressão regular para verificar o formato do e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Função para verificar se a senha é válida
  const isPasswordValid = (senha) => {
    // Defina os requisitos de complexidade da senha
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return passwordRegex.test(senha);
  };

  // Função para lidar com o registro
  const handleRegister = async () => {
    // Verifique se todos os campos estão preenchidos
    if (!email || !senha || !repetirSenha) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    // Verifique se as senhas coincidem
    if (senha !== repetirSenha) {
      setError("As senhas não coincidem. Tente novamente.");
      return;
    }

    // Verifique se o e-mail é válido
    if (!isEmailValid(email)) {
      setError("Por favor, insira um e-mail válido.");
      return;
    }

    // Verifique se a senha é válida
    if (!isPasswordValid(senha)) {
      setError("A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.");
      return;
    }

    try {
      // Crie um novo usuário com e-mail e senha usando Firebase Authentication
      await auth().createUserWithEmailAndPassword(email, senha);

      // Se o registro for bem-sucedido, você pode navegar para a próxima tela ou exibir uma mensagem de sucesso
      console.log("Registro bem-sucedido");
      // Aqui você pode adicionar lógica adicional, como navegar para outra tela ou exibir uma mensagem de sucesso.
    } catch (error) {
      console.error("Erro na autenticação:", error);

      // Verifique o código de erro para fornecer mensagens específicas ao usuário
      if (error.code === 'auth/email-already-in-use') {
        setError("O e-mail fornecido já está em uso. Por favor, tente outro.");
      } else if (error.code === 'auth/weak-password') {
        setError("A senha fornecida é fraca. Tente uma senha mais forte.");
      } else {
        setError("Erro ao se conectar com a API de autenticação. Tente novamente.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container_inner}>
        <Text>Página de Registro!</Text>
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
        <TextInput
          label="Repetir senha"
          placeholder="Repita sua senha"
          value={repetirSenha}
          onChangeText={setRepetirSenha}
          secureTextEntry // Para esconder a senha
        />
        <Text>{"\n"}</Text>
        <Button mode="contained" onPress={handleRegister}>Fazer Cadastro</Button>
      </View>
    </View>
  );
}
