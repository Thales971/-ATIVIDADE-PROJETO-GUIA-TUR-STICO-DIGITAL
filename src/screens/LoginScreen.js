import React, { useMemo, useState } from 'react';
import { Alert, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import {
    Button,
    Chip,
    HelperText,
    IconButton,
    Surface,
    Text,
    TextInput,
    useTheme,
} from 'react-native-paper';

const brandFont = Platform.select({
    ios: 'Times New Roman',
    android: 'serif',
    default: 'serif',
});

function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function LoginScreen({ navigation }) {
    const theme = useTheme();
    const styles = useMemo(() => createStyles(theme), [theme]);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [showSenha, setShowSenha] = useState(false);

    const nomeTrimmed = nome.trim();
    const emailTrimmed = email.trim();
    const senhaTrimmed = senha.trim();

    const nomeHasError = nome.length > 0 && nomeTrimmed.length < 2;
    const emailHasError = email.length > 0 && !isValidEmail(emailTrimmed);
    const senhaHasError = senha.length > 0 && senhaTrimmed.length < 6;

    const formIsValid =
        nomeTrimmed.length >= 2 && isValidEmail(emailTrimmed) && senhaTrimmed.length >= 6;

    const highlights = [
        {
            icon: 'smartphone',
            title: 'Mobile first',
            text: 'Fluxo pensado para telas pequenas e leitura rapida.',
        },
        {
            icon: 'image',
            title: 'Visual curado',
            text: 'Imagens e cards mantem a identidade editorial do guia.',
        },
        {
            icon: 'layout',
            title: 'Estrutura simples',
            text: 'Navegacao pronta para abrir no Expo Go com QR code.',
        },
    ];

    const goToWelcome = () => {
        const parentNavigation = navigation.getParent?.();

        if (navigation?.replace) {
            navigation.replace('Welcome');
            return;
        }

        if (navigation?.navigate) {
            navigation.navigate('Welcome');
            return;
        }

        parentNavigation?.navigate?.('Início', { screen: 'Welcome' });
    };

    const handleRegister = () => {
        if (!formIsValid) {
            Alert.alert('Aviso', 'Preencha quando quiser. Vamos para os termos de uso.');
        }

        setNome('');
        setEmail('');
        setSenha('');
        goToWelcome();
    };

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps='handled'
            showsVerticalScrollIndicator={false}>
            <View style={styles.bgOrbTop} pointerEvents='none' />
            <View style={styles.bgOrbBottom} pointerEvents='none' />

            <View style={styles.topBar}>
                <Chip mode='outlined' style={styles.betaChip} textStyle={styles.betaChipText}>
                    Acesso
                </Chip>
                <IconButton
                    icon={() => <Feather name='user' size={22} color={theme.colors.onSurface} />}
                    size={22}
                    iconColor={theme.colors.onSurface}
                />
            </View>

            <View style={styles.heroBlock}>
                <Text style={styles.brand}>BLACK CITY</Text>
                <View style={styles.iconFrame}>
                    <Ionicons
                        name='person-circle-outline'
                        size={72}
                        color={theme.colors.onSurface}
                    />
                </View>
                <Text style={styles.subtitle}>
                    Entre para testar o guia, navegar pelas abas e continuar para os termos.
                </Text>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.highlightsContent}
                style={styles.highlightsRail}>
                {highlights.map((item) => (
                    <Surface key={item.title} style={styles.highlightCard} elevation={0}>
                        <View style={styles.highlightIcon}>
                            <Feather name={item.icon} size={18} color={theme.colors.onSurface} />
                        </View>
                        <Text style={styles.highlightTitle}>{item.title}</Text>
                        <Text style={styles.highlightText}>{item.text}</Text>
                    </Surface>
                ))}
            </ScrollView>

            <Surface style={styles.formCard} elevation={2}>
                <View style={styles.formHeader}>
                    <View style={styles.formHeaderText}>
                        <Text style={styles.formTitle}>Login</Text>
                        <Text style={styles.formSubtitle}>
                            Preencha os campos para continuar na experiencia.
                        </Text>
                    </View>
                    <Chip mode='outlined' style={styles.formChip} textStyle={styles.formChipText}>
                        Beta
                    </Chip>
                </View>

                <TextInput
                    mode='outlined'
                    label='Nome completo'
                    value={nome}
                    onChangeText={setNome}
                    autoCapitalize='words'
                    style={styles.input}
                    dense
                    outlineColor='rgba(17,17,17,0.14)'
                    activeOutlineColor={theme.colors.onSurface}
                    left={<TextInput.Icon icon='account-outline' />}
                    error={nomeHasError}
                />
                <HelperText type='error' visible={nomeHasError}>
                    Informe pelo menos 2 caracteres.
                </HelperText>

                <TextInput
                    mode='outlined'
                    label='Email'
                    value={email}
                    onChangeText={setEmail}
                    keyboardType='email-address'
                    autoCapitalize='none'
                    style={styles.input}
                    dense
                    outlineColor='rgba(17,17,17,0.14)'
                    activeOutlineColor={theme.colors.onSurface}
                    left={<TextInput.Icon icon='email-outline' />}
                    error={emailHasError}
                />
                <HelperText type='error' visible={emailHasError}>
                    Digite um email valido.
                </HelperText>

                <TextInput
                    mode='outlined'
                    label='Senha'
                    value={senha}
                    onChangeText={setSenha}
                    secureTextEntry={!showSenha}
                    autoCapitalize='none'
                    style={styles.input}
                    dense
                    outlineColor='rgba(17,17,17,0.14)'
                    activeOutlineColor={theme.colors.onSurface}
                    left={<TextInput.Icon icon='lock-outline' />}
                    right={
                        <TextInput.Icon
                            icon={showSenha ? 'eye-off-outline' : 'eye-outline'}
                            onPress={() => setShowSenha((current) => !current)}
                        />
                    }
                    error={senhaHasError}
                />
                <HelperText type='error' visible={senhaHasError}>
                    A senha deve ter no minimo 6 caracteres.
                </HelperText>

                <Button
                    mode='contained'
                    buttonColor={theme.colors.onSurface}
                    textColor={theme.colors.surface}
                    style={styles.button}
                    contentStyle={styles.buttonContent}
                    onPress={handleRegister}>
                    Continuar
                </Button>

                <Text style={styles.footerNote}>
                    Seus dados nao sao enviados para um servidor real. Este acesso existe para
                    demonstrar o fluxo da atividade.
                </Text>
            </Surface>
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
            paddingBottom: 16,
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
        highlightsRail: {
            marginBottom: 14,
        },
        highlightsContent: {
            paddingRight: 8,
            gap: 10,
        },
        highlightCard: {
            width: 150,
            borderRadius: 18,
            backgroundColor: theme.colors.surface,
            borderWidth: 1,
            borderColor: 'rgba(17,17,17,0.08)',
            padding: 14,
        },
        highlightIcon: {
            width: 34,
            height: 34,
            borderRadius: 12,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(17,17,17,0.06)',
            marginBottom: 10,
        },
        highlightTitle: {
            color: theme.colors.onSurface,
            fontFamily: brandFont,
            fontSize: 13,
            marginBottom: 4,
        },
        highlightText: {
            color: theme.colors.onSurfaceVariant,
            fontSize: 11,
            lineHeight: 15,
        },
        formCard: {
            backgroundColor: theme.colors.surface,
            borderRadius: 24,
            padding: 20,
            borderWidth: 1,
            borderColor: 'rgba(17,17,17,0.08)',
        },
        formHeader: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 12,
            marginBottom: 12,
        },
        formHeaderText: {
            flex: 1,
        },
        formTitle: {
            color: theme.colors.onSurface,
            fontSize: 17,
            fontWeight: '700',
            letterSpacing: 0.2,
        },
        formSubtitle: {
            marginTop: 4,
            color: theme.colors.onSurfaceVariant,
            fontSize: 12,
            lineHeight: 16,
        },
        formChip: {
            backgroundColor: 'rgba(17,17,17,0.04)',
            borderColor: 'rgba(17,17,17,0.1)',
        },
        formChipText: {
            fontSize: 10,
            color: theme.colors.onSurface,
        },
        input: {
            backgroundColor: theme.colors.surface,
            marginTop: 6,
        },
        button: {
            marginTop: 10,
            borderRadius: 14,
        },
        buttonContent: {
            height: 50,
        },
        footerNote: {
            marginTop: 10,
            color: theme.colors.onSurfaceVariant,
            fontSize: 11,
            lineHeight: 16,
            textAlign: 'center',
        },
    });
