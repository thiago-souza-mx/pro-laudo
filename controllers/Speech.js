import { useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { Insert } from '../components/Editor';

export const state = {
  active : true,
  noteContent : '',
  start: false,
  stop: false,
  tab: false
}
 


const action = {
	neww : false,
	old: false,
	func: false,
  command: false
}


const estado = {

  set newtext(valor) {
    if(action.neww !== false)
      action[neww](valor);

    this._newtext = valor;
  },

  get newtext() {
    return this._newtext;
  },

  set oldtext(valor) {
    if(action.old !== false)
      action.old(valor);
  
    this._oldtext = valor;
  },

  get oldtext() {
      return this._oldtext;
  },  

  _newtext: '',
  _oldtext: '',

};

const newtab = ()=>	state.tab = window.open()

const background = (color)=>{
	document.body.style.background = color ? color : "red";
	return ;
}

const closetab = ()=> { state.tab.close(); return ;}

const exit = ()=> {window.close(); return ;}

const _alert = ()=>{ alert(); return ;}

function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
	return ;
}

const calculo = valor =>{
  console.log(valor);
  if(valor.trim() != 'ƒ()'){
    try{
      let result = eval(tratament(valor))
      result = result % 1 ? result.toFixed(2) : result;
      action.func = false
      valor = _CKEditor.getData().replace(`ƒ(|${valor}|)`,'')
      _CKEditor.setData(`${valor}`);
      return `${result}`;
      
      
    }catch(e){
      return false
    }
  }
  return valor
}

const limpar = (n) =>{
  if( n ){
    n = n ? n : 1;
    
    let text = _CKEditor.getData();
    if(text != ''){	

        let words = text.trim().split(/\s/);
        console.log(words);
        words = (words.splice( 0, (words.length - n))).join(' ') 
        _CKEditor.setData(`${words} ||`);

    }else{
      _CKEditor.setData("");
    }
  }else{
    let text = _CKEditor.getData();
    if(text != ''){	

        text = text.replace(action.old,'')
        _CKEditor.setData(`${text}`);
    }
  }
}

const limparTudo = () => _CKEditor.setData("");


const tipoCalculo = ()=>{
	return "ƒ()";
}
const Commands={
	"título": ()=>{},
	"fundo branco": ()=> background('white'),
	"fundo preto": ()=> background('black'),
	"fundo vermelho": ()=> background('red'),
	"disparar alerta": _alert,
	"emitir alerta": _alert,
	"abrir nova aba": newtab,
	"nova aba": newtab,
	"fechar aba": closetab,
	"sair" : exit,
	"encerrar" : exit,
	"espaço" : ()=> "&nbsp;",
	"quebrar linha" : ()=> "</br>",
	"parágrafo" : ()=> "</br>",
	"parágrafo parágrafo" : ()=> "</br></br>", "dois parágrafos" : ()=> "</br></br>", 	"2 parágrafos" : ()=> "</br></br>",
	"salvar" : ()=> setTimeout(()=> download("laudo",  _CKEditor.getData()),600),
	"cálculo" : ()=> {action.func = calculo; return tipoCalculo(); },
	"calculo" : ()=> {action.func = calculo; return tipoCalculo(); },
	"calcule" : ()=> {action.func = calculo; return tipoCalculo(); },
	"calcular" : ()=> {action.func = calculo; return tipoCalculo(); },
	"limpar um" :()=>limpar(3), "limpar 1" :()=>limpar(3),
	"limpar 2" : ()=>limpar(4),	"limpar dois" : ()=>limpar(4),
	"limpar 3" : ()=>limpar(5),	"limpar três" : ()=>limpar(5),
	"limpar 4" : ()=>limpar(6),	"limpar quatro" : ()=>limpar(6),
	"limpar tudo" : limparTudo, "limpar" : limpar,
	"traço" : ()=> "-",
}

function Agent(text){
	let command = text.trim().toLocaleLowerCase()
	if(Commands[command]){
		return Commands[command]()		 
	}else{
		return false;
	}
}

