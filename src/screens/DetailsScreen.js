import React from 'react';
import { Image, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { Button, Chip, IconButton, Text, useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const brandFont = Platform.select({
    ios: 'Times New Roman',
    android: 'serif',
    default: 'serif',
});

export default function DetailsScreen({ navigation, route }) {
    const theme = useTheme();
    const styles = createStyles(theme);
    const place = route?.params?.place;

    const openDrawer = () => {
        const drawerNavigation = navigation.getParent?.() ?? navigation;
        drawerNavigation?.dispatch(DrawerActions.openDrawer());
    };

    if (!place) {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <IconButton
                        icon='arrow-back'
                        size={22}
                        iconColor={theme.colors.onSurface}
                        onPress={() => navigation.goBack()}
                    />
                    <Text style={styles.brand}>BLACK CITY</Text>
                    <IconButton
                        icon='menu'
                        size={22}
                        iconColor={theme.colors.onSurface}
                        onPress={openDrawer}
                    />
                </View>

                <View style={styles.fallback}>
                    <Text variant='headlineSmall' style={styles.fallbackTitle}>
                        Detalhes indisponiveis
                    </Text>
                    <Text variant='bodySmall' style={styles.fallbackText}>
                        Nenhum local foi enviado pela navegacao.
                    </Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <IconButton
                    icon='arrow-back'
                    size={22}
                    iconColor={theme.colors.onSurface}
                    onPress={() => navigation.goBack()}
                />
                <Text style={styles.brand}>BLACK CITY</Text>
                <IconButton
                    icon='menu'
                    size={22}
                    iconColor={theme.colors.onSurface}
                    onPress={openDrawer}
                />
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}>
                <Image source={{ uri: place.imagem }} style={styles.heroImage} />

                <View style={styles.body}>
                    <Text variant='headlineSmall' style={styles.title}>
                        {place.nome}
                    </Text>
                    <Chip
                        icon='map-marker-outline'
                        mode='outlined'
                        style={styles.chip}
                        textStyle={styles.chipText}>
                        {place.localizacao}
                    </Chip>
                    <Text variant='titleSmall' style={styles.sectionTitle}>
                        Descricao
                    </Text>
                    <Text variant='bodyMedium' style={styles.description}>
                        {place.descricao}
                    </Text>
                    <Button
                        mode='contained'
                        buttonColor={theme.colors.onSurface}
                        textColor={theme.colors.surface}
                        style={styles.favoriteButton}
                        onPress={() => {}}>
                        Favoritar
                    </Button>
                </View>
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
            textAlign: 'center',
        },
        scrollContent: {
            paddingHorizontal: 20,
            paddingBottom: 28,
        },
        heroImage: {
            width: '100%',
            height: 250,
            borderRadius: 20,
            backgroundColor: theme.colors.surfaceVariant,
        },
        body: {
            paddingTop: 18,
        },
        title: {
            marginBottom: 10,
            color: theme.colors.onSurface,
            fontFamily: brandFont,
        },
        chip: {
            alignSelf: 'flex-start',
            marginBottom: 18,
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.outline,
        },
        chipText: {
            fontSize: 11,
            color: theme.colors.onSurface,
        },
        sectionTitle: {
            marginBottom: 6,
            color: theme.colors.onSurface,
        },
        description: {
            color: theme.colors.onSurfaceVariant,
            lineHeight: 22,
        },
        favoriteButton: {
            marginTop: 22,
            alignSelf: 'flex-start',
        },
        fallback: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
        },
        fallbackTitle: {
            textAlign: 'center',
            color: theme.colors.onSurface,
        },
        fallbackText: {
            marginTop: 8,
            textAlign: 'center',
            color: theme.colors.onSurfaceVariant,
        },
    });
