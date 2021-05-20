export const TogglePalette = (e)=>{
  e.stopPropagation();
  let el = e.target;
  let target;
  if(el.nodeName == "a")
    target = e.target;
  else
    target = e.target.closest('a');
  
  if(target.classList.contains('open'))
    target.classList.remove('open');
  else
    target.classList.add('open');
}

export const SelectTheme = e=>{
  e.stopPropagation();
  if(e.target.nodeName != "LI")
    return ;
  let data = e.target.getAttribute('data-theme');
  let themeName = false;
  let destaqName = false;

  let AppConfig = JSON.parse(localStorage.getItem('App-config'));

  if(data.indexOf('theme-')> -1){
    themeName = data;
    AppConfig.theme.name = themeName;
  }
  if(data.indexOf('destaq-')> -1){
    destaqName = data;
    AppConfig.theme.destaq = destaqName;
  }
  
  localStorage.setItem("App-config",JSON.stringify(AppConfig))

  let currentTheme = document.querySelector('html').classList;
  currentTheme.forEach(item=>{
    if( themeName ){
      if(item.indexOf('theme-') > -1 )
        document.querySelector('html').classList.remove(item);   
        
      document.querySelector('html').classList.add(themeName);
    }

    if( destaqName ){
      if(item.indexOf('destaq-') > -1 )
        document.querySelector('html').classList.remove(item);  
      
      document.querySelector('html').classList.add(destaqName);
    }
  })     
  
  e.target.closest('a').classList.remove('open');
}