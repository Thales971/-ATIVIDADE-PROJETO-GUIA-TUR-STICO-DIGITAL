import React, { useState } from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { Button, Checkbox, Chip, IconButton, Surface, Text, useTheme } from 'react-native-paper';
import { Feather, Ionicons } from '@expo/vector-icons';

const brandFont = Platform.select({
    ios: 'Times New Roman',
    android: 'serif',
    default: 'serif',
});

const terms = [
    {
        icon: 'file-text',
        title: 'Uso do app',
        text: 'O conteudo e o fluxo atual servem como base de validacao e podem mudar.',
    },
    {
        icon: 'image',
        title: 'Conteudo visual',
        text: 'Imagens, textos e locais sao temporarios enquanto o Figma final nao fecha.',
    },
    {
        icon: 'refresh-cw',
        title: 'Atualizacoes',
        text: 'A interface pode receber ajustes rapidos sem quebrar a navegacao.',
    },
];

export default function WelcomeScreen({ navigation }) {
    const theme = useTheme();
    const styles = createStyles(theme);
    const [agreed, setAgreed] = useState(false);

    const openDrawer = () => {
        const drawerNavigation = navigation.getParent?.() ?? navigation;
        drawerNavigation?.dispatch(DrawerActions.openDrawer());
    };

    const continueApp = () => {
        navigation.replace('Tabs');
    };

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}>
            <View style={styles.bgOrbTop} pointerEvents='none' />
            <View style={styles.bgOrbBottom} pointerEvents='none' />

            <View style={styles.topBar}>
                <Chip mode='outlined' style={styles.betaChip} textStyle={styles.betaChipText}>
                    Beta
                </Chip>
                <IconButton
                    icon='menu'
                    size={22}
                    iconColor={theme.colors.onSurface}
                    onPress={openDrawer}
                />
            </View>

            <View style={styles.heroBlock}>
                <Text style={styles.brand}>BLACK CITY</Text>
                <View style={styles.iconFrame}>
                    <Ionicons name='cube-outline' size={74} color={theme.colors.onSurface} />
                </View>
                <Text style={styles.subtitle}>
                    Descubra os melhores pontos turisticos e restaurantes da cidade de forma simples
                    e rapida.
                </Text>
            </View>

            <Surface style={styles.termsCard} elevation={2}>
                <View style={styles.termsHeader}>
                    <View style={styles.termsHeaderText}>
                        <Text style={styles.termsTitle}>Termos de Uso</Text>
                        <Text style={styles.termsSubtitle}>
                            Leia esta versao beta antes de continuar
                        </Text>
                    </View>
                    <Chip
                        mode='outlined'
                        style={styles.versionChip}
                        textStyle={styles.versionChipText}>
                        BLACK CITY
                    </Chip>
                </View>

                <View style={styles.termsList}>
                    {terms.map((term, index) => (
                        <View key={term.title}>
                            <View style={styles.termRow}>
                                <View style={styles.termIcon}>
                                    <Feather
                                        name={term.icon}
                                        size={18}
                                        color={theme.colors.onSurface}
                                    />
                                </View>
                                <View style={styles.termBody}>
                                    <Text style={styles.termTitle}>{term.title}</Text>
                                    <Text style={styles.termText}>{term.text}</Text>
                                </View>
                            </View>

                            {index < terms.length - 1 ? <View style={styles.termDivider} /> : null}
                        </View>
                    ))}
                </View>
            </Surface>

            <View style={styles.checkboxRow}>
                <Checkbox
                    status={agreed ? 'checked' : 'unchecked'}
                    onPress={() => setAgreed((current) => !current)}
                    color={theme.colors.onSurface}
                />
                <Text style={styles.checkboxText}>Concordo com os termos desta versao beta</Text>
            </View>

            <Button
                mode='contained'
                buttonColor={theme.colors.onSurface}
                textColor={theme.colors.surface}
                style={styles.button}
                contentStyle={styles.buttonContent}
                disabled={!agreed}
                onPress={continueApp}>
                Seguir em frente
            </Button>
        </ScrollView>
    );
}

