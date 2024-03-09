import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',

        padding: 0,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 16,
    },
    input:{
        marginTop:50,
        padding:40,
        backgroundColor:'white',
        borderRadius:50,
        justifyContent:'center',
        fontSize:15,

    },
    headerAction: {
        width: 40,
        height: 40,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 19,
        fontWeight: '600',
        color: '#652b94',
    },
    /** Content */
    content: {
        paddingHorizontal: 16,
    },
    contentFooter: {
        marginTop: 24,
        fontSize: 13,
        fontWeight: '500',
        textAlign: 'center',
        color: '#652b94',
    },
    /** Section */
    section: {
        paddingVertical: 12,
    },
    sectionTitle: {
        margin: 8,
        marginLeft: 12,
        fontSize: 13,
        letterSpacing: 0.33,
        fontWeight: '500',
        color: '#532a73',
        textTransform: 'uppercase',
    },
    sectionBody: {
        color: 'red',

        shadowColor: '#000',
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,

    },
    roundedRight: {
        borderBottomRightRadius: 12,
        borderTopRightRadius: 12,
    },

    /** Profile */
    profile: {
        padding: 12,
        backgroundColor: 'white',
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    profileAvatar: {
        width: 60,
        height: 60,
        borderRadius: 9999,
        marginRight: 12,
    },
    profileBody: {
        color: '#652b94',
        marginRight: 'auto',
    },
    profileName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#652b94',
    },
    profileHandle: {
        marginTop: 2,
        fontSize: 16,
        fontWeight: '400',
        color: '#9078a8',
    },
    /** Row */
    row: {
        height: 44,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingRight: 12,
        backgroundColor: 'white',
    },
    emailTitle: {
        borderWidth:1,
        borderColor:'purple',
        paddingLeft: 12,
        height: 44,
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingRight: 12,
        borderRadius: 18,
        backgroundColor: 'white',

    },
    column: {
        height: 44,
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',


        backgroundColor: 'wheat',
        borderRadius:20,
        margin:20,

    },
    rowWrapper: {
        paddingLeft: 16,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderColor: 'white',
    },
    rowFirst: {
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    rowLabel: {
        display:'flex',
        fontSize: 16,
        letterSpacing: 0.24,
        color: '#652b94',


    },
    rowSpacer: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
    },
    rowSpacer2: {
        paddingVertical:20,
        flexShrink: 1,
        flexBasis: 1,
    },
    rowValue: {
        fontSize: 16,
        fontWeight: '500',
        color: '#652b94',
        marginRight: 4,
    },
    buton:{
      paddingTop:10,
        height: "auto",
    },
    rowLast: {
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
    },
    rowLabelLogout: {
        width: '100%',
        textAlign: 'center',
        fontWeight: '600',
        color: '#dc2626',
    },
    issuesText:{


        textAlign:'center',
        position: 'absolute',
        top:60,
        fontSize: 40,
        backgroundColor:'#652b94',



        borderRadius:5,
        width:'80%',

        fontWeight: '600',
        color: 'white',
        zIndex: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
        padding:20,
        margin:10,

    }

});
