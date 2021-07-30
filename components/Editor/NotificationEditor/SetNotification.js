import NotificationEditor from ".";
import ReactDOM from 'react-dom';

export const SetNotification = (message, role) =>{
  let notification = {
    message: message,
    role: role,
    stage: 'off'
  }

  document.querySelector(".editor-footer .insert-notification").innerHTML='';

  let notif = document.createElement('div')
  notif.id = 'notif_';
  document.querySelector(".editor-footer .insert-notification").appendChild(notif)  

  ReactDOM.render( <NotificationEditor notification={notification} /> , document.getElementById( notif.id ) );
}