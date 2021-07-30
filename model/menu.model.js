import { Language } from "../components/Language";
const menuModel = [ 
  {
    name:<Language pt='Inicio'  en='Home'/>,
    link:'Home',
    icon:'clipboard',
    class: 'active'
  },
  {
    name: <Language pt='Configurações'  en='Settings'/>,
    link:'Settings',
    icon:'cog',
    class: ''
  },
  {
    name:<Language pt='Laudos Salvos'  en='Saved Reports'/>,
    link:'Reports',
    icon:'file-medical',
    class: ''
  }
];

export default menuModel;