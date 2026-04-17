import React from 'react';
import { Image, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { Button, Chip, IconButton, Surface, Text, useTheme } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';

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
        const drawerNavigation =
            navigation.getParent?.()?.getParent?.() ?? navigation.getParent?.() ?? navigation;
        drawerNavigation?.dispatch(DrawerActions.openDrawer());
    };

    if (!place) {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <IconButton
                        icon='arrow-left'
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

                <View style={styles.fallbackWrap}>
                    <Surface style={styles.fallbackCard} elevation={1}>
                        <Feather name='map-pin' size={26} color={theme.colors.onSurface} />
                        <Text style={styles.fallbackTitle}>Detalhes indisponiveis</Text>
                        <Text style={styles.fallbackText}>
                            Nenhum local foi enviado pela navegacao.
                        </Text>
                    </Surface>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
                <View style={styles.heroWrap}>
                    <Image source={{ uri: place.imagem }} style={styles.heroImage} />
                    <View style={styles.heroOverlay} />

                    <View style={styles.heroHeader}>
                        <IconButton
                            icon='arrow-left'
                            size={22}
                            iconColor={theme.colors.onSurface}
                            style={styles.headerButton}
                            onPress={() => navigation.goBack()}
                        />
                        <Text style={styles.brand}>BLACK CITY</Text>
                        <IconButton
                            icon='menu'
                            size={22}
                            iconColor={theme.colors.onSurface}
                            style={styles.headerButton}
                            onPress={openDrawer}
                        />
                    </View>

                    <Chip mode='outlined' style={styles.heroChip} textStyle={styles.heroChipText}>
                        {place.categoria === 'restaurantes' ? 'Gastronomia' : 'Turismo'}
                    </Chip>
                </View>

                <Surface style={styles.bodyCard} elevation={1}>
                    <Text style={styles.title}>{place.nome}</Text>
                    <Chip
                        icon='map-marker-outline'
                        mode='outlined'
                        style={styles.locationChip}
                        textStyle={styles.locationChipText}>
                        {place.localizacao}
                    </Chip>

                    <View style={styles.metaRow}>
                        <Chip
                            mode='outlined'
                            style={styles.metaChip}
                            textStyle={styles.metaChipText}>
                            Dados OSM
                        </Chip>
                        <Chip
                            mode='outlined'
                            style={styles.metaChip}
                            textStyle={styles.metaChipText}>
                            Imagem curada
                        </Chip>
                    </View>

                    <Text style={styles.sectionTitle}>Descricao</Text>
                    <Text style={styles.description}>{place.descricao}</Text>

                    <Surface style={styles.noteCard} elevation={0}>
                        <Feather name='image' size={18} color={theme.colors.onSurface} />
                        <Text style={styles.noteText}>
                            A imagem exibida segue um criterio tematico por categoria para manter a
                            leitura visual coerente com o guia.
                        </Text>
                    </Surface>

                    <Button
                        mode='contained'
                        buttonColor={theme.colors.onSurface}
                        textColor={theme.colors.surface}
                        style={styles.button}
                        contentStyle={styles.buttonContent}
                        onPress={() => {}}>
                        Favoritar
                    </Button>
                </Surface>
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
        scroll: {
            paddingBottom: 24,
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
        fallbackWrap: {
            flex: 1,
            paddingHorizontal: 16,
            paddingTop: 24,
        },
        fallbackCard: {
            borderRadius: 24,
            backgroundColor: theme.colors.surface,
            padding: 22,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: 'rgba(17,17,17,0.08)',
            minHeight: 220,
        },
        fallbackTitle: {
            marginTop: 12,
            color: theme.colors.onSurface,
            fontFamily: brandFont,
            fontSize: 18,
        },
        fallbackText: {
            marginTop: 8,
            color: theme.colors.onSurfaceVariant,
            textAlign: 'center',
            lineHeight: 18,
        },
        heroWrap: {
            marginHorizontal: 16,
            marginTop: 4,
            borderRadius: 28,
            overflow: 'hidden',
            position: 'relative',
            backgroundColor: theme.colors.surfaceVariant,
        },
        heroImage: {
            width: '100%',
            height: 300,
        },
        heroOverlay: {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(0,0,0,0.08)',
        },
        heroHeader: {
            position: 'absolute',
            top: 8,
            left: 6,
            right: 6,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        headerButton: {
            margin: 0,
            backgroundColor: 'rgba(255,255,255,0.78)',
        },
        heroChip: {
            position: 'absolute',
            left: 14,
            bottom: 14,
            backgroundColor: 'rgba(255,255,255,0.86)',
            borderColor: 'rgba(17,17,17,0.08)',
        },
        heroChipText: {
            fontSize: 10,
            color: theme.colors.onSurface,
        },
        bodyCard: {
            marginHorizontal: 16,
            marginTop: -18,
            borderRadius: 28,
            backgroundColor: theme.colors.surface,
            padding: 20,
            borderWidth: 1,
            borderColor: 'rgba(17,17,17,0.08)',
        },
        title: {
            marginBottom: 10,
            color: theme.colors.onSurface,
            fontFamily: brandFont,
            fontSize: 24,
            lineHeight: 28,
        },
        locationChip: {
            alignSelf: 'flex-start',
            marginBottom: 14,
            backgroundColor: 'rgba(17,17,17,0.03)',
            borderColor: 'rgba(17,17,17,0.1)',
        },
        locationChipText: {
            fontSize: 11,
            color: theme.colors.onSurface,
        },
        metaRow: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 10,
            marginBottom: 16,
        },
        metaChip: {
            alignSelf: 'flex-start',
            backgroundColor: 'rgba(17,17,17,0.03)',
            borderColor: 'rgba(17,17,17,0.08)',
        },
        metaChipText: {
            fontSize: 10,
            color: theme.colors.onSurface,
        },
        sectionTitle: {
            marginBottom: 8,
            color: theme.colors.onSurface,
            fontFamily: brandFont,
            fontSize: 15,
        },
        description: {
            color: theme.colors.onSurfaceVariant,
            lineHeight: 22,
            fontSize: 13,
        },
        noteCard: {
            marginTop: 18,
            borderRadius: 20,
            backgroundColor: 'rgba(17,17,17,0.03)',
            padding: 14,
            borderWidth: 1,
            borderColor: 'rgba(17,17,17,0.08)',
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: 10,
        },
        noteText: {
            flex: 1,
            color: theme.colors.onSurfaceVariant,
            fontSize: 12,
            lineHeight: 18,
        },
        button: {
            marginTop: 18,
            alignSelf: 'stretch',
            borderRadius: 14,
        },
        buttonContent: {
            height: 50,
        },
    });
