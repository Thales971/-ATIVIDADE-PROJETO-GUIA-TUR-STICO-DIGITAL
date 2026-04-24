import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Platform, Pressable, StyleSheet, View } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { IconButton, Text, useTheme } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';

import { loadPlaces } from '../../data/placesRepository';

const brandFont = Platform.select({
    ios: 'Times New Roman',
    android: 'serif',
    default: 'serif',
});

const CATEGORY_META = {
    pontos: {
        title: 'MELHORES PONTOS TURISTICOS DE BLACK CITY',
    },
    restaurantes: {
        title: 'MELHORES RESTAURANTES DE BLACK CITY',
    },
};

export default function HomeScreen({ navigation, category, title }) {
    const theme = useTheme();
    const styles = createStyles(theme);
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);

    const meta = CATEGORY_META[category] ?? CATEGORY_META.pontos;

    useEffect(() => {
        let isActive = true;

        async function fetchPlaces() {
            setLoading(true);

            try {
                const nextPlaces = await loadPlaces(category);
                if (isActive) {
                    setPlaces(nextPlaces);
                }
            } finally {
                if (isActive) {
                    setLoading(false);
                }
            }
        }

        fetchPlaces();

        return () => {
            isActive = false;
        };
    }, [category]);

    const openDrawer = () => {
        const drawerNavigation =
            navigation.getParent?.()?.getParent?.() ?? navigation.getParent?.() ?? navigation;
        drawerNavigation?.dispatch(DrawerActions.openDrawer());
    };

    const openDetails = (place) => {
        const stackNavigation = navigation.getParent?.();

        if (stackNavigation) {
            stackNavigation.navigate('Detalhes', { place });
            return;
        }

        navigation.navigate('Detalhes', { place });
    };

    const renderItem = ({ item, index }) => (
        <Pressable style={styles.placeRow} onPress={() => openDetails(item)}>
            <View style={styles.placeTextColumn}>
                <Text style={styles.placeTitle} numberOfLines={2}>
                    {index + 1}. {item.nome}
                </Text>
                <Text style={styles.placeLocation}>Local: {item.localizacao}</Text>
                <Text style={styles.placeLabel}>Descrição:</Text>
                <Text style={styles.placeDescription}>{item.descricao}</Text>
            </View>

            <Image source={{ uri: item.imagem }} style={styles.placeImage} />
        </Pressable>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <IconButton
                    icon='menu'
                    size={22}
                    iconColor={theme.colors.onSurface}
                    onPress={openDrawer}
                />

                <View style={styles.headerCenter}>
                    <View style={styles.brandRow}>
                        <Text style={styles.brand}>BLACK CITY</Text>
                        <View style={styles.cubeBox}>
                            <Feather name='box' size={24} color={theme.colors.onSurface} />
                        </View>
                    </View>
                    <Text style={styles.headerTitle}>{meta.title}</Text>
                    <View style={styles.headerLine} />
                </View>

                <IconButton icon='dots-vertical' size={22} iconColor={theme.colors.onSurface} />
            </View>

            <View style={styles.introBlock}>
                <Text style={styles.introTitle}>{meta.title}</Text>
            </View>

            {loading ? (
                <View style={styles.center}>
                    <ActivityIndicator size='large' color={theme.colors.onSurface} />
                    <Text style={styles.loadingText}>
                        Carregando dados...
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={places}
                    renderItem={renderItem}
                    keyExtractor={(item) => String(item.id)}
                    contentContainerStyle={styles.listContent}
                    ListEmptyComponent={
                        <View style={styles.emptyState}>
                            <Text style={styles.emptyTitle}>
                                Nenhum item disponivel.
                            </Text>
                            <Text style={styles.emptyText}>
                                Verifique o JSON local ou a funcao de carregamento.
                            </Text>
                        </View>
                    }
                    showsVerticalScrollIndicator={false}
                />
            )}
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
            paddingHorizontal: 8,
            paddingTop: 10,
            paddingBottom: 8,
        },
        headerCenter: {
            flex: 1,
            alignItems: 'center',
            paddingHorizontal: 8,
        },
        brandRow: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
        },
        brand: {
            fontFamily: brandFont,
            fontSize: 24,
            letterSpacing: 0.8,
            color: theme.colors.onSurface,
            textAlign: 'center',
        },
        cubeBox: {
            width: 42,
            height: 42,
            alignItems: 'center',
            justifyContent: 'center',
        },
        headerTitle: {
            marginTop: 34,
            maxWidth: 300,
            textAlign: 'center',
            fontSize: 23,
            fontWeight: '600',
            color: theme.colors.onSurface,
        },
        headerLine: {
            width: 250,
            height: 4,
            marginTop: 16,
            backgroundColor: theme.colors.onSurface,
            borderRadius: 2,
        },
        introBlock: {
            alignItems: 'center',
            paddingHorizontal: 18,
            paddingTop: 14,
        },
        introTitle: {
            display: 'none',
        },
        placeRow: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: 16,
            marginBottom: 54,
        },
        placeTextColumn: {
            flex: 1,
        },
        placeTitle: {
            color: theme.colors.onSurface,
            fontSize: 20,
            fontWeight: '600',
            lineHeight: 24,
            marginBottom: 2,
        },
        placeLocation: {
            color: theme.colors.onSurfaceVariant,
            fontSize: 12,
            marginBottom: 2,
        },
        placeLabel: {
            color: theme.colors.onSurface,
            fontSize: 12,
            fontWeight: '700',
        },
        placeDescription: {
            color: theme.colors.onSurface,
            fontSize: 14,
            lineHeight: 19,
        },
        placeImage: {
            width: 150,
            height: 195,
            borderRadius: 28,
            backgroundColor: theme.colors.surfaceVariant,
        },
        loadingText: {
            marginTop: 10,
            color: theme.colors.onSurfaceVariant,
        },
        emptyTitle: {
            color: theme.colors.onSurface,
            fontSize: 15,
            fontWeight: '700',
        },
        emptyText: {
            color: theme.colors.onSurfaceVariant,
            marginTop: 6,
        },
        listContent: {
            paddingHorizontal: 18,
            paddingTop: 36,
            paddingBottom: 30,
        },
        center: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
        },
        card: {
            marginBottom: 18,
            borderRadius: 24,
            overflow: 'hidden',
            backgroundColor: theme.colors.surface,
            borderColor: 'rgba(17,17,17,0.08)',
            borderWidth: 1,
        },
        imageWrap: {
            position: 'relative',
        },
        cover: {
            height: 214,
        },
        cardImageOverlay: {
            position: 'absolute',
            top: 14,
            right: 14,
        },
        imageChip: {
            backgroundColor: 'rgba(255,255,255,0.9)',
            borderColor: 'rgba(17,17,17,0.08)',
        },
        imageChipText: {
            fontSize: 10,
            color: theme.colors.onSurface,
        },
        cardContent: {
            paddingTop: 16,
            paddingBottom: 10,
        },
        cardTitleRow: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: 12,
        },
        cardTitleBlock: {
            flex: 1,
        },
        cardTitle: {
            color: theme.colors.onSurface,
            fontFamily: brandFont,
            fontSize: 20,
            lineHeight: 24,
        },
        cardSubtitle: {
            marginTop: 4,
            color: theme.colors.onSurfaceVariant,
            fontSize: 12,
        },
        cardIndex: {
            fontFamily: brandFont,
            fontSize: 18,
            color: theme.colors.onSurfaceVariant,
        },
        cardDescription: {
            marginTop: 12,
            marginBottom: 12,
            color: theme.colors.onSurfaceVariant,
            lineHeight: 18,
        },
        cardMetaRow: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 10,
        },
        chip: {
            alignSelf: 'flex-start',
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.outline,
        },
        chipText: {
            fontSize: 11,
            color: theme.colors.onSurface,
        },
        chipSoft: {
            alignSelf: 'flex-start',
            backgroundColor: 'rgba(17,17,17,0.03)',
            borderColor: 'rgba(17,17,17,0.08)',
        },
        chipSoftText: {
            fontSize: 11,
            color: theme.colors.onSurface,
        },
        cardActions: {
            justifyContent: 'flex-end',
            paddingHorizontal: 16,
            paddingBottom: 16,
        },
        cardButtonContent: {
            height: 42,
        },
        emptyState: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 48,
        },
        pageHint: {
            paddingHorizontal: 20,
            paddingTop: 10,
            paddingBottom: 10,
            fontSize: 12,
            color: theme.colors.onSurfaceVariant,
        },
    });
