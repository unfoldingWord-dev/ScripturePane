var style = {
  pane: {
    contentLTR: {
      marginTop: "5px",
      overflowY: 'auto',
      width: '100%',
      height: '10.35em',
      direction: 'ltr'
    },
    contentRTL: {
      marginTop: "5px",
      overflowY: 'auto',
      width: '100%',
      height: '10.35em',
      direction: 'rtl'
    },
    title: {
      fontWeight: '700',
      fontSize: '1em',
      marginBottom: "-5px",
      marginTop: "5px",
      display: "flex",
    }
  },
  dropzone: {
    active: {
      border: '2px solid #727272',
      backgroundColor: '#f5f5f5'
    },
    text: {
      lineHeight: '200px',
      verticalAlign: 'middle',
      width: '100%'
    },
    main: {
      width: '100%',
      color: '#212121',
      height: '200px',
      border: '2px dashed #727272',
      borderRadius: '5px',
      fontSize: '25px'
    }
  },
  menuItem: {
    text: {
      cursor: 'pointer'
    },
    flag: {
      enabled: {
        color: '#CC0000',
        visibility: 'visible'
      },
      disabled: {
        visibility: 'hidden'
      }
    },
    statusIcon: {
      correct: {
        color: 'green',
        display: 'initial'
      },
      replaced: {
        color: 'gold',
        display: 'initial'
      },
      flagged: {
        color: 'red',
        display: 'initial'
      },
      unchecked: {
        display: 'none'
      }
    }
  },
  removePane:{
    float: "right",
    cursor: "pointer",
    marginTop: "3px"
  },
  headingDescription:{
    color: "#747474",
    fontStyle: 'bold',
    fontFamily: "noto sans"
  },
};

module.exports = style;
