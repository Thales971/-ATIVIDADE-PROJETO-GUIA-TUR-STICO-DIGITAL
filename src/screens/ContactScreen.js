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
            <View style={styles.backgroundOrbTop} pointerEvents='none' />
            <View style={styles.backgroundOrbBottom} pointerEvents='none' />

            <View style={styles.header}>
                <IconButton
                    icon='menu'
                    size={22}
                    iconColor={theme.colors.onSurface}
                    onPress={openDrawer}
                />
                <Text style={styles.brand}>BLACK CITY</Text>
                <Feather name='send' size={22} color={theme.colors.onSurface} />
            </View>

            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}>
                <Surface style={styles.heroCard} elevation={1}>
                    <Chip mode='outlined' style={styles.chip} textStyle={styles.chipText}>
                        Atendimento
                    </Chip>
                    <Text style={styles.heroTitle}>Contato rapido</Text>
                    <Text style={styles.heroText}>
                        Use este canal para falar sobre ajustes visuais, revisao de conteudo,
                        duvidas da base de dados e proximas evolucoes do guia.
                    </Text>
                </Surface>

                {contactItems.map((item) => (
                    <Surface key={item.title} style={styles.card} elevation={1}>
                        <View style={styles.cardIcon}>
                            <Feather name={item.icon} size={20} color={theme.colors.onSurface} />
                        </View>
                        <View style={styles.cardBody}>
                            <Text style={styles.cardTitle}>{item.title}</Text>
                            <Text style={styles.cardValue}>{item.value}</Text>
                            <Text style={styles.cardText}>{item.text}</Text>
                        </View>
                    </Surface>
                ))}

                <Surface style={styles.footerCard} elevation={1}>
                    <Text style={styles.footerTitle}>Pronto para receber mensagens</Text>
                    <Text style={styles.footerText}>
                        Se precisar ajustar imagens, textos ou a navegacao, este e o ponto de
                        contato mais rapido do projeto.
                    </Text>
                </Surface>

                <Button
                    mode='contained'
                    buttonColor={theme.colors.onSurface}
                    textColor={theme.colors.surface}
                    style={styles.button}
                    contentStyle={styles.buttonContent}
                    onPress={() => {}}>
                    Enviar mensagem
                </Button>
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
            paddingHorizontal: 16,
            paddingBottom: 28,
        },
        heroCard: {
            borderRadius: 24,
            backgroundColor: theme.colors.surface,
            padding: 20,
            borderWidth: 1,
            borderColor: 'rgba(17,17,17,0.08)',
        },
        chip: {
            alignSelf: 'flex-start',
            marginBottom: 14,
            backgroundColor: 'rgba(17,17,17,0.03)',
            borderColor: 'rgba(17,17,17,0.1)',
        },
        chipText: {
            fontSize: 10,
            color: theme.colors.onSurface,
        },
        heroTitle: {
            fontFamily: brandFont,
            fontSize: 24,
            color: theme.colors.onSurface,
            marginBottom: 10,
        },
        heroText: {
            color: theme.colors.onSurfaceVariant,
            lineHeight: 20,
            fontSize: 13,
        },
        card: {
            marginTop: 14,
            borderRadius: 22,
            backgroundColor: theme.colors.surface,
            padding: 16,
            borderWidth: 1,
            borderColor: 'rgba(17,17,17,0.08)',
            flexDirection: 'row',
            alignItems: 'flex-start',
        },
        cardIcon: {
            width: 40,
            height: 40,
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
            color: theme.colors.onSurface,
            fontFamily: brandFont,
            fontSize: 14,
            marginBottom: 2,
        },
        cardValue: {
            color: theme.colors.onSurface,
            fontSize: 13,
            fontWeight: '700',
            marginBottom: 4,
        },
        cardText: {
            color: theme.colors.onSurfaceVariant,
            lineHeight: 18,
            fontSize: 12,
        },
        footerCard: {
            marginTop: 14,
            borderRadius: 22,
            backgroundColor: theme.colors.surface,
            padding: 18,
            borderWidth: 1,
            borderColor: 'rgba(17,17,17,0.08)',
        },
        footerTitle: {
            color: theme.colors.onSurface,
            fontFamily: brandFont,
            fontSize: 15,
            marginBottom: 8,
        },
        footerText: {
            color: theme.colors.onSurfaceVariant,
            lineHeight: 18,
            fontSize: 12,
        },
        button: {
            marginTop: 16,
            alignSelf: 'stretch',
            borderRadius: 14,
        },
        buttonContent: {
            height: 50,
        },
    });
