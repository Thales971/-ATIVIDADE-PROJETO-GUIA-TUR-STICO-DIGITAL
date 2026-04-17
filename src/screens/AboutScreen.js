import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { Chip, IconButton, Surface, Text, useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const brandFont = Platform.select({
    ios: 'Times New Roman',
    android: 'serif',
    default: 'serif',
});

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
                <Text style={styles.brand}>BLACK CITY</Text>
                <Ionicons
                    name='information-circle-outline'
                    size={24}
                    color={theme.colors.onSurface}
                />
            </View>

            <View style={styles.content}>
                <Surface style={styles.card} elevation={1}>
                    <Chip mode='outlined' style={styles.chip} textStyle={styles.chipText}>
                        Beta
                    </Chip>
                    <Text variant='headlineSmall' style={styles.title}>
                        Guia Turistico Digital
                    </Text>
                    <Text variant='bodySmall' style={styles.text}>
                        App em ajuste visual para mostrar pontos turisticos, restaurantes e
                        navegacao simples.
                    </Text>
                    <Text variant='bodySmall' style={[styles.text, styles.textSpacing]}>
                        O JSON local segue como base para futuras trocas de conteudo.
                    </Text>
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
        chip: {
            alignSelf: 'flex-start',
            marginBottom: 14,
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.outline,
        },
        chipText: {
            fontSize: 11,
            color: theme.colors.onSurface,
        },
        title: {
            marginBottom: 10,
            color: theme.colors.onSurface,
            fontFamily: brandFont,
        },
        text: {
            color: theme.colors.onSurfaceVariant,
            lineHeight: 18,
        },
        textSpacing: {
            marginTop: 8,
        },
    });
