const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100vh',
      justifyContent: 'flex-start',
      padding: '20px',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      marginBottom: '20px',
    },
    leftButtons: {
      display: 'flex',
      justifyContent: 'flex-start',
    },
    rightButton: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    button: {
      marginRight: '10px',
    },
    tableContainer: {
      width: '100%',
      maxWidth: '1200px',
      overflowY: 'auto',
      maxHeight: 'calc(100vh - 180px)', 
    },
    table: {
      minWidth: 650,
    },
    actionButton: {
      marginRight: '10px',
    },
  };
  
  export default styles;
  