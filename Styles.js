import {StyleSheet} from 'react-native';
import {Colors} from "react-native/Libraries/NewAppScreen";
import React from 'react';

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.white,
    },
    engine: {
        position: 'absolute',
        right: 0,
    },
    body: {
        backgroundColor: Colors.white,
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: Colors.black,
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark,
    },
    highlight: {
        fontWeight: '700',
    },
    footer: {
        color: Colors.dark,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },
    input: {
        margin: 15,
        height: 40,
        borderColor: '#616161',
        borderWidth: 1,
    },
    image: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 250,
        height: 250,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    button: {
        height: 45,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        marginTop: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    unhealthyHighlight: {
        color:'#ff1c13'
    },
    healthyHighlight: {
        color:'#138509'
    },
    unknownHighlight: {
        color:'#858383'
    }

});

export default styles;
