import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer, DefaultTheme as NavigationTheme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MD3LightTheme, Provider as PaperProvider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import WelcomeScreen from './src/screens/WelcomeScreen';
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import AboutScreen from './src/screens/AboutScreen';
import ContactScreen from './src/screens/ContactScreen';

const colors = {
    primary: '#111111',
    secondary: '#5f5858',
    background: '#d9d1d0',
    surface: '#ffffff',
    surfaceVariant: '#f3efef',
    text: '#111111',
    muted: '#676060',
    border: '#cfc7c7',
    darkSurface: '#2f2a2a',
};

const paperTheme = {
    ...MD3LightTheme,
    colors: {
        ...MD3LightTheme.colors,
        primary: colors.primary,
        secondary: colors.secondary,
        background: colors.background,
        surface: colors.surface,
        surfaceVariant: colors.surfaceVariant,
        onSurface: colors.text,
        onSurfaceVariant: colors.muted,
        outline: colors.border,
    },
};

const navigationTheme = {
    ...NavigationTheme,
    colors: {
        ...NavigationTheme.colors,
        primary: colors.primary,
        background: colors.background,
        card: colors.surface,
        text: colors.text,
        border: colors.border,
        notification: colors.secondary,
    },
};

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function AppTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: false,
                tabBarActiveTintColor: colors.surface,
                tabBarInactiveTintColor: '#b7b0b0',
                tabBarStyle: {
                    backgroundColor: colors.darkSurface,
                    borderTopColor: colors.darkSurface,
                    height: 68,
                    paddingBottom: 10,
                    paddingTop: 8,
                },
                tabBarIcon: ({ color, size }) => {
                    const iconName =
                        route.name === 'Pontos Turísticos' ? 'map-outline' : 'restaurant-outline';

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}>
            <Tab.Screen name='Pontos Turísticos'>
                {(props) => <HomeScreen {...props} category='pontos' title='Pontos Turísticos' />}
            </Tab.Screen>
            <Tab.Screen name='Restaurantes'>
                {(props) => <HomeScreen {...props} category='restaurantes' title='Restaurantes' />}
            </Tab.Screen>
        </Tab.Navigator>
    );
}

function MainStack() {
    return (
        <Stack.Navigator initialRouteName='Welcome' screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Welcome' component={WelcomeScreen} />
            <Stack.Screen name='Tabs' component={AppTabs} />
            <Stack.Screen name='Detalhes' component={DetailsScreen} />
        </Stack.Navigator>
    );
}

export default function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
                <PaperProvider theme={paperTheme}>
                    <NavigationContainer theme={navigationTheme}>
                        <StatusBar style='dark' />
                        <Drawer.Navigator
                            initialRouteName='Início'
                            screenOptions={{
                                headerShown: false,
                                drawerActiveTintColor: colors.surface,
                                drawerInactiveTintColor: colors.text,
                                drawerActiveBackgroundColor: colors.darkSurface,
                                drawerLabelStyle: {
                                    fontWeight: '700',
                                },
                                drawerStyle: {
                                    backgroundColor: colors.background,
                                    width: 280,
                                },
                                sceneContainerStyle: {
                                    backgroundColor: colors.background,
                                },
                            }}>
                            <Drawer.Screen
                                name='Início'
                                component={MainStack}
                                options={{
                                    drawerIcon: ({ color, size }) => (
                                        <Ionicons name='home-outline' color={color} size={size} />
                                    ),
                                }}
                            />
                            <Drawer.Screen
                                name='Sobre'
                                component={AboutScreen}
                                options={{
                                    drawerIcon: ({ color, size }) => (
                                        <Ionicons
                                            name='information-circle-outline'
                                            color={color}
                                            size={size}
                                        />
                                    ),
                                }}
                            />
                            <Drawer.Screen
                                name='Contato'
                                component={ContactScreen}
                                options={{
                                    drawerIcon: ({ color, size }) => (
                                        <Ionicons name='call-outline' color={color} size={size} />
                                    ),
                                }}
                            />
                        </Drawer.Navigator>
                    </NavigationContainer>
                </PaperProvider>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}
