export const Tiny = `
#tinymce mark{
    background: blue;
}
#tinymce mark.calc {
    background: red;
    padding: 5px 10px;
}
#tinymce mark.calc:before {
    content: 'ƒ(';
    color: #FFF;
    padding-right: 10px;
}          
#tinymce mark.calc:after {
    content: ')';
    color: #FFF;
    padding-left: 10px;
}  `;        
