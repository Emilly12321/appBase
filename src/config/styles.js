import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5", // Cor de fundo suave
        alignItems: "center",
        justifyContent: "center",
        padding: 20, // Espaçamento nas margens para uma aparência agradável
    },
    container_inner: {
        width: "100%",
        maxWidth: 400, // Define uma largura máxima para o conteúdo, centralizando-o melhor em telas grandes
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 8, // Bordas arredondadas para o container interno
        shadowColor: "#000", // Sombra para dar uma profundidade
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    input: {
        width: "100%",
        marginBottom: 15,
        padding: 12, // Aumente o padding para melhorar a experiência
        borderRadius: 5,
        borderColor: "#ccc",
        borderWidth: 1,
        backgroundColor: "#fafafa", // Cor clara para campos de entrada
    },
    button: {
        width: "100%",
        padding: 14, // Aumente o padding para uma área de toque maior
        borderRadius: 5,
        backgroundColor: "#6200ea", // Cor principal para o botão
        marginTop: 15, // Espaçamento maior entre botões
    },
    button_text: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 16, // Aumente o tamanho do texto para maior legibilidade
    },
    errorText: {
        color: "#d32f2f", // Cor de erro (vermelho)
        marginBottom: 10,
        textAlign: "center",
        fontWeight: "bold", // Destaque o texto de erro
    },
});
