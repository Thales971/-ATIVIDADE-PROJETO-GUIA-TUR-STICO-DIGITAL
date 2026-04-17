import React from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { Button, Chip, IconButton, Surface, Text, useTheme } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';

const brandFont = Platform.select({
    ios: 'Times New Roman',
    android: 'serif',
    default: 'serif',
});

const highlights = [
    {
        icon: 'database',
        title: 'Dados vivos',
        text: 'OpenStreetMap e Nominatim alimentam nomes, descricoes e localizacao dos lugares.',
    },
    {
        icon: 'image',
        title: 'Imagem curada',
        text: 'As fotos sao tematicas por categoria para evitar imagens aleatorias e sem contexto.',
    },
    {
        icon: 'sliders',
        title: 'Evolucao simples',
        text: 'A estrutura foi montada para permitir troca de API, conteudo e estilo sem reescrever tudo.',
    },
];

export default function AboutScreen({ navigation }) {
    const theme = useTheme();
    const styles = createStyles(theme);

    const openDrawer = () => {
        const drawerNavigation = navigation.getParent?.() ?? navigation;
        drawerNavigation?.dispatch(DrawerActions.openDrawer());
    };

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
                <Text style={styles.brand}>BLACK CITY</Text>
                <Feather name='info' size={24} color={theme.colors.onSurface} />
            </View>

            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}>
                <Surface style={styles.heroCard} elevation={1}>
                    <Chip mode='outlined' style={styles.chip} textStyle={styles.chipText}>
                        Beta
                    </Chip>
                    <Text style={styles.heroTitle}>Guia Turistico Digital</Text>
                    <Text style={styles.heroText}>
                        Uma base editorial para apresentar pontos turisticos, restaurantes e
                        informacoes de contato com visual consistente e manutencao simples.
                    </Text>

                    <View style={styles.heroStatsRow}>
                        <View style={styles.heroStat}>
                            <Text style={styles.heroStatValue}>OSM</Text>
                            <Text style={styles.heroStatLabel}>Base de dados</Text>
                        </View>
                        <View style={styles.heroDivider} />
                        <View style={styles.heroStat}>
                            <Text style={styles.heroStatValue}>UI</Text>
                            <Text style={styles.heroStatLabel}>Curadoria visual</Text>
                        </View>
                        <View style={styles.heroDivider} />
                        <View style={styles.heroStat}>
                            <Text style={styles.heroStatValue}>API</Text>
                            <Text style={styles.heroStatLabel}>Flexivel</Text>
                        </View>
                    </View>
                </Surface>

                {highlights.map((item) => (
                    <Surface key={item.title} style={styles.card} elevation={1}>
                        <View style={styles.cardIcon}>
                            <Feather name={item.icon} size={20} color={theme.colors.onSurface} />
                        </View>
                        <View style={styles.cardBody}>
                            <Text style={styles.cardTitle}>{item.title}</Text>
                            <Text style={styles.cardText}>{item.text}</Text>
                        </View>
                    </Surface>
                ))}

                <Surface style={styles.footerCard} elevation={1}>
                    <Text style={styles.footerTitle}>Fonte e criterio visual</Text>
                    <Text style={styles.footerText}>
                        Os dados textuais vem de OpenStreetMap / Nominatim. As imagens sao tematicas
                        e agrupadas por categoria para manter coerencia com o guia e evitar fotos
                        aleatorias.
                    </Text>
                </Surface>

                <Button
                    mode='contained'
                    buttonColor={theme.colors.onSurface}
                    textColor={theme.colors.surface}
                    style={styles.button}
                    contentStyle={styles.buttonContent}
                    onPress={() => navigation.navigate('Início')}>
                    Voltar ao inicio
                </Button>
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
        backgroundOrbTop: {
            position: 'absolute',
            top: 8,
            right: -50,
            width: 180,
            height: 180,
            borderRadius: 90,
            backgroundColor: 'rgba(255,255,255,0.16)',
        },
        backgroundOrbBottom: {
            position: 'absolute',
            left: -60,
            bottom: 60,
            width: 200,
            height: 200,
            borderRadius: 100,
            backgroundColor: 'rgba(255,255,255,0.12)',
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
            fontFamily: brandFont,
            fontSize: 20,
            letterSpacing: 0.8,
            color: theme.colors.onSurface,
        },
        scroll: {
            flex: 1,
        },
        content: {
            paddingHorizontal: 16,
            paddingBottom: 28,
        },
        heroCard: {
            borderRadius: 24,
            backgroundColor: theme.colors.surface,
            padding: 20,
            borderWidth: 1,
            borderColor: 'rgba(17,17,17,0.08)',
        },
        chip: {
            alignSelf: 'flex-start',
            marginBottom: 14,
            backgroundColor: 'rgba(17,17,17,0.03)',
            borderColor: 'rgba(17,17,17,0.1)',
        },
        chipText: {
            fontSize: 10,
            color: theme.colors.onSurface,
        },
        heroTitle: {
            fontFamily: brandFont,
            fontSize: 24,
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
        card: {
            marginTop: 14,
            borderRadius: 22,
            backgroundColor: theme.colors.surface,
            padding: 16,
            borderWidth: 1,
            borderColor: 'rgba(17,17,17,0.08)',
            flexDirection: 'row',
            alignItems: 'flex-start',
        },
        cardIcon: {
            width: 40,
            height: 40,
            borderRadius: 14,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(17,17,17,0.06)',
            marginRight: 12,
        },
        cardBody: {
            flex: 1,
        },
        cardTitle: {
            color: theme.colors.onSurface,
            fontFamily: brandFont,
            fontSize: 14,
            marginBottom: 5,
        },
        cardText: {
            color: theme.colors.onSurfaceVariant,
            lineHeight: 18,
            fontSize: 12,
        },
        footerCard: {
            marginTop: 14,
            borderRadius: 22,
            backgroundColor: theme.colors.surface,
            padding: 18,
            borderWidth: 1,
            borderColor: 'rgba(17,17,17,0.08)',
        },
        footerTitle: {
            color: theme.colors.onSurface,
            fontFamily: brandFont,
            fontSize: 15,
            marginBottom: 8,
        },
        footerText: {
            color: theme.colors.onSurfaceVariant,
            lineHeight: 18,
            fontSize: 12,
        },
        button: {
            marginTop: 16,
            alignSelf: 'stretch',
            borderRadius: 14,
        },
        buttonContent: {
            height: 50,
        },
    });