const createStyles = (theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
        },
        content: {
            flexGrow: 1,
            paddingHorizontal: 24,
            paddingTop: 18,
            paddingBottom: 28,
            position: 'relative',
        },
        bgOrbTop: {
            position: 'absolute',
            top: 22,
            right: -56,
            width: 164,
            height: 164,
            borderRadius: 82,
            backgroundColor: 'rgba(255,255,255,0.22)',
        },
        bgOrbBottom: {
            position: 'absolute',
            bottom: 128,
            left: -72,
            width: 204,
            height: 204,
            borderRadius: 102,
            backgroundColor: 'rgba(255,255,255,0.12)',
        },
        topBar: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 8,
        },
        betaChip: {
            backgroundColor: 'rgba(255,255,255,0.28)',
            borderColor: 'rgba(17,17,17,0.1)',
        },
        betaChipText: {
            fontSize: 10,
            color: theme.colors.onSurface,
        },
        heroBlock: {
            alignItems: 'center',
            paddingTop: 12,
            paddingBottom: 20,
        },
        brand: {
            fontFamily: brandFont,
            fontSize: 32,
            letterSpacing: 1,
            color: theme.colors.onSurface,
            marginBottom: 14,
            textAlign: 'center',
        },
        iconFrame: {
            width: 118,
            height: 118,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 28,
            borderWidth: 1,
            borderColor: 'rgba(17,17,17,0.1)',
            backgroundColor: 'rgba(255,255,255,0.16)',
        },
        subtitle: {
            marginTop: 16,
            maxWidth: 280,
            textAlign: 'center',
            color: theme.colors.onSurfaceVariant,
            lineHeight: 20,
            fontSize: 13,
        },
        termsCard: {
            backgroundColor: theme.colors.surface,
            borderRadius: 22,
            padding: 22,
            borderWidth: 1,
            borderColor: 'rgba(17,17,17,0.08)',
        },
        termsHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 16,
        },
        termsHeaderText: {
            flex: 1,
            paddingRight: 12,
        },
        termsTitle: {
            color: theme.colors.onSurface,
            fontSize: 15,
            fontWeight: '700',
            letterSpacing: 0.2,
        },
        termsSubtitle: {
            marginTop: 4,
            color: theme.colors.onSurfaceVariant,
            fontSize: 12,
            lineHeight: 16,
        },
        versionChip: {
            alignSelf: 'flex-start',
            backgroundColor: 'rgba(17,17,17,0.04)',
            borderColor: 'rgba(17,17,17,0.12)',
        },
        versionChipText: {
            fontSize: 10,
            color: theme.colors.onSurface,
        },
        termsList: {
            flexDirection: 'column',
        },
        termRow: {
            flexDirection: 'row',
            alignItems: 'flex-start',
        },
        termIcon: {
            width: 38,
            height: 38,
            borderRadius: 19,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(17,17,17,0.06)',
            marginRight: 14,
        },
        termBody: {
            flex: 1,
        },
        termTitle: {
            color: theme.colors.onSurface,
            fontSize: 13,
            fontWeight: '700',
            marginBottom: 5,
        },
        termText: {
            color: theme.colors.onSurfaceVariant,
            fontSize: 12,
            lineHeight: 17,
        },
        termDivider: {
            height: 1,
            backgroundColor: 'rgba(17,17,17,0.08)',
            marginVertical: 14,
            marginLeft: 52,
        },
        checkboxRow: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 16,
            marginBottom: 14,
        },
        checkboxText: {
            fontSize: 12,
            color: theme.colors.onSurface,
            flexShrink: 1,
            lineHeight: 16,
        },
        button: {
            alignSelf: 'stretch',
            borderRadius: 14,
        },
        buttonContent: {
            height: 50,
        },
    });
