import React, { useEffect, useState } from 'react';
import { FlatList, Platform, StyleSheet, View } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import {
    ActivityIndicator,
    Button,
    Card,
    Chip,
    IconButton,
    Text,
    useTheme,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

import { loadPlaces } from '../../data/placesRepository';

const brandFont = Platform.select({
    ios: 'Times New Roman',
    android: 'serif',
    default: 'serif',
});

export default function HomeScreen({ navigation, category, title }) {
    const theme = useTheme();
    const styles = createStyles(theme);
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);

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
            navigation.getParent?.()?.getParent?.() ?? navigation.getParent?.();
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

    const renderItem = ({ item }) => (
        <Card mode='outlined' style={styles.card} onPress={() => openDetails(item)}>
            <Card.Cover source={{ uri: item.imagem }} style={styles.cover} />
            <Card.Content style={styles.cardContent}>
                <Text variant='titleLarge' style={styles.cardTitle}>
                    {item.nome}
                </Text>
                <Text variant='bodySmall' style={styles.cardDescription} numberOfLines={2}>
                    {item.descricao}
                </Text>
                <Chip
                    icon='map-marker-outline'
                    mode='outlined'
                    style={styles.chip}
                    textStyle={styles.chipText}>
                    {item.localizacao}
                </Chip>
            </Card.Content>
            <Card.Actions style={styles.cardActions}>
                <Button
                    mode='contained'
                    buttonColor={theme.colors.onSurface}
                    textColor={theme.colors.surface}
                    onPress={() => openDetails(item)}>
                    Ver detalhes
                </Button>
            </Card.Actions>
        </Card>
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
                <View style={styles.headerTitleBlock}>
                    <Text style={styles.brand}>BLACK CITY</Text>
                    <Text style={styles.headerSubtitle}>{title}</Text>
                </View>
                <Ionicons name='cube-outline' size={26} color={theme.colors.onSurface} />
            </View>

            <Text style={styles.pageHint}>Selecione um cartao para ver os detalhes.</Text>

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
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 12,
            paddingTop: 14,
            paddingBottom: 4,
        },
        headerTitleBlock: {
            flex: 1,
            alignItems: 'center',
            marginHorizontal: 8,
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
        pageHint: {
            paddingHorizontal: 20,
            paddingBottom: 8,
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
            paddingHorizontal: 20,
            paddingTop: 4,
            paddingBottom: 28,
        },
        card: {
            marginBottom: 16,
            borderRadius: 18,
            overflow: 'hidden',
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.outline,
        },
        cover: {
            height: 190,
        },
        cardContent: {
            paddingTop: 14,
        },
        cardTitle: {
            marginBottom: 6,
            color: theme.colors.onSurface,
            fontFamily: brandFont,
        },
        cardDescription: {
            marginBottom: 10,
            color: theme.colors.onSurfaceVariant,
            lineHeight: 18,
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
        cardActions: {
            justifyContent: 'flex-end',
            paddingHorizontal: 16,
            paddingBottom: 16,
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
