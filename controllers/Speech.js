import { useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { InsertText } from '../components/Editor/InsertText';
import { Language } from '../components/Language';
import { Open } from '../helpers/Modal';

export const state = {
  active : true,
  noteContent : '',
  start: false,
  stop: false,
  tab: false,
  lang: false,
  Microphone:{},
  voice:false,
  text:null,
  capitalize:false
}
 


const action = {
	neww : false,
	old: false,
	func: false,
  command: false,
  insert : true
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

String.prototype.capitalize = function(){
  state.capitalize=false;
	return this.charAt(0).toUpperCase() + this.substr(1);
}

const newtab = ()=>	state.tab = window.open()

const pesquisa = ( busca )=>{
  console.log(busca)
  if(document.querySelector('#modals.WebSearch')){
    document.querySelector('#modals.WebSearch .close').click()
    setTimeout(()=> Open({name:'WebSearch', state:{search:busca} }), 300);
  }else{  
    Open({name:'WebSearch', state:{search:busca} });
  }
}

const background = (color)=>{
	document.body.style.background = color ? color : "red";
	return ;
}

const closetab = ()=> { 
  if(document.querySelector('#modals.WebSearch')){
    document.querySelector('#modals.WebSearch .close').click();    
  }
  return ;
}

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
  if(valor.trim() != 'ƒ()'){
    try{
      let result = eval(tratament(valor))
      result = result % 1 ? result.toFixed(2) : result;
      action.func = false
      valor = NemmoEditor.getData().replace(`ƒ(|${valor}|)`,'')
      NemmoEditor.setData(`${valor}`);
      return `${result}`;
      
      
    }catch(e){
      return false
    }
  }
  return valor
}

const titulo = valor =>{
  if(valor.trim() != 't()'){
    action.func = false
    console.log(NemmoEditor.getData());
    let text = NemmoEditor.getData().replace(`t(<mark class="marker-green">${valor}</mark> )`,'')
    NemmoEditor.setData(`${text}`);       
    valor = `<h1>${valor.capitalize()}</h1>`; 
    state.capitalize= 'next';          
  }
  return valor
}

const subtitulo = valor =>{
  if(valor.trim() != 't()'){
    action.func = false
    let text = NemmoEditor.getData().replace(`t(<mark class="marker-green">${valor}</mark> )`,'')
    NemmoEditor.setData(`${text}`);       
    valor = `<h4>${valor.capitalize()}</h4>`; 
    state.capitalize= 'next';          
  }
  return valor
}

const limpar = (n) =>{
  if( n ){
    n = n ? n : 1;
    
    let text = NemmoEditor.getData();
    if(text != ''){	

        let words = text.trim().split(/\s/);
        console.log(words);
        words = (words.splice( 0, (words.length - n))).join(' ') 
        NemmoEditor.setData(`${words} ||`);

    }else{
      NemmoEditor.setData("<div id='edtiting'></div>");
    }
  }else{
    let text = NemmoEditor.getData();
    if(text != ''){	

        text = text.replace(action.old,'')
        NemmoEditor.setData(`${text}`);
    }
  }
}

const limparTudo = () => NemmoEditor.setData("");
const tipoCalculo = ()=> {
  state.capitalize = false;
  return "ƒ()";
}

const tipoTitulo = ()=> {
  state.capitalize = false;
  return "t()";
}

const Commands={
	"título": ()=>{},
	"fundo branco": ()=> background('white'),
	"fundo preto": ()=> background('black'),
	"fundo vermelho": ()=> background('red'),
	"disparar alerta": _alert,
	"emitir alerta": _alert,
	"abrir nova aba": newtab,
	"abrir nova guia": newtab,
	"nova aba": newtab,
	"nova guia": newtab,
	"fechar aba": closetab,
	"fechar guia": closetab,
	"voltar": closetab,
	"voltar para o editor": closetab,
	"sair" : exit,
	"encerrar" : exit,
	"espaço" : ()=> "&nbsp;",
	"quebrar linha" : ()=> {return "</br>";state.capitalize = true},
	"parágrafo" : ()=> {return "</br>"; state.capitalize = true },
	"parágrafo parágrafo" : ()=> "</br></br>", "dois parágrafos" : ()=> "</br></br>", 	"2 parágrafos" : ()=> "</br></br>",
	"salvar" : ()=> setTimeout(()=> download("laudo",  NemmoEditor.getData()),600),
	"copiar" : ()=> setTimeout(()=>{ navigator.clipboard.writeText( NemmoEditor.getData().replace('||','') ); NemmoEditor.setNotification("Texto copiado para a área de transferência", "info"); Voice("Texto copiado para a área de transferência") },600),
	"cálculo" : ()=> {action.func = calculo; return tipoCalculo(); },
	"calculo" : ()=> {action.func = calculo; return tipoCalculo(); },
	"calcule" : ()=> {action.func = calculo; return tipoCalculo(); },
	"calcular" : ()=> {action.func = calculo; return tipoCalculo(); },
	"título" : ()=> {action.func = titulo; return tipoTitulo(); },
	"subtítulo" : ()=> {action.func = subtitulo; return tipoTitulo(); },
	"limpar um" :()=>limpar(3), "limpar 1" :()=>limpar(3),
	"limpar 2" : ()=>limpar(4),	"limpar dois" : ()=>limpar(4),
	"limpar 3" : ()=>limpar(5),	"limpar três" : ()=>limpar(5),
	"limpar 4" : ()=>limpar(6),	"limpar quatro" : ()=>limpar(6),
	"limpar tudo" : limparTudo, "apagar tudo" : limparTudo, "limpar" : limpar,
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
  console.log(state);
  if( text.transcript != '' || text.app ){
    state.text = text;
    if(!document.getElementById('view').classList.contains('view-Home')){
      text.resetTranscript();
      return 
    }

    state.noteContent =  text.transcript || text.app;
    console.log(text); 

    if(state.start){   
      
      if(state.active && !state.voice && action.insert)
        InsertText(`<mark class="marker-green">${state.noteContent}</mark>`);

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
            console.log(action)
            let res = action.func( state.noteContent );
            if(typeof res == "string")
              state.noteContent = res;
            else
              state.noteContent = "";
          }

        setTimeout( ()=>{
          if(action.command){
            let command = action.command;

            if(command == 'pausar' || command == 'pausar edição'){
              Voice('Pausei a edição do laudo')
              action.command = false;
              InsertText(`${state.noteContent.replace(command,'')} <mark class="marker-green">⏸️</mark>`)
              return;
            }

            if(command == 'retomar' || command == 'retomar edição'){  
              Voice('Edição do laudo retomada')            
              text.resetTranscript();              
              action.command = false;
              InsertText(`${state.noteContent.replace(command,'')}`)
              return;
            }

            action.old = action.command = false;

            if(state.active && !state.voice)
              return InsertText(`${command}`);
          }
          action.old = state.noteContent;

          if(state.active && !state.voice && action.insert)
            InsertText(`${state.capitalize === true ? state.noteContent.capitalize(): state.noteContent }`);
          if(state.capitalize == 'next'){
            state.capitalize= true
          }

          if(!action.insert){
            action.insert = true;
          }
        },50);
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

export function  Speech({Microphone}){
  const [message, setMessage] = useState('')
  const commands = [
    {
      command: 'buscar *',
      callback: (exp) =>{ action.command =  pesquisa(exp); action.insert = false  }
    },
    {
      command: 'pesquisar *',
      callback: (exp) =>{ action.command =  pesquisa(exp); action.insert = false  }
    },
    {
      command: '(*) pausar edição',
      callback: (exp) =>{ action.command = 'pausar edição'; state.active = false;}
    },
    {
      command: '(*) pausar',
      callback: (exp) =>{ action.command = 'pausar'; state.active = false;}
    },
    {
      command: 'retomar (*)',
      callback: (exp) => { action.command = 'retomar'; state.active = true; }
    },
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
      callback: (exp) =>{ action.command = eval(tratament(exp));    }
    },
    {
      command: 'título *',
      callback: (title) =>{ action.command = `<h1>${title}</h1>` }
    },
    {
      command: 'subtítulo *',
      callback: (title) =>{ action.command = `<h4>${title}</h4>` }
    },
    {
      command: '(*) parágrafo (*)',
      callback: (text1, text2) =>{state.capitalize = true; action.command = `${text1 ? text1 : ''}<br/>${text2 ? text2 : ''} <mark class="marker-green"><b class="hide_p">|</b></mark>` }
    },
    {
      command: '(*) vírgula (*)',
      callback: (text1, text2) =>{ action.command = `${text1 ? text1 : ''}, ${text2 ? text2 : ''}` }
    },
    {
      command: '(*) ponto final (*)',
      callback: (text1, text2) =>{state.capitalize = true; action.command = `${text1 ? text1 : ''}. ${text2 ? text2 : ''}` }
    },

    {
      command: '* ponto',
      callback: (text1, text2) =>{state.capitalize = true; action.command = `${text1}. ` }
    },
    {
      command: '(*) reticências (*)',
      callback: (text1, text2) =>{state.capitalize = true; action.command = `${text1 ? text1 : ''}... ${text2 ? text2 : ''}` }
    },
    /*{
      command: 'hoje é :dia',
      callback: (condition) => action.command =`Today, the weather is ${condition}`
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
    }*/,
    {
      command: 'limpar',
      callback: ({ resetTranscript }) => resetTranscript()
    }
  ]
  
  callbackTranscript(useSpeechRecognition({commands}));

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null
  }

  
  state.start = ()=>{ SpeechRecognition.startListening({ continuous: true , language: Language({en:'en-US', pt:'pt-br'})}) };
  state.stop = SpeechRecognition.stopListening;
  state.Microphone = Microphone;

}

export const Voice = (audio)=>{  
  console.log(state)
  state.voice = true;
  let midia = new Audio(`/voices/${encodeURI(audio).toLowerCase()}.mp3`)  
  state.Microphone.phrase = audio;
  midia.play();

  midia.onended = ()=>{
    state.text.resetTranscript();
    state.voice = false ;
  }  
  
  
}