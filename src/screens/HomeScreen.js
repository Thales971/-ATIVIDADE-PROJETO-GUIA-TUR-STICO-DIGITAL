import React, { useEffect, useState } from 'react';
import { FlatList, Platform, StyleSheet, View } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import {
    ActivityIndicator,
    Button,
    Card,
    Chip,
    IconButton,
    Surface,
    Text,
    useTheme,
} from 'react-native-paper';
import { Feather } from '@expo/vector-icons';

import { loadPlaces } from '../../data/placesRepository';

const brandFont = Platform.select({
    ios: 'Times New Roman',
    android: 'serif',
    default: 'serif',
});

const CATEGORY_META = {
    pontos: {
        tag: 'Turismo urbano',
        badge: 'OpenStreetMap + curadoria visual',
        title: 'Pontos turisticos em destaque',
        description:
            'Imagens tematicas e locais selecionados para manter a leitura coerente com o guia.',
        icon: 'map',
    },
    restaurantes: {
        tag: 'Gastronomia',
        badge: 'OpenStreetMap + curadoria visual',
        title: 'Restaurantes escolhidos para o guia',
        description:
            'A lista usa dados de mapa, mas as imagens sao curadas para representar a categoria.',
        icon: 'coffee',
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
        <Card mode='outlined' style={styles.card} onPress={() => openDetails(item)}>
            <View style={styles.imageWrap}>
                <Card.Cover source={{ uri: item.imagem }} style={styles.cover} />
                <View style={styles.cardImageOverlay}>
                    <Chip mode='outlined' style={styles.imageChip} textStyle={styles.imageChipText}>
                        {item.categoria === 'restaurantes' ? 'Gastronomia' : 'Turismo'}
                    </Chip>
                </View>
            </View>

            <Card.Content style={styles.cardContent}>
                <View style={styles.cardTitleRow}>
                    <View style={styles.cardTitleBlock}>
                        <Text variant='titleLarge' style={styles.cardTitle} numberOfLines={2}>
                            {item.nome}
                        </Text>
                        <Text variant='bodySmall' style={styles.cardSubtitle} numberOfLines={1}>
                            {item.localizacao}
                        </Text>
                    </View>
                    <Text style={styles.cardIndex}>{String(index + 1).padStart(2, '0')}</Text>
                </View>

                <Text variant='bodySmall' style={styles.cardDescription} numberOfLines={3}>
                    {item.descricao}
                </Text>

                <View style={styles.cardMetaRow}>
                    <Chip
                        icon='map-marker-outline'
                        mode='outlined'
                        style={styles.chip}
                        textStyle={styles.chipText}>
                        {item.localizacao}
                    </Chip>
                    <Chip mode='outlined' style={styles.chipSoft} textStyle={styles.chipSoftText}>
                        Imagem curada
                    </Chip>
                </View>
            </Card.Content>

            <Card.Actions style={styles.cardActions}>
                <Button
                    mode='contained'
                    buttonColor={theme.colors.onSurface}
                    textColor={theme.colors.surface}
                    contentStyle={styles.cardButtonContent}
                    onPress={() => openDetails(item)}>
                    Ver detalhes
                </Button>
            </Card.Actions>
        </Card>
    );

    return (
        <View style={styles.container}>
            <View style={styles.backgroundOrbTop} pointerEvents='none' />
            <View style={styles.backgroundOrbBottom} pointerEvents='none' />

            <View style={styles.header}>
                <IconButton
                    icon='menu'
                    size={22}
                    iconColor={theme.colors.onSurface}
                    onPress={openDrawer}
                />

                <View style={styles.headerCenter}>
                    <Chip
                        mode='outlined'
                        style={styles.headerChip}
                        textStyle={styles.headerChipText}>
                        {meta.tag}
                    </Chip>
                    <Text style={styles.brand}>BLACK CITY</Text>
                    <Text style={styles.headerSubtitle}>{title}</Text>
                </View>

                <View style={styles.headerIconFrame}>
                    <Feather name={meta.icon} size={22} color={theme.colors.onSurface} />
                </View>
            </View>

            <Surface style={styles.heroCard} elevation={1}>
                <View style={styles.heroTopRow}>
                    <Chip mode='outlined' style={styles.heroChip} textStyle={styles.heroChipText}>
                        {meta.badge}
                    </Chip>
                    <Chip mode='outlined' style={styles.heroChip} textStyle={styles.heroChipText}>
                        {loading ? 'Sincronizando' : `${places.length} itens`}
                    </Chip>
                </View>

                <Text style={styles.heroTitle}>{meta.title}</Text>
                <Text style={styles.heroText}>{meta.description}</Text>

                <View style={styles.heroStatsRow}>
                    <View style={styles.heroStat}>
                        <Text style={styles.heroStatValue}>{loading ? '--' : places.length}</Text>
                        <Text style={styles.heroStatLabel}>Itens exibidos</Text>
                    </View>
                    <View style={styles.heroDivider} />
                    <View style={styles.heroStat}>
                        <Text style={styles.heroStatValue}>OSM</Text>
                        <Text style={styles.heroStatLabel}>Dados base</Text>
                    </View>
                </View>
            </Surface>

            <Text style={styles.pageHint}>
                Selecione um cartao para abrir a pagina de detalhes.
            </Text>

            {loading ? (
                <View style={styles.center}>
                    <ActivityIndicator size='large' color={theme.colors.onSurface} />
                    <Text variant='bodySmall' style={styles.loadingText}>
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
                            <Text variant='titleMedium' style={styles.emptyTitle}>
                                Nenhum item disponivel.
                            </Text>
                            <Text variant='bodySmall' style={styles.emptyText}>
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
            paddingBottom: 10,
        },
        backgroundOrbTop: {
            position: 'absolute',
            top: -26,
            right: -34,
            width: 180,
            height: 180,
            borderRadius: 90,
            backgroundColor: 'rgba(255,255,255,0.16)',
        },
        backgroundOrbBottom: {
            position: 'absolute',
            left: -54,
            bottom: 80,
            width: 190,
            height: 190,
            borderRadius: 95,
            backgroundColor: 'rgba(255,255,255,0.1)',
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            paddingTop: 10,
            paddingBottom: 8,
        },
        headerCenter: {
            flex: 1,
            alignItems: 'center',
            paddingHorizontal: 10,
        },
        headerChip: {
            marginBottom: 6,
            backgroundColor: 'rgba(255,255,255,0.4)',
            borderColor: 'rgba(17,17,17,0.08)',
        },
        headerChipText: {
            fontSize: 10,
            color: theme.colors.onSurface,
        },
        brand: {
            fontFamily: brandFont,
            fontSize: 24,
            letterSpacing: 0.9,
            color: theme.colors.onSurface,
            textAlign: 'center',
        },
        headerSubtitle: {
            marginTop: 2,
            fontSize: 12,
            color: theme.colors.onSurfaceVariant,
            textAlign: 'center',
        },
        headerIconFrame: {
            width: 38,
            height: 38,
            borderRadius: 12,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255,255,255,0.28)',
            borderWidth: 1,
            borderColor: 'rgba(17,17,17,0.08)',
        },
        heroCard: {
            marginHorizontal: 16,
            marginTop: 2,
            borderRadius: 24,
            paddingHorizontal: 18,
            paddingVertical: 18,
            backgroundColor: theme.colors.surface,
            borderWidth: 1,
            borderColor: 'rgba(17,17,17,0.08)',
        },
        heroTopRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 10,
            marginBottom: 14,
        },
        heroChip: {
            backgroundColor: 'rgba(17,17,17,0.03)',
            borderColor: 'rgba(17,17,17,0.08)',
        },
        heroChipText: {
            fontSize: 10,
            color: theme.colors.onSurface,
        },
        heroTitle: {
            fontFamily: brandFont,
            fontSize: 22,
            color: theme.colors.onSurface,
            marginBottom: 10,
        },
        heroText: {
            color: theme.colors.onSurfaceVariant,
            lineHeight: 20,
            fontSize: 13,
        },
        heroStatsRow: {
            marginTop: 16,
            paddingTop: 14,
            borderTopWidth: 1,
            borderTopColor: 'rgba(17,17,17,0.08)',
            flexDirection: 'row',
            alignItems: 'center',
        },
        heroStat: {
            flex: 1,
        },
        heroStatValue: {
            fontFamily: brandFont,
            fontSize: 18,
            color: theme.colors.onSurface,
        },
        heroStatLabel: {
            marginTop: 2,
            color: theme.colors.onSurfaceVariant,
            fontSize: 11,
        },
        heroDivider: {
            width: 1,
            height: 30,
            backgroundColor: 'rgba(17,17,17,0.08)',
        },
        pageHint: {
            paddingHorizontal: 20,
            paddingTop: 10,
            paddingBottom: 10,
            fontSize: 12,
            color: theme.colors.onSurfaceVariant,
        },
        center: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
        },
        loadingText: {
            marginTop: 10,
            color: theme.colors.onSurfaceVariant,
        },
        listContent: {
            paddingHorizontal: 16,
            paddingTop: 4,
            paddingBottom: 28,
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
        emptyTitle: {
            textAlign: 'center',
            color: theme.colors.onSurface,
        },
        emptyText: {
            marginTop: 6,
            textAlign: 'center',
            color: theme.colors.onSurfaceVariant,
            maxWidth: 260,
        },
    });
