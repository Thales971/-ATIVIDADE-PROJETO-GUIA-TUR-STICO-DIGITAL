import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import { getLocalPlaces } from '../../data/placesRepository';
import RemotePlaceImage from '../components/RemotePlaceImage';

const colors = {
    background: '#d9d1d0',
    surface: '#ffffff',
    text: '#111111',
    muted: '#676060',
    accent: '#00BCD9',
};

export default function HomeScreen({ navigation, category = 'pontos', title }) {
    const { width } = useWindowDimensions();
    const isWide = width >= 900;
    const places = getLocalPlaces(category);
    const sectionTitle = category === 'restaurantes' ? 'Melhores restaurantes' : 'Melhores viagens';
    const headerTitle = title ?? sectionTitle;

    const openDrawer = () => {
        const drawerNavigation =
            navigation.getParent?.()?.getParent?.() ?? navigation.getParent?.() ?? navigation;

        drawerNavigation?.dispatch(DrawerActions.openDrawer());
    };

    const openDetails = (place) => {
        const stackNavigation = navigation.getParent?.();

        if (stackNavigation?.navigate) {
            stackNavigation.navigate('Detalhes', { place });
            return;
        }

        navigation.navigate('Detalhes', { place });
    };

    const renderHeader = () => (
        <View style={styles.headerBlock}>
            <View style={styles.headerRow}>
                <Pressable onPress={openDrawer} style={styles.iconButton}>
                    <Feather name='menu' size={24} color={colors.text} />
                </Pressable>

                <View style={styles.headerCenter}>
                    <Text style={styles.brand}>BLACK CITY</Text>
                    <Text style={styles.headerTitle}>{headerTitle}</Text>
                </View>

                <Feather name='search' size={22} color={colors.text} />
            </View>

            <Text style={styles.sectionTitle}>{sectionTitle}</Text>
            <Text style={styles.sectionSubtitle}>Toque em um card para ver detalhes.</Text>
        </View>
    );

    const renderItem = ({ item, index }) => (
        <View style={styles.gridItem}>
            <Pressable
                style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
                onPress={() => openDetails(item)}>
                <RemotePlaceImage
                    uri={item.imagem}
                    category={category}
                    name={item.nome}
                    seed={item.id}
                    ordinal={index}
                    style={styles.cardVisual}
                />

                <View style={styles.cardBody}>
                    <View style={styles.cardTopRow}>
                        <Text style={styles.cardLocation} numberOfLines={1}>
                            {item.localizacao}
                        </Text>
                    </View>

                    <Text style={styles.cardName} numberOfLines={1}>
                        {item.nome}
                    </Text>
                    <Text style={styles.cardDescription} numberOfLines={3}>
                        {item.descricao}
                    </Text>
                </View>
            </Pressable>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={places}
                renderItem={renderItem}
                keyExtractor={(item) => String(item.id)}
                numColumns={isWide ? 2 : 1}
                key={isWide ? 'wide' : 'narrow'}
                columnWrapperStyle={isWide ? styles.columnWrapper : undefined}
                contentContainerStyle={styles.content}
                ListHeaderComponent={renderHeader}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyTitle}>Nenhum item disponivel.</Text>
                        <Text style={styles.emptyText}>Verifique o arquivo de dados local.</Text>
                    </View>
                }
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 28,
    },
    headerBlock: {
        marginBottom: 14,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 18,
    },
    iconButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.35)',
    },
    headerCenter: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    brand: {
        fontSize: 28,
        fontWeight: '700',
        letterSpacing: 1,
        color: colors.text,
        textAlign: 'center',
    },
    headerTitle: {
        marginTop: 4,
        fontSize: 12,
        color: colors.muted,
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: colors.text,
    },
    sectionSubtitle: {
        marginTop: 4,
        color: colors.muted,
        fontSize: 13,
    },
    gridItem: {
        flex: 1,
        marginBottom: 14,
    },
    columnWrapper: {
        gap: 14,
    },
    card: {
        backgroundColor: colors.surface,
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(17,17,17,0.08)',
    },
    cardPressed: {
        opacity: 0.95,
        transform: [{ scale: 0.995 }],
    },
    cardVisual: {
        width: '100%',
        height: 180,
    },
    cardBody: {
        padding: 14,
    },
    cardTopRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: 8,
    },
    cardLocation: {
        color: colors.accent,
        fontSize: 11,
        fontWeight: '700',
    },
    cardName: {
        color: colors.text,
        fontSize: 15,
        fontWeight: '700',
        marginBottom: 4,
    },
    cardDescription: {
        color: colors.muted,
        fontSize: 12,
        lineHeight: 18,
    },
    emptyState: {
        padding: 16,
        borderRadius: 18,
        backgroundColor: colors.surface,
    },
    emptyTitle: {
        color: colors.text,
        fontSize: 15,
        fontWeight: '700',
    },
    emptyText: {
        marginTop: 4,
        color: colors.muted,
        fontSize: 12,
    },
});
