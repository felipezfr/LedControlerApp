import React from 'react';
import { View, StyleSheet } from 'react-native';

const FormRow = props => {
    const { children } = props;

    return (
        <View style={styles.container}>
            {children}
        </View>
    )


}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: 'white',
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 25,
        marginRight: 25,
        borderRadius: 10,
        elevation: 0.5,
    }

});

export default FormRow;
