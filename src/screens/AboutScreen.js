import React from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { Button, Chip, IconButton, Surface, Text, useTheme } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';

const brandFont = Platform.select({
    ios: 'Times New Roman',
    android: 'serif',
    default: 'serif',
});

const highlights = [
    {
        icon: 'database',
        title: 'Dados vivos',
        text: 'OpenStreetMap e Nominatim alimentam nomes, descricoes e localizacao dos lugares.',
    },
    {
        icon: 'image',
        title: 'Imagem curada',
        text: 'As fotos sao tematicas por categoria para evitar imagens aleatorias e sem contexto.',
    },
    {
        icon: 'sliders',
        title: 'Evolucao simples',
        text: 'A estrutura foi montada para permitir troca de API, conteudo e estilo sem reescrever tudo.',
    },
];

export default function AboutScreen({ navigation }) {
    const theme = useTheme();
    const styles = createStyles(theme);

    const openDrawer = () => {
        const drawerNavigation = navigation.getParent?.() ?? navigation;
        drawerNavigation?.dispatch(DrawerActions.openDrawer());
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <IconButton
                    icon='menu'
                    size={22}
                    iconColor={theme.colors.onSurface}
                    onPress={openDrawer}
                />

                <View style={styles.headerCenter}>
                    <View style={styles.brandRow}>
                        <Text style={styles.brand}>BLACK CITY</Text>
                        <View style={styles.cubeBox}>
                            <Feather name='box' size={24} color={theme.colors.onSurface} />
                        </View>
                    </View>
                    <Text style={styles.pageTitle}>SOBRE A EMPRESA</Text>
                    <View style={styles.titleLine} />
                </View>

                <IconButton icon='dots-vertical' size={22} iconColor={theme.colors.onSurface} />
            </View>

            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}>
                <Text style={styles.introText}>
                    Bem-vindo ao Guia Turístico da Cidade, a sua bússola digital para explorar o que há de melhor por aqui!
                    Nosso objetivo é transformar a maneira como moradores e turistas vivenciam a cidade.
                    Com navegação simples, fotos detalhadas e localizações precisas, reunimos o essencial para facilitar cada passeio.
                </Text>

                <Text style={styles.sectionText}>Desenvolvido por: Black City</Text>
                <Text style={styles.bodyText}>
                    Este aplicativo foi idealizado e desenvolvido com orgulho pela Black City, uma agência de tecnologia focada em criar soluções digitais que conectam pessoas, modernizam serviços e resolvem problemas reais.
                </Text>

                <Text style={styles.sectionText}>Nossos pilares neste projeto:</Text>
                <View style={styles.bulletList}>
                    <Text style={styles.bulletItem}>• Inovação: Substituir guias de papel por uma experiência mobile interativa e fluida.</Text>
                    <Text style={styles.bulletItem}>• Acessibilidade: Uma interface limpa, bonita e padronizada, para que qualquer pessoa consiga navegar sem dificuldades.</Text>
                    <Text style={styles.bulletItem}>• Cultura Local: Dar visibilidade aos pontos turísticos e à gastronomia da nossa região.</Text>
                </View>

                <Text style={styles.sectionText}>Versão do Aplicativo</Text>
                <Text style={styles.bodyText}>
                    Versão: 1.0.0 (Beta)  Tecnologias: React Native & Expo
                    {'\n'}Agradecemos por usar o nosso app. Pegue sua mochila, abra o mapa e aproveite a cidade!
                </Text>
            </ScrollView>
        </View>
    );
}

const createStyles = (theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
        },
        headerCenter: {
            flex: 1,
            alignItems: 'center',
            paddingHorizontal: 8,
        },
        brandRow: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
        },
        cubeBox: {
            width: 42,
            height: 42,
            alignItems: 'center',
            justifyContent: 'center',
        },
        pageTitle: {
            marginTop: 34,
            textAlign: 'center',
            fontSize: 23,
            fontWeight: '600',
            color: theme.colors.onSurface,
        },
        titleLine: {
            width: 250,
            height: 4,
            marginTop: 16,
            backgroundColor: theme.colors.onSurface,
            borderRadius: 2,
        },
        backgroundOrbTop: {
            position: 'absolute',
            top: 8,
            right: -50,
            width: 180,
            height: 180,
            borderRadius: 90,
            backgroundColor: 'rgba(255,255,255,0.16)',
        },
        backgroundOrbBottom: {
            position: 'absolute',
            left: -60,
            bottom: 60,
            width: 200,
            height: 200,
            borderRadius: 100,
            backgroundColor: 'rgba(255,255,255,0.12)',
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 12,
            paddingTop: 12,
            paddingBottom: 8,
        },
        brand: {
            fontFamily: brandFont,
            fontSize: 20,
            letterSpacing: 0.8,
            color: theme.colors.onSurface,
        },
        scroll: {
            flex: 1,
        },
        content: {
            paddingHorizontal: 24,
            paddingBottom: 28,
            paddingTop: 26,
        },
        introText: {
            color: theme.colors.onSurface,
            fontSize: 13,
            lineHeight: 18,
            fontStyle: 'italic',
            marginBottom: 18,
        },
        sectionText: {
            color: theme.colors.onSurface,
            fontSize: 13,
            fontStyle: 'italic',
            marginTop: 6,
            marginBottom: 2,
        },
        bodyText: {
            color: theme.colors.onSurface,
            fontSize: 13,
            lineHeight: 18,
            marginBottom: 8,
        },
        bulletList: {
            marginBottom: 12,
        },
        bulletItem: {
            color: theme.colors.onSurface,
            fontSize: 13,
            lineHeight: 18,
            marginBottom: 6,
        },
    });
