import Menu from "../components/Menu"; 
import View  from "../views/View"; 
import menuSchema  from "../model/menu.model"; 

const Template = props=>{

  return(
    <div id="template">
      <Menu id={props.menu} schema={menuSchema}>       
      </Menu>

      <View page={props.view}>
        {props.children}
      </View>
    </div>
  );
  
}
export default Template;
