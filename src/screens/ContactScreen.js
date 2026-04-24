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

const contactItems = [
    {
        icon: 'mail',
        title: 'Email',
        value: 'turismo@cidade.gov.br',
        text: 'Canal oficial para feedback, ajustes visuais e envio de referencias.',
    },
    {
        icon: 'phone',
        title: 'Telefone',
        value: '(11) 9999-9999',
        text: 'Atendimento rapido para duvidas gerais e alinhamento do projeto.',
    },
    {
        icon: 'clock',
        title: 'Horario',
        value: 'Seg a sex, 9h as 18h',
        text: 'Respostas normalmente enviadas no mesmo dia util.',
    },
];

export default function ContactScreen({ navigation }) {
    const theme = useTheme();
    const styles = createStyles(theme);

    const openDrawer = () => {
        const drawerNavigation =
            navigation.getParent?.()?.getParent?.() ?? navigation.getParent?.() ?? navigation;
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
                    <Text style={styles.pageTitle}>CONTATOS DA EMPRESA</Text>
                    <View style={styles.titleLine} />
                </View>

                <IconButton icon='dots-vertical' size={22} iconColor={theme.colors.onSurface} />
            </View>

            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}>
                <Text style={styles.sectionTitle}>Fale Conosco</Text>

                <View style={styles.socialRow}>
                    <Feather name='mail' size={54} color={theme.colors.onSurface} />
                    <Feather name='facebook' size={52} color={theme.colors.onSurface} />
                    <Feather name='instagram' size={52} color={theme.colors.onSurface} />
                </View>

                <Text style={styles.bodyText}>
                    Ficou com alguma dúvida, encontrou um bug no aplicativo ou quer sugerir um novo ponto turístico e restaurante para o nosso guia? A equipe da Black City está pronta para ouvir você! Sua opinião é fundamental para continuarmos melhorando a experiência do turismo na nossa cidade.
                </Text>

                <Text style={styles.sectionText}>Canais de Atendimento</Text>
                <Text style={styles.bodyText}>• E-mail: suporte@blackcity.dev.br</Text>
                <Text style={styles.bodyText}>• WhatsApp: (00) 91234-5678 (Atendimento de Seg. a Sex, das 9h às 18h)</Text>
                <Text style={styles.bodyText}>• Site Oficial: www.blackcity.dev.br</Text>
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
            bottom: 70,
            width: 190,
            height: 190,
            borderRadius: 95,
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
        sectionTitle: {
            color: theme.colors.onSurface,
            fontSize: 22,
            fontWeight: '600',
            marginBottom: 14,
        },
        socialRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 18,
            paddingRight: 10,
        },
        bodyText: {
            color: theme.colors.onSurface,
            fontSize: 13,
            lineHeight: 18,
            marginBottom: 10,
            fontStyle: 'italic',
        },
        sectionText: {
            color: theme.colors.onSurface,
            fontSize: 13,
            lineHeight: 18,
            marginTop: 6,
            marginBottom: 2,
            fontStyle: 'italic',
        },
    });
