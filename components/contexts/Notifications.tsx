import React, { ReactNode, createContext, useContext, useState } from 'react';
import { TouchableOpacity, StyleSheet, PanResponder, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { Text, View } from '../Themed';

// Create context
type NotificationContextType = {
    showNotification: (message: string) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Custom notification component
const Notification = ({ message, onClose }: { message: string; onClose: () => void }) => {
    const [offsetY, setOffsetY] = useState(0);

    const handlePanResponderMove = (_: any, gestureState: any) => {
        if (gestureState.dy < 0) {
            setOffsetY(gestureState.dy);
        }
    };

    const handlePanResponderRelease = (_: any, gestureState: any) => {
        if (gestureState.dy < -50) {
            onClose();
        } else {
            setOffsetY(0);
        }
    };

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: handlePanResponderMove,
        onPanResponderRelease: handlePanResponderRelease,
    });

    return (
        <View >
            <View inverse={true} style={[styles.notification, { transform: [{ translateY: offsetY }] }]} {...panResponder.panHandlers}>
                <Text inverse={true} style={styles.notificationText}>{message}</Text>
                <TouchableOpacity>

                </TouchableOpacity>
            </View>
        </View>
    );
};

// Context Provider
export const NotificationProvider = ({ children }: {
    children: ReactNode
}) => {
    const [notification, setNotification] = useState<string | null>(null);

    const showNotification = (message: string) => {
        setNotification(message);
        setTimeout(() => {
            setNotification(null);
        }, 5000);
    };

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}

            {notification && <View style={{ position: 'absolute', bottom: 10, alignItems: 'center', left: 0, right: 0, backgroundColor: 'transparent' }}><Notification message={notification} onClose={() => setNotification(null)} /></View>}



        </NotificationContext.Provider>
    );
};

// Hook to use the notification context
export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};

// Styles
const styles = StyleSheet.create({
    notification: {
        borderRadius: 8,
        padding: 16,
        width: Dimensions.get('window').width - 32,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    notificationText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
