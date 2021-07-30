
const User = {}
/**-------------------------------------------------
 * 
 * Salva um arquivo no banco
 * @id_file string
 * @name_file string
 * @body string html
 * @open boolean
 * @return void
 * 
 -------------------------------------------------*/

User.saveFile = ({id, name, body, open}) => {
  const data = {
    id, 
    name, 
    body,
    open,
    save_date  : new Date().getTime(),
    save: true
  } 

  let files = User.getFiles();
  if(files)
    if(files[id])
      Object.assign(files[id], data);
    else{
      files[id] = data;
    }
  else{
    files = {};
    files[id] = data;
  }
  setObjectStorage( 'SaveFiles', files );
}

/**-------------------------------------------------
 * 
 * Salvamento automático de segurança 
 * Este salvamento é temporário e tem um limite para 10 arquivos
 * Quando um novo arquivo for criado acima de 10, um será apagado para salvar o mais atual.
 * @id_file string
 * @name_file string
 * @body string html
 * @open boolean
 * @return void
 * 
 -------------------------------------------------*/

User.automaticSaveFile = ({id, name, body, open}) => {
  const data = {
    id, 
    name, 
    body, 
    open,
    aut_save: true
  } 

  let files = User.getFiles();
  if(files)
    if(files[id])
      Object.assign(files[id], data);
    else{
      data.created_at = new Date().getTime();
      files[id] = data;
    }
  else{
    files = {};
    data.created_at = new Date().getTime();
    files[id] = data;
  }
  setObjectStorage( 'SaveFiles', files );  
}


User.CloseFile = ( id ) => {

  let files = User.getFiles();
  if(files){
    if(files[id]){
      files[id].open = false;
      setObjectStorage( 'SaveFiles', files ); 
    }
  }

  files = User.getOpenFiles();
  let list = [];
  if(files){
    files.forEach((o,i)=>{
      if(o != id)
      list.push(o)
    })
    User.setOpenFiles(list);
  }
}




User.setOpenFile = ( id ) => {  
  let files = User.getOpenFiles();
  let list = [];
  if(files){
    files.forEach((o,i)=>{
      if(o != id)
        list.push(o);
    })
    files = list
  }else{
    files = [];
  }    

  files.push(id);
  setArrayStorage( 'OpenFiles', files, false ); 
}




User.setOpenFiles = ( files ) => {  
  setArrayStorage( 'OpenFiles', files , false); 
}

/**-------------------------------------------------
 * 
 * Busca todos os arquivos salvos e guarda em storage
 * Se houver dados em storage não consulta o server.
 * @return objeto json ou false
 * 
 -------------------------------------------------*/

User.getFiles = ( save ) => {
  const appAccount = sessionStorage.getItem('App-account') ? JSON.parse( sessionStorage.getItem('App-account')) : false ;
  let files = appAccount.SaveFiles ? appAccount.SaveFiles : false 
  if( save === true || save === false || save === "open" || save === "deleted"){
    if(files){
      let arr = []
      Object.keys(files).forEach(idx => {
        if( !files[idx].deleted ){
          if(save === true && files[idx].save )
            arr[idx] = files[idx]
          if(save === false && !files[idx].save)
            arr[idx] = files[idx]

          if(save === "open" && files[idx].open)
            arr.push(files[idx])
        }
        if(save === "deleted" && files[idx].deleted)
          arr.push(files[idx])
      })

      files = arr;
    }    
  }
  return files;
}



User.getOpenFiles = () => {
  const appAccount = sessionStorage.getItem('App-account') ? JSON.parse( sessionStorage.getItem('App-account')) : false ;
  let files = appAccount.OpenFiles ? appAccount.OpenFiles : false 

  return files;
}


User.DeleteFile = id => {
  let files = User.getFiles();
  if(files){
    if(files[id]){
      files[id].open = false;
      files[id].deleted = true;
      setObjectStorage( 'SaveFiles', files ); 
    }
  }

  files = User.getOpenFiles();
  let list = [];
  if(files){
    files.forEach((o,i)=>{
      if(o != id)
      list.push(o)
    })
    User.setOpenFiles(list);
  }
}


const setObjectStorage = ( indice , data ) => {
  const appAccount = sessionStorage.getItem('App-account') ? JSON.parse( sessionStorage.getItem('App-account')) : {} ;  
  if(!appAccount[indice])
    appAccount[indice] = {};

  Object.assign(appAccount[indice], data);
  sessionStorage.setItem('App-account',JSON.stringify(appAccount));  
}

const setArrayStorage = ( indice , data , merge ) => {
  const appAccount = sessionStorage.getItem('App-account') ? JSON.parse( sessionStorage.getItem('App-account')) : {} ;  
  if(!appAccount[indice])
    appAccount[indice] = [];

    if(merge)
      Object.assign(appAccount[indice], data);
    else
      appAccount[indice]= data;
  sessionStorage.setItem('App-account',JSON.stringify(appAccount));  
}



export default User;