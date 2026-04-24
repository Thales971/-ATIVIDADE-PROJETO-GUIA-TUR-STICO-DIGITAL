import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { Button, Checkbox, Chip, IconButton } from 'react-native-paper';
import { Feather, Ionicons } from '@expo/vector-icons';

const colors = {
    background: '#d9d1d0',
    surface: '#ffffff',
    text: '#111111',
    muted: '#676060',
    border: '#cfc7c7',
};

const notes = [
    {
        icon: 'file-text',
        title: 'Uso do app',
        text: 'Conteudo beta para validar o fluxo principal.',
    },
    {
        icon: 'image',
        title: 'Visual simples',
        text: 'Layout enxuto para ler rapido no celular.',
    },
    {
        icon: 'refresh-cw',
        title: 'Mudancas rapidas',
        text: 'Estrutura leve para editar sem complicar o projeto.',
    },
];

export default function WelcomeScreen({ navigation }) {
    const [agreed, setAgreed] = useState(false);

    const openDrawer = () => {
        const drawerNavigation =
            navigation.getParent?.()?.getParent?.() ?? navigation.getParent?.() ?? navigation;
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
            <View style={styles.header}>
                <Chip mode='outlined' style={styles.chip} textStyle={styles.chipText}>
                    Beta
                </Chip>
                <IconButton icon='menu' size={22} iconColor={colors.text} onPress={openDrawer} />
            </View>

            <View style={styles.hero}>
                <Text style={styles.brand}>BLACK CITY</Text>
                <View style={styles.iconBox}>
                    <Ionicons name='cube-outline' size={68} color={colors.text} />
                </View>
                <Text style={styles.subtitle}>
                    Guia simples para pontos turisticos e restaurantes da cidade.
                </Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Antes de continuar</Text>

                {notes.map((item, index) => (
                    <View key={item.title}>
                        <View style={styles.noteRow}>
                            <View style={styles.noteIcon}>
                                <Feather name={item.icon} size={16} color={colors.text} />
                            </View>

                            <View style={styles.noteBody}>
                                <Text style={styles.noteTitle}>{item.title}</Text>
                                <Text style={styles.noteText}>{item.text}</Text>
                            </View>
                        </View>

                        {index < notes.length - 1 ? <View style={styles.divider} /> : null}
                    </View>
                ))}
            </View>

            <View style={styles.checkboxRow}>
                <Checkbox
                    status={agreed ? 'checked' : 'unchecked'}
                    onPress={() => setAgreed((current) => !current)}
                    color={colors.text}
                />
                <Text style={styles.checkboxText}>Concordo com a versao beta</Text>
            </View>

            <Button
                mode='contained'
                buttonColor={colors.text}
                textColor={colors.surface}
                style={styles.button}
                contentStyle={styles.buttonContent}
                disabled={!agreed}
                onPress={continueApp}>
                Seguir em frente
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
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 28,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    chip: {
        backgroundColor: 'rgba(255,255,255,0.35)',
        borderColor: 'rgba(17,17,17,0.1)',
    },
    chipText: {
        fontSize: 10,
        color: colors.text,
    },
    hero: {
        alignItems: 'center',
        marginBottom: 16,
    },
    brand: {
        fontSize: 30,
        fontWeight: '700',
        letterSpacing: 1,
        color: colors.text,
        textAlign: 'center',
    },
    iconBox: {
        width: 112,
        height: 112,
        marginTop: 14,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 28,
        backgroundColor: 'rgba(255,255,255,0.22)',
        borderWidth: 1,
        borderColor: colors.border,
    },
    subtitle: {
        marginTop: 14,
        maxWidth: 300,
        textAlign: 'center',
        color: colors.muted,
        fontSize: 13,
        lineHeight: 20,
    },
    card: {
        backgroundColor: colors.surface,
        borderRadius: 22,
        padding: 18,
        borderWidth: 1,
        borderColor: 'rgba(17,17,17,0.08)',
    },
    cardTitle: {
        color: colors.text,
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 10,
    },
    noteRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    noteIcon: {
        width: 34,
        height: 34,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(17,17,17,0.06)',
        marginRight: 12,
    },
    noteBody: {
        flex: 1,
    },
    noteTitle: {
        color: colors.text,
        fontSize: 13,
        fontWeight: '700',
        marginBottom: 2,
    },
    noteText: {
        color: colors.muted,
        fontSize: 12,
        lineHeight: 18,
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(17,17,17,0.08)',
        marginVertical: 12,
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    checkboxText: {
        flex: 1,
        color: colors.text,
        fontSize: 13,
    },
    button: {
        marginTop: 14,
        borderRadius: 14,
    },
    buttonContent: {
        height: 50,
    },
});
