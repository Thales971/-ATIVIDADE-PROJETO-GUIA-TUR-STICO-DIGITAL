import React, { useState } from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Checkbox, Surface, Text, useTheme } from 'react-native-paper';

const brandFont = Platform.select({
    ios: 'Times New Roman',
    android: 'serif',
    default: 'serif',
});

export default function LoginScreen({ navigation }) {
    const theme = useTheme();
    const styles = createStyles(theme);
    const [agreed, setAgreed] = useState(false);

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

            <View style={styles.heroBlock}>
                <Text style={styles.brand}>BLACK CITY</Text>
                <View style={styles.iconFrame}>
                    <Ionicons name='cube-outline' size={72} color={theme.colors.onSurface} />
                </View>
                <Text style={styles.subtitle}>
                    Descubra os melhores pontos turísticos e restaurantes da cidade de forma simples e rápida.
                </Text>
            </View>

            <Surface style={styles.termsCard} elevation={2}>
                <Text style={styles.termsTitle}>Termos de Uso - BLACK CITY</Text>
                <Text style={styles.termsText}>
                    Bem-vindo ao BLACK CITY, seu guia digital para descobrir pontos turísticos e restaurantes de forma simples e rápida.
                    Ao utilizar o aplicativo, você concorda com os termos a seguir.
                    O app foi construído para apresentar informações com leitura limpa, imagens temáticas e navegação direta.
                </Text>
                <Text style={styles.termsText}>
                    Mesmo com atualizações constantes, recomendamos conferir dados e horários antes de sair. O conteúdo pode mudar com o tempo e algumas informações podem variar.
                </Text>
                <Text style={styles.termsText}>
                    Ao prosseguir, você declara que leu e concorda com estes termos.
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
                buttonColor={theme.colors.surfaceVariant}
                textColor={theme.colors.onSurface}
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
            paddingTop: 84,
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
        heroBlock: {
            alignItems: 'center',
            paddingTop: 8,
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
        iconFrame: {
            width: 110,
            height: 110,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 28,
            borderWidth: 1,
            borderColor: 'rgba(17,17,17,0.12)',
            backgroundColor: 'rgba(255,255,255,0.4)',
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
            marginTop: 6,
            backgroundColor: theme.colors.surface,
            borderRadius: 6,
            padding: 18,
            borderWidth: 1,
            borderColor: 'rgba(17,17,17,0.08)',
        },
        termsTitle: {
            color: theme.colors.onSurface,
            fontSize: 16,
            fontWeight: '700',
            marginBottom: 6,
        },
        termsText: {
            color: theme.colors.onSurfaceVariant,
            fontSize: 12,
            lineHeight: 18,
            marginBottom: 8,
        },
        checkboxRow: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 14,
            marginBottom: 8,
            paddingLeft: 2,
        },
        checkboxText: {
            color: theme.colors.onSurface,
            fontSize: 12,
        },
        button: {
            marginTop: 8,
            alignSelf: 'flex-start',
            borderRadius: 6,
        },
        buttonContent: {
            height: 36,
            paddingHorizontal: 10,
        },
    });
