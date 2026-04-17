import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { Button, IconButton, Surface, Text, useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const brandFont = Platform.select({
    ios: 'Times New Roman',
    android: 'serif',
    default: 'serif',
});

export default function ContactScreen({ navigation }) {
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
                <Text style={styles.brand}>BLACK CITY</Text>
                <Ionicons name='call-outline' size={24} color={theme.colors.onSurface} />
            </View>

            <View style={styles.content}>
                <Surface style={styles.card} elevation={1}>
                    <Text variant='headlineSmall' style={styles.title}>
                        Contato rapido
                    </Text>
                    <Text style={styles.label}>Email</Text>
                    <Text style={styles.value}>turismo@cidade.gov.br</Text>
                    <Text style={styles.label}>Telefone</Text>
                    <Text style={styles.value}>(11) 9999-9999</Text>
                    <Text style={styles.label}>Horario</Text>
                    <Text style={styles.value}>Seg a sex, 9h as 18h</Text>
                    <Button
                        mode='contained'
                        buttonColor={theme.colors.onSurface}
                        textColor={theme.colors.surface}
                        style={styles.button}
                        onPress={() => {}}>
                        Enviar mensagem
                    </Button>
                </Surface>
            </View>
        </View>
    );
}

const createStyles = (theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 12,
            paddingTop: 14,
            paddingBottom: 6,
        },
        brand: {
            fontFamily: brandFont,
            fontSize: 20,
            letterSpacing: 0.8,
            color: theme.colors.onSurface,
        },
        content: {
            flex: 1,
            paddingHorizontal: 20,
            paddingTop: 8,
        },
        card: {
            borderRadius: 16,
            backgroundColor: theme.colors.surface,
            padding: 18,
        },
        title: {
            marginBottom: 14,
            color: theme.colors.onSurface,
            fontFamily: brandFont,
        },
        label: {
            marginTop: 10,
            color: theme.colors.onSurfaceVariant,
            fontSize: 12,
            fontWeight: '700',
        },
        value: {
            marginTop: 2,
            color: theme.colors.onSurface,
            fontSize: 14,
        },
        button: {
            marginTop: 20,
            alignSelf: 'flex-start',
        },
    });
