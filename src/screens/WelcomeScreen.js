import React, { useState } from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { Button, Checkbox, IconButton, Surface, Text, useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const brandFont = Platform.select({
    ios: 'Times New Roman',
    android: 'serif',
    default: 'serif',
});

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
            <View style={styles.topBar}>
                <View style={styles.topBarSpacer} />
                <IconButton
                    icon='menu'
                    size={22}
                    iconColor={theme.colors.onSurface}
                    onPress={openDrawer}
                />
            </View>

            <View style={styles.heroBlock}>
                <Text style={styles.brand}>BLACK CITY</Text>
                <Ionicons name='cube-outline' size={86} color={theme.colors.onSurface} />
                <Text style={styles.subtitle}>
                    Descubra os melhores pontos turisticos e restaurantes da cidade de forma simples
                    e rapida.
                </Text>
            </View>

            <Surface style={styles.termsCard} elevation={1}>
                <Text style={styles.termsTitle}>Termos de Uso - BLACK CITY</Text>
                <Text style={styles.termsText}>
                    Bem-vindo ao BLACK CITY. Esta versao beta apresenta o fluxo inicial do guia.
                </Text>
                <Text style={[styles.termsText, styles.termsSpacing]}>
                    Os textos e telas podem mudar conforme o Figma evoluir. Os dados exibidos sao um
                    ponto de partida para validacao.
                </Text>
            </Surface>

            <View style={styles.checkboxRow}>
                <Checkbox
                    status={agreed ? 'checked' : 'unchecked'}
                    onPress={() => setAgreed((current) => !current)}
                    color={theme.colors.onSurface}
                />
                <Text style={styles.checkboxText}>Concordo com os Termos de Uso</Text>
            </View>

            <Button
                mode='contained'
                buttonColor={theme.colors.onSurface}
                textColor={theme.colors.surface}
                style={styles.button}
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
            paddingHorizontal: 28,
            paddingTop: 22,
            paddingBottom: 28,
        },
        topBar: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 10,
        },
        topBarSpacer: {
            width: 44,
        },
        heroBlock: {
            alignItems: 'center',
            paddingTop: 18,
            paddingBottom: 24,
        },
        brand: {
            fontFamily: brandFont,
            fontSize: 34,
            letterSpacing: 1.2,
            color: theme.colors.onSurface,
            marginBottom: 18,
            textAlign: 'center',
        },
        subtitle: {
            marginTop: 18,
            maxWidth: 260,
            textAlign: 'center',
            color: theme.colors.onSurfaceVariant,
            lineHeight: 20,
            fontSize: 13,
        },
        termsCard: {
            backgroundColor: theme.colors.onSurface,
            borderRadius: 8,
            paddingHorizontal: 16,
            paddingVertical: 14,
        },
        termsTitle: {
            color: theme.colors.surface,
            fontSize: 12,
            fontWeight: '700',
            marginBottom: 10,
        },
        termsText: {
            color: theme.colors.surface,
            fontSize: 11,
            lineHeight: 15,
        },
        termsSpacing: {
            marginTop: 8,
        },
        checkboxRow: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 12,
            marginBottom: 10,
        },
        checkboxText: {
            fontSize: 12,
            color: theme.colors.onSurface,
            flexShrink: 1,
        },
        button: {
            alignSelf: 'flex-start',
            borderRadius: 6,
        },
    });
