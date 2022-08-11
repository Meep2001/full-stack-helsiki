import './Notification.css'
export const Notification=(props)=>{
    
     if(props.messageN===null) return;
     return <div id="message" >
        <h2 className={props.error==='true'?'error':'n'}>{props.messageN}</h2>
    </div>
}