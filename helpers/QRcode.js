import QRCode from 'qrcode'
import ReactDOM from 'react-dom';
const crypto = require("crypto");
const opts = {
  errorCorrectionLevel: 'H',
  type: 'image/png',
  quality: 1,
  margin: 1,
  scale: 6,
  color: {
    dark:"#010599FF",
    light:"#FFF"
  }
}

var pusher;
var channel;
var code = crypto.randomBytes(16).toString("hex");

const destroy= e=>{
  document.getElementById('qrcode').classList.remove('active');
}

export const GetQRcode = async ()=>{
  
    try {
      let qrcode =  await QRCode.toDataURL(code,opts);

      setPusher().then(res=>
        setTimeout(()=>addSocket(code),300)
      )

      ReactDOM.render( 
        <div className="d-flex">
          <div className="flex-1 text-center py-4">
            <div onClick={destroy}>
              <i class="far fa-times-circle font-22 close"></i>
            </div>
            <h4>Abra o aplicativo e escaneie o código</h4>
            <div>Não tem o App?</div>
            <button className="btn btn-primary px-4 mt-3">
              Baixar
            </button>
          </div>
          <img src={qrcode}/>
        </div> , 
        document.getElementById('qrcode').querySelector('.code')
      ); 
      document.getElementById('qrcode').classList.add('active');
    } catch (err) {
      console.error(err)
    }
  
}

const setPusher = async ()=>{
  let script = document.createElement('script');
  script.src = "https://js.pusher.com/7.0/pusher.min.js";
  document.head.appendChild(script);  

  return true;
}

const addSocket = (code)=>{  
  let state = "";

  
  Pusher.logToConsole = true;
  pusher = new Pusher('9bddcbfe0d2b4ce610cd', {
    cluster: 'us2'
  }); 
  channel = pusher.subscribe('msg'); 
  
  channel.bind(code, function(data) {
    console.log(code)
    const msg = Object.keys(data.message)[0];
    if(msg == code){
      destroy();
    }else{
      state += " "+ msg;
      document.querySelector('.ck-editor__editable').ckeditorInstance.setData(state);
    }
  });   
}