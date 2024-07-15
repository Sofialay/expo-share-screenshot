import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    hidden: {
        opacity: 0,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    screenshot: {
        width: '80%',
        height: '50%',
        resizeMode: 'contain',
    },
  });
  