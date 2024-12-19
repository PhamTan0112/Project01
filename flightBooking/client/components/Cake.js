const Cake = () => {
    return (
      <>
        <div className="cake" style={styles.cake}></div>
        <div style={styles.overlayDiv}></div>
      </>
    );
  };
  
  const styles = {
    cake: {
      background: 'url("../static/img/flight.jpg")',
      height: "180vh",
      backgroundRepeat: "noRepeat",
      backgroundSize: "cover"
    },
    overlayDiv: {
      height: "180vh",
      background: "#000",
      width: "100%",
      position: "absolute",
      top: "4rem",
      left: 0,
      zIndex: 0,
      opacity: 0.4
    }
  };
  
  export default Cake;
  