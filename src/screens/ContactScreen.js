import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { Button, IconButton } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';

const colors = {
    background: '#d9d1d0',
    surface: '#ffffff',
    text: '#111111',
    muted: '#676060',
    border: '#cfc7c7',
    accent: '#00BCD9',
};

const contactItems = [
    {
        icon: 'mail',
        title: 'Email',
        value: 'turismo@cidade.gov.br',
        text: 'Canal para feedback, ajuste de conteudo e alinhamento do guia.',
    },
    {
        icon: 'phone',
        title: 'Telefone',
        value: '(11) 9999-9999',
        text: 'Atendimento rapido para duvidas gerais do projeto.',
    },
    {
        icon: 'clock',
        title: 'Horario',
        value: 'Seg a sex, 9h as 18h',
        text: 'Respostas normalmente no mesmo dia util.',
    },
];

export default function ContactScreen({ navigation }) {
    const openDrawer = () => {
        const drawerNavigation =
            navigation.getParent?.()?.getParent?.() ?? navigation.getParent?.() ?? navigation;

        drawerNavigation?.dispatch(DrawerActions.openDrawer());
    };

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
                <IconButton icon='menu' size={22} iconColor={colors.text} onPress={openDrawer} />
                <Text style={styles.brand}>BLACK CITY</Text>
                <Feather name='send' size={22} color={colors.text} />
            </View>

            <View style={styles.hero}>
                <Text style={styles.title}>Contato rapido</Text>
                <Text style={styles.subtitle}>
                    Fale sobre ajustes visuais, revisao de conteudo e proximas evolucoes do app.
                </Text>
            </View>

            {contactItems.map((item) => (
                <View key={item.title} style={styles.card}>
                    <View style={styles.cardIcon}>
                        <Feather name={item.icon} size={18} color={colors.text} />
                    </View>
                    <View style={styles.cardBody}>
                        <Text style={styles.cardTitle}>{item.title}</Text>
                        <Text style={styles.cardValue}>{item.value}</Text>
                        <Text style={styles.cardText}>{item.text}</Text>
                    </View>
                </View>
            ))}

            <View style={styles.footerCard}>
                <Text style={styles.footerTitle}>Pronto para receber mensagens</Text>
                <Text style={styles.footerText}>
                    Este e o ponto mais direto do projeto para tirar duvidas e combinar ajustes.
                </Text>
            </View>

            <Button
                mode='contained'
                buttonColor={colors.text}
                textColor={colors.surface}
                style={styles.button}
                contentStyle={styles.buttonContent}
                onPress={() => { }}>
                Enviar mensagem
            </Button>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        paddingHorizontal: 16,
        paddingBottom: 28,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 12,
        paddingBottom: 8,
    },
    brand: {
        color: colors.text,
        fontSize: 20,
        fontWeight: '700',
        letterSpacing: 0.8,
    },
    hero: {
        backgroundColor: colors.surface,
        borderRadius: 22,
        padding: 18,
        borderWidth: 1,
        borderColor: 'rgba(17,17,17,0.08)',
    },
    title: {
        color: colors.text,
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 8,
    },
    subtitle: {
        color: colors.muted,
        fontSize: 13,
        lineHeight: 20,
    },
    card: {
        marginTop: 12,
        backgroundColor: colors.surface,
        borderRadius: 20,
        padding: 16,
        borderWidth: 1,
        borderColor: 'rgba(17,17,17,0.08)',
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    cardIcon: {
        width: 38,
        height: 38,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(17,17,17,0.06)',
        marginRight: 12,
    },
    cardBody: {
        flex: 1,
    },
    cardTitle: {
        color: colors.text,
        fontSize: 14,
        fontWeight: '700',
        marginBottom: 2,
    },
    cardValue: {
        color: colors.text,
        fontSize: 13,
        fontWeight: '700',
        marginBottom: 4,
    },
    cardText: {
        color: colors.muted,
        fontSize: 12,
        lineHeight: 18,
    },
    footerCard: {
        marginTop: 12,
        backgroundColor: colors.surface,
        borderRadius: 20,
        padding: 16,
        borderWidth: 1,
        borderColor: 'rgba(17,17,17,0.08)',
    },
    footerTitle: {
        color: colors.text,
        fontSize: 15,
        fontWeight: '700',
        marginBottom: 6,
    },
    footerText: {
        color: colors.muted,
        fontSize: 12,
        lineHeight: 18,
    },
    button: {
        marginTop: 14,
        borderRadius: 14,
    },
    buttonContent: {
        height: 50,
    },
});
