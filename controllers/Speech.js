import { useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { Insert } from '../components/Editor';

export const state = {
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
    console.log('ativar')
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
	console.log(valor)
	try{
		let result = eval(valor.replaceAll("x","*"))
		result = result % 1 ? result.toFixed(2) : result;
		action.func = false
		valor = document.querySelector('#textarea dd').innerHTML;
		result = document.querySelector('#textarea').innerHTML.replace("<dd>"+valor+"</dd>"," "+result)

		return result
	}catch(e){
		return false
	}
}

const limpar = (n) =>{
	n = n ? n : 1;
	
	let text = document.querySelector('#textarea')
	if(text != ''){		//

			let words = text.innerHTML.trim().split(/\s/);
			console.log(words);
			words = (words.splice( 0, (words.length - n))).join(' ') 
			text.innerHTML = words
		//}

	}else{
		text.innerHTML = ''
	}
}

const limparTudo = () => document.querySelector('#textarea').innerHTML = ""


const tipoCalculo = ()=>{
	return "<dd></dd>";
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
	"salvar" : ()=> setTimeout(()=> download("laudo",  document.querySelector('.ck-editor__editable').ckeditorInstance.getData()),600),
	"cálculo" : ()=> {action.func = calculo; return tipoCalculo(); },
	"limpar um" :()=>limpar(2), "limpar 1" :()=>limpar(2),
	"limpar 2" : ()=>limpar(3),	"limpar dois" : ()=>limpar(3),
	"limpar 3" : ()=>limpar(5),	"limpar três" : ()=>limpar(5),
	"limpar 4" : ()=>limpar(5),	"limpar quatro" : ()=>limpar(5),
	"limpar tudo" : limparTudo,
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

const callbackTranscript = text =>{
  if(text.transcript != ''){
    state.noteContent =  text.transcript;
    console.log(text); 
    
    if(state.start){      
      Insert(`|${state.noteContent}|`);
      if(text.finalTranscript != ''){
        text.resetTranscript();
        estado.newtext = state.noteContent;
        if(action.func){
          action.func( state.noteContent );
        }

        let agent = Agent( state.noteContent );
		
          if(agent !== false){
            if(typeof agent == "string")
              state.noteContent = agent
            else
              state.noteContent = "";
          }

        setTimeout( ()=>{
          if(action.command){
            let command = action.command;
            action.command = false;
            return Insert(`${command} ||`);
          }
          console.log(action.command);
          Insert(`${state.noteContent} ||`);
        },300);
      }
    }
  }
}

export function  Speech(){
  const [message, setMessage] = useState('')
  const commands = [
    {
      command: 'título *',
      callback: (title) =>{ action.command = `<h1>${title}</h1>` }
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

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null
  }

  state.start = ()=> SpeechRecognition.startListening({ continuous: true });
  state.stop = SpeechRecognition.stopListening;
  console.log("INICIOU O SPEECH");
  console.log(state);

}

