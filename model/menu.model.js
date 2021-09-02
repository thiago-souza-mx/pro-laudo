import { Language } from "../components/Language";
const menuModel = [ 
  {
    name:<Language pt='Inicio'  en='Home'/>,
    link:'Home',
    icon:'clipboard',
    class: 'active'
  },
  /*{
    name: <Language pt='Configurações'  en='Settings'/>,
    link:'Settings',
    icon:'cog',
    class: ''
  },*/
  {
    name:<Language pt='Laudos Salvos'  en='Saved Reports'/>,
    link:'Reports',
    icon:'files-medical',
    class: ''
  },
  {
    name:<Language pt='Últimos Laudos'  en='Last Reports'/>,
    link:'LastReports',
    icon:'clock',
    class: ''
  },
  {
    name:<Language pt='Laudos Excluídos'  en='Excluded Reports'/>,
    link:'TrashReports',
    icon:'trash-undo-alt',
    class: ''
  }
];

export default menuModel;