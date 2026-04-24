import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { Button, Chip, IconButton } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import RemotePlaceImage from '../components/RemotePlaceImage';

const colors = {
    background: '#d9d1d0',
    surface: '#ffffff',
    text: '#111111',
    muted: '#676060',
    border: '#cfc7c7',
    accent: '#00BCD9',
};

export default function DetailsScreen({ navigation, route }) {
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
                        iconColor={colors.text}
                        onPress={() => navigation.goBack()}
                    />
                    <Text style={styles.brand}>BLACK CITY</Text>
                    <IconButton
                        icon='menu'
                        size={22}
                        iconColor={colors.text}
                        onPress={openDrawer}
                    />
                </View>

                <View style={styles.emptyWrap}>
                    <View style={styles.emptyCard}>
                        <Feather name='map-pin' size={26} color={colors.text} />
                        <Text style={styles.emptyTitle}>Detalhes indisponiveis</Text>
                        <Text style={styles.emptyText}>
                            Nenhum local foi enviado pela navegacao.
                        </Text>
                        <Button
                            mode='contained'
                            buttonColor={colors.text}
                            textColor={colors.surface}
                            style={styles.button}
                            contentStyle={styles.buttonContent}
                            onPress={() => navigation.navigate('Início')}>
                            Voltar ao inicio
                        </Button>
                    </View>
                </View>
            </View>
        );
    }

    const categoryLabel = place.categoria === 'restaurantes' ? 'Gastronomia' : 'Turismo';

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <IconButton
                    icon='arrow-left'
                    size={22}
                    iconColor={colors.text}
                    onPress={() => navigation.goBack()}
                />
                <Text style={styles.brand}>BLACK CITY</Text>
                <IconButton icon='menu' size={22} iconColor={colors.text} onPress={openDrawer} />
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}>
                <View style={styles.hero}>
                    <RemotePlaceImage
                        uri={place.imagem}
                        category={place.categoria}
                        name={place.nome}
                        seed={place.id}
                        ordinal={0}
                        style={styles.heroVisual}
                    />
                    <Chip mode='outlined' style={styles.heroChip} textStyle={styles.heroChipText}>
                        {categoryLabel}
                    </Chip>
                </View>

                <View style={styles.card}>
                    <Text style={styles.title}>{place.nome}</Text>
                    <Text style={styles.location}>{place.localizacao}</Text>

                    <Text style={styles.sectionTitle}>Descricao</Text>
                    <Text style={styles.description}>{place.descricao}</Text>

                    <View style={styles.infoRow}>
                        <View style={styles.infoBox}>
                            <Text style={styles.infoLabel}>Origem</Text>
                            <Text style={styles.infoValue}>Dados locais</Text>
                        </View>
                        <View style={styles.infoBox}>
                            <Text style={styles.infoLabel}>Imagem</Text>
                            <Text style={styles.infoValue}>Curada</Text>
                        </View>
                    </View>

                    <Button
                        mode='contained'
                        buttonColor={colors.text}
                        textColor={colors.surface}
                        style={styles.button}
                        contentStyle={styles.buttonContent}
                        onPress={() => navigation.goBack()}>
                        Voltar
                    </Button>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        paddingTop: 12,
        paddingBottom: 8,
    },
    brand: {
        color: colors.text,
        fontSize: 20,
        fontWeight: '700',
        letterSpacing: 0.8,
    },
    scrollContent: {
        paddingBottom: 28,
    },
    hero: {
        marginHorizontal: 16,
        borderRadius: 24,
        overflow: 'hidden',
        backgroundColor: colors.surface,
    },
    heroVisual: {
        width: '100%',
        height: 260,
    },
    heroChip: {
        position: 'absolute',
        left: 14,
        bottom: 14,
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderColor: 'rgba(17,17,17,0.1)',
    },
    heroChipText: {
        fontSize: 10,
        color: colors.text,
    },
    card: {
        marginHorizontal: 16,
        marginTop: 12,
        backgroundColor: colors.surface,
        borderRadius: 24,
        padding: 18,
        borderWidth: 1,
        borderColor: 'rgba(17,17,17,0.08)',
    },
    title: {
        color: colors.text,
        fontSize: 24,
        fontWeight: '700',
        lineHeight: 28,
    },
    location: {
        marginTop: 6,
        color: colors.accent,
        fontSize: 13,
        fontWeight: '700',
    },
    sectionTitle: {
        marginTop: 16,
        color: colors.text,
        fontSize: 15,
        fontWeight: '700',
    },
    description: {
        marginTop: 8,
        color: colors.muted,
        fontSize: 13,
        lineHeight: 21,
    },
    infoRow: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 16,
    },
    infoBox: {
        flex: 1,
        backgroundColor: 'rgba(17,17,17,0.03)',
        borderRadius: 16,
        padding: 12,
        borderWidth: 1,
        borderColor: 'rgba(17,17,17,0.08)',
    },
    infoLabel: {
        color: colors.muted,
        fontSize: 11,
        marginBottom: 2,
    },
    infoValue: {
        color: colors.text,
        fontSize: 13,
        fontWeight: '700',
    },
    button: {
        marginTop: 16,
        borderRadius: 14,
    },
    buttonContent: {
        height: 50,
    },
    emptyWrap: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 24,
    },
    emptyCard: {
        backgroundColor: colors.surface,
        borderRadius: 24,
        padding: 22,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(17,17,17,0.08)',
        minHeight: 220,
    },
    emptyTitle: {
        marginTop: 12,
        color: colors.text,
        fontSize: 18,
        fontWeight: '700',
        textAlign: 'center',
    },
    emptyText: {
        marginTop: 8,
        color: colors.muted,
        fontSize: 12,
        lineHeight: 18,
        textAlign: 'center',
    },
});
