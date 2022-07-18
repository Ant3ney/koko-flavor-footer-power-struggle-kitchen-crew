var basics = {
    container: {

    },
    fluidContainer: {
        height: "100%"
    },
    fullFluidContainer: {
        height: "100%",
        width: "100%"
    },
    centerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bgWhite: {
      backgroundColor: '#fff',
    },
    bgStandard: {
        backgroundColor: "#F0EBD7"
    },
    gridContainer: {
        backgroundColor: "#F0EBD7"
    },
    gridRow: {
        flexDirection: "row",
    },
    gridSCol2: {
        height: "auto",
        width: "50%"
    },
    gridColGeneric: {
        height: "auto",
        width: "50%"
    },
    testContainer: {
        marginTop: 50,
        marginLeft: 50,
        marginRight: 50
    },
    makeForground: (index) => {
        return({
            zIndex: index, 
            elevation: index,
            position: "absolute"
        });
    },
    width100: {
        width: "100%"
    },
    textAlignCenter: {
        textAlign: "center"
    },
    text10: {
        fontSize: 10
    },
    text15: {
        fontSize: 15
    },
    p1: {
        padding: 20
    },
    p2: {
        padding: 40
    },
    p3: {
        padding: 60
    },
    p4: {
        padding: 80
    },
    p5: {
        padding: 100
    },
    paddingBottom05: {
        paddingBottom: 10
    },
    paddingBottom1: {
        paddingBottom: 20
    },
    paddingBottom2: {
        paddingBottom: 40
    },
    paddingBottom4: {
        paddingBottom: 80
    },
    heightAuto:{
        height: "auto"
    },
    height1: {
        height: 40
    },
    height2: {
        height: 80
    },
    height3: {
        height: 120
    },
    height4: {
        height: 160
    },
    height5: {
        height: 180
    }
}

export default basics;