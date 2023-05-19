export default Notification = ({ messageState }) => {
  const notificationStyle = {
    "color": "salmon",
    "background": "slategray",
    "fontSize": "20px",
    "borderStyle": "solid",
    "borderRadius": "5px",
    "padding": "10px",
    "marginBottom": "10px",
  }
  
  if (messageState.value) {
    setTimeout(() => messageState.setter(null), 2000)
    return (
      <div style={notificationStyle}>
        {messageState.value}
      </div>
    )
  }
  
  return <></>
  
}