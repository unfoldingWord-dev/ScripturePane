var style = {
  pane: {
    contentLTR: {
      overflowY: 'auto',
      direction: 'ltr',
      flex: 'auto',
      padding: '0 15px 10px',
    },
    contentRTL: {
      overflowY: 'auto',
      direction: 'rtl',
      flex: 'auto',
      padding: '0 15px 10px',
    },
    title: {
      fontWeight: '700',
      fontSize: '1em',
      marginBottom: "-5px",
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
  scripturePane: {
    flex: '1 1 200px',
    margin: '10px',
    boxShadow: '0 3px 10px var(--background-color)',
    borderRadius: '2px',
  },
  titleBar: {
    flex: '0 0 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    color: 'var(--reverse-color)',
    backgroundColor: 'var(--accent-color-dark)',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  body: {
    flex: '1 1 160px',
    display: 'flex'
  },
  firstBible: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  otherBible: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderLeft: '1px solid var(--border-color)',
  },
  firstPane: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    borderLeft: '1px solid var(--reverse-color)',
  },
  otherPane: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    borderLeft: '1px solid var(--border-color)',
  },
  verseTitle: {
    flex: '0 0 35px',
    display: 'flex',
    justifyContent: 'space-between',
    margin: '5px 10px 5px 15px'
  }
};

module.exports = style;