export const InsertApp = msg =>{
  callbackTranscript({app : msg});
}

const callbackTranscript = text =>{
  if( text.transcript != '' || text.app ){

    if(!document.getElementById('view').classList.contains('view-home')){
      text.resetTranscript();
      return 
    }

    state.noteContent =  text.transcript || text.app;
    console.log(text); 

    if(state.start){      
      Insert(`|${state.noteContent}|`);
      if( text.finalTranscript != '' || text.app ){
        if(!text.app) text.resetTranscript();
        estado.newtext = state.noteContent;

         let agent = Agent( state.noteContent );
		
          if(agent !== false){
            if(typeof agent == "string")
              state.noteContent = agent
            else
              state.noteContent = "";
          }

          if(action.func){
            let res = action.func( state.noteContent );
            if(typeof res == "string")
              state.noteContent = res;
            else
              state.noteContent = "";
          }

        setTimeout( ()=>{
          if(action.command){
            let command = action.command;
            action.old = action.command = false;
            return Insert(`${command} ||`);
          }
          action.old = state.noteContent;
          Insert(`${state.noteContent} ||`);
        },300);
      }
    }
  }
}

const tratament = exp =>{
  let res;

  if(exp.indexOf('raiz')>-1){
    
    var numbers = exp.replace(/[^0-9]/g,'');
    return Math.sqrt(parseInt(numbers));
  }
  res = exp.replace(/x|vezes/g,"*").replaceAll("dividido por","/")
  return res
}

export function  Speech(){
  const [message, setMessage] = useState('')
  const commands = [
    {
      command: 'cálculo *',
      callback: (exp) =>{ action.command = eval(tratament(exp));  }
    },
    {
      command: 'calcule *',
      callback: (exp) =>{ action.command = eval(tratament(exp));  }
    },
    {
      command: 'calcular *',
      callback: (exp) =>{ action.command = eval(tratament(exp));  }
    },
    {
      command: 'título *',
      callback: (title) =>{ action.command = `<h1>${title}</h1>` }
    },
    {
      command: '(*) parágrafo (*)',
      callback: (text1, text2) =>{ action.command = `${text1 ? text1 : ''}<br> ${text2 ? text2 : ''}` }
    },
    {
      command: '(*) vírgula (*)',
      callback: (text1, text2) =>{ action.command = `${text1 ? text1 : ''}, ${text2 ? text2 : ''}` }
    },
    {
      command: '(*) ponto final (*)',
      callback: (text1, text2) =>{ action.command = `${text1 ? text1 : ''}. ${text2 ? text2 : ''}` }
    },
    {
      command: '(*) reticências (*)',
      callback: (text1, text2) =>{ action.command = `${text1 ? text1 : ''}... ${text2 ? text2 : ''}` }
    },
    {
      command: 'The weather is :condition today',
      callback: (condition) => setMessage(`Today, the weather is ${condition}`)
    },
    {
      command: 'My top sports are * and *',
      callback: (sport1, sport2) => setMessage(`#1: ${sport1}, #2: ${sport2}`)
    },
    {
      command: 'Pass the salt (please)',
      callback: () => setMessage('My pleasure')
    },
    {
      command: 'Hello',
      callback: () => setMessage('Hi codemaker!'),
      matchInterim: true
    },
    {
      command: 'Welcome Vishnu',
      callback: (command, spokenPhrase, similarityRatio) => setMessage(`${command} and ${spokenPhrase} are ${similarityRatio * 100}% similar`),
      // If the spokenPhrase is "Benji", the message would be "Beijing and Benji are 40% similar"
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2
    },
    {
      command: 'limpar',
      callback: ({ resetTranscript }) => resetTranscript()
    }
  ]
  
  callbackTranscript(useSpeechRecognition({commands}));

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null
  }

  state.start = ()=> SpeechRecognition.startListening({ continuous: true });
  state.stop = SpeechRecognition.stopListening;

}

