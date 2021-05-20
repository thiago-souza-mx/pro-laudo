import AppConfigModel from "../model/appConfig.model";
import React from 'react';

export const Language = props=>{
  let AppConfig;
  let lang;
  
  if(localStorage.getItem('App-config'))
    AppConfig = JSON.parse(localStorage.getItem('App-config'));    
  else
    AppConfig = AppConfigModel;

  lang = AppConfig.language;

  return props[lang];
}

const setLanguage = lang =>{
  let AppConfig;
  if(localStorage.getItem('App-config')){
    AppConfig = JSON.parse(localStorage.getItem('App-config'));    
  }else{
    AppConfig = AppConfigModel;
  }

  AppConfig.language = lang;
  localStorage.setItem('App-config', JSON.stringify(AppConfig))

  location.reload(); 
}

export const PT = ()=>{
  return(
    <svg onClick={()=> setLanguage('pt')} xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512.001 512.001"  space="preserve" >
      <path style={{fill:"#73AF00"}} d="M503.172,423.725H8.828c-4.875,0-8.828-3.953-8.828-8.828V97.104c0-4.875,3.953-8.828,8.828-8.828  h494.345c4.875,0,8.828,3.953,8.828,8.828v317.793C512,419.773,508.047,423.725,503.172,423.725z"/>
      <path style={{fill:"#FFE15A"}} d="M251.41,135.209L65.354,248.46c-5.651,3.439-5.651,11.641,0,15.081L251.41,376.793  c2.819,1.716,6.36,1.716,9.18,0l186.057-113.251c5.651-3.439,5.651-11.641,0-15.081L260.59,135.209  C257.771,133.493,254.229,133.493,251.41,135.209z"/>
      <circle style={{fill:"#41479B"}} cx="256" cy="256.001" r="70.62"/>
      <g>
        <path style={{fill:"#F5F5F5"}} d="M195.401,219.874c-3.332,5.578-5.905,11.64-7.605,18.077c39.149-2.946,97.062,8.006,133.922,43.773   c2.406-6.141,3.994-12.683,4.59-19.522C288.247,230.169,235.628,218.778,195.401,219.874z"/>
        <path style={{fill:"#F5F5F5"}} d="M258.925,280.1l1.88,5.638l5.943,0.046c0.769,0.006,1.088,0.988,0.47,1.445l-4.781,3.531   l1.793,5.666c0.232,0.734-0.604,1.341-1.229,0.893l-4.835-3.456l-4.835,3.456c-0.626,0.448-1.461-0.159-1.229-0.893l1.793-5.666   l-4.781-3.531c-0.619-0.457-0.3-1.439,0.469-1.445l5.943-0.046l1.88-5.638C257.649,279.37,258.681,279.37,258.925,280.1z"/>
        <path style={{fill:"#F5F5F5"}} d="M282.024,294.685l0.809,2.426l2.558,0.02c0.331,0.002,0.469,0.425,0.202,0.622l-2.058,1.519   l0.771,2.439c0.1,0.316-0.259,0.577-0.529,0.384l-2.081-1.487l-2.081,1.487c-0.269,0.193-0.629-0.068-0.529-0.384l0.771-2.439   l-2.058-1.519c-0.266-0.196-0.129-0.619,0.202-0.622l2.558-0.02l0.809-2.426C281.474,294.37,281.919,294.37,282.024,294.685z"/>
        <path style={{fill:"#F5F5F5"}} d="M248.938,269.39l0.809,2.426l2.558,0.02c0.331,0.002,0.469,0.425,0.202,0.622l-2.058,1.519   l0.771,2.439c0.1,0.316-0.259,0.577-0.529,0.384l-2.081-1.487l-2.081,1.487c-0.269,0.193-0.629-0.068-0.529-0.384l0.771-2.439   l-2.058-1.519c-0.266-0.196-0.129-0.619,0.202-0.622l2.558-0.02l0.809-2.426C248.388,269.076,248.833,269.076,248.938,269.39z"/>
        <path style={{fill:"#F5F5F5"}} d="M204.13,266.448l0.809,2.426l2.558,0.02c0.331,0.002,0.469,0.425,0.202,0.622l-2.058,1.519   l0.771,2.439c0.1,0.316-0.259,0.577-0.529,0.384l-2.081-1.487l-2.081,1.487c-0.269,0.193-0.629-0.068-0.529-0.384l0.771-2.439   l-2.058-1.519c-0.266-0.196-0.129-0.619,0.202-0.622l2.558-0.02l0.809-2.426C203.581,266.134,204.025,266.134,204.13,266.448z"/>
        <path style={{fill:"#F5F5F5"}} d="M241.614,293.847l0.809,2.426l2.558,0.02c0.331,0.002,0.469,0.425,0.202,0.622l-2.058,1.519   l0.771,2.439c0.1,0.316-0.259,0.577-0.529,0.384l-2.081-1.487l-2.081,1.487c-0.269,0.193-0.629-0.068-0.529-0.384l0.771-2.439   l-2.058-1.519c-0.266-0.196-0.129-0.619,0.202-0.622l2.558-0.02l0.809-2.426C241.065,293.534,241.51,293.534,241.614,293.847z"/>
        <path style={{fill:"#F5F5F5"}} d="M220.99,264.755l0.662,1.984l2.092,0.017c0.27,0.002,0.383,0.348,0.166,0.509l-1.683,1.242   l0.631,1.994c0.082,0.258-0.212,0.472-0.433,0.314l-1.702-1.216l-1.702,1.216c-0.221,0.158-0.514-0.056-0.433-0.314l0.631-1.994   l-1.683-1.242c-0.217-0.161-0.106-0.507,0.166-0.509l2.092-0.017l0.662-1.984C220.541,264.498,220.904,264.498,220.99,264.755z"/>
        <path style={{fill:"#F5F5F5"}} d="M283.819,223.794l0.828,2.482l2.616,0.02c0.339,0.002,0.479,0.435,0.206,0.636l-2.104,1.554   l0.789,2.495c0.103,0.323-0.266,0.59-0.541,0.393l-2.129-1.522l-2.129,1.522c-0.276,0.198-0.643-0.071-0.541-0.393l0.789-2.495   l-2.104-1.554c-0.273-0.201-0.132-0.633,0.206-0.636l2.616-0.02l0.828-2.482C283.257,223.472,283.712,223.472,283.819,223.794z"/>
        <path style={{fill:"#F5F5F5"}} d="M207.012,252.617l0.662,1.984l2.092,0.017c0.27,0.002,0.383,0.348,0.166,0.509l-1.683,1.242   l0.631,1.994c0.082,0.258-0.212,0.472-0.433,0.314l-1.702-1.216l-1.702,1.216c-0.221,0.158-0.514-0.056-0.433-0.314l0.631-1.994   l-1.683-1.242c-0.217-0.161-0.106-0.506,0.166-0.509l2.092-0.017l0.662-1.984C206.563,252.36,206.926,252.36,207.012,252.617z"/>
        <path style={{fill:"#F5F5F5"}} d="M217.112,280.581l1.002,3.006l3.168,0.024c0.41,0.003,0.58,0.526,0.25,0.77l-2.549,1.882l0.956,3.02   c0.124,0.391-0.321,0.715-0.655,0.476l-2.578-1.842l-2.578,1.842c-0.333,0.238-0.779-0.085-0.655-0.476l0.956-3.02l-2.549-1.882   c-0.33-0.244-0.16-0.767,0.25-0.77l3.168-0.024l1.002-3.006C216.433,280.193,216.983,280.193,217.112,280.581z"/>
        <path style={{fill:"#F5F5F5"}} d="M294.903,295.315l0.63,1.891l1.993,0.015c0.258,0.002,0.365,0.331,0.158,0.484l-1.603,1.184   l0.601,1.9c0.078,0.246-0.202,0.449-0.413,0.299l-1.621-1.159l-1.622,1.159c-0.21,0.15-0.49-0.053-0.413-0.299l0.601-1.9   l-1.603-1.184c-0.207-0.153-0.1-0.482,0.158-0.484l1.993-0.015l0.63-1.891C294.475,295.07,294.822,295.07,294.903,295.315z"/>
        <path style={{fill:"#F5F5F5"}} d="M301.877,280.885l0.809,2.426l2.558,0.02c0.331,0.002,0.469,0.425,0.202,0.622l-2.058,1.519   l0.771,2.439c0.1,0.316-0.259,0.577-0.529,0.384l-2.081-1.487l-2.081,1.487c-0.269,0.193-0.629-0.068-0.529-0.384l0.771-2.439   l-2.058-1.519c-0.266-0.196-0.129-0.619,0.202-0.622l2.558-0.02l0.809-2.426C301.327,280.57,301.772,280.57,301.877,280.885z"/>
      </g>
    </svg>
  )
}

export const EN = ()=>{
  return (
    <svg onClick={()=> setLanguage('en')} xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512.001 512.001" space="preserve">
      <path style={{fill:"#F5F5F5"}} d="M503.172,423.725H8.828c-4.875,0-8.828-3.953-8.828-8.828V97.104c0-4.875,3.953-8.828,8.828-8.828  h494.345c4.875,0,8.828,3.953,8.828,8.828v317.793C512,419.773,508.047,423.725,503.172,423.725z"/>
      <g>
        <path style={{fill:"#FF4B55"}} d="M512,114.081H0V97.104c0-4.875,3.953-8.828,8.828-8.828h494.345c4.875,0,8.828,3.953,8.828,8.828   L512,114.081L512,114.081z"/>
        <rect y="191.491" style={{fill:"#FF4B55"}} width="512" height="25.804"/>
        <rect y="139.881" style={{fill:"#FF4B55"}} width="512" height="25.804"/>
        <path style={{fill:"#FF4B55"}} d="M512,268.903H8.828c-4.875,0-8.828-3.953-8.828-8.828v-16.977h512V268.903z"/>
        <rect y="346.321" style={{fill:"#FF4B55"}} width="512" height="25.804"/>
        <path style={{fill:"#FF4B55"}} d="M503.172,423.725H8.828c-4.875,0-8.828-3.953-8.828-8.828v-16.976h512v16.977   C512,419.773,508.047,423.725,503.172,423.725z"/>
        <rect y="294.711" style={{fill:"#FF4B55"}} width="512" height="25.804"/>
      </g>
      <path style={{fill:"#41479B"}} d="M229.517,88.277H8.828C3.953,88.277,0,92.229,0,97.104v162.97c0,4.875,3.953,8.828,8.828,8.828  h220.69c4.875,0,8.828-3.953,8.828-8.828V97.104C238.345,92.229,234.392,88.277,229.517,88.277z"/>
      <g>
        <path style={{fill:"#F5F5F5"}} d="M24.789,108.538l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.027,0.488,1.502l-4.969,3.67l1.864,5.889   c0.242,0.762-0.627,1.394-1.278,0.928L24,122.843l-5.025,3.592c-0.651,0.465-1.518-0.166-1.278-0.928l1.864-5.889l-4.969-3.67   c-0.643-0.476-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C23.463,107.779,24.535,107.779,24.789,108.538z"/>
        <path style={{fill:"#F5F5F5"}} d="M24.789,139.192l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.027,0.488,1.502l-4.969,3.67l1.864,5.889   c0.242,0.762-0.627,1.394-1.278,0.928L24,153.497l-5.025,3.592c-0.651,0.465-1.518-0.166-1.278-0.928l1.864-5.889l-4.969-3.67   c-0.643-0.476-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C23.463,138.434,24.535,138.434,24.789,139.192z"/>
        <path style={{fill:"#F5F5F5"}} d="M24.789,169.846l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.027,0.488,1.502l-4.969,3.67l1.864,5.889   c0.242,0.762-0.627,1.394-1.278,0.928L24,184.151l-5.025,3.592c-0.651,0.465-1.518-0.166-1.278-0.928l1.864-5.889l-4.969-3.67   c-0.643-0.476-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C23.463,169.088,24.535,169.088,24.789,169.846z"/>
        <path style={{fill:"#F5F5F5"}} d="M24.789,200.501l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.027,0.488,1.502l-4.969,3.67l1.864,5.889   c0.242,0.762-0.627,1.394-1.278,0.928L24,214.806l-5.025,3.592c-0.651,0.465-1.518-0.166-1.278-0.928l1.864-5.889l-4.969-3.67   c-0.643-0.476-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C23.463,199.742,24.535,199.742,24.789,200.501z"/>
        <path style={{fill:"#F5F5F5"}} d="M24.789,231.155l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.027,0.488,1.502l-4.969,3.67l1.864,5.889   c0.242,0.762-0.627,1.394-1.278,0.928L24,245.46l-5.025,3.592c-0.651,0.465-1.518-0.166-1.278-0.928l1.864-5.889l-4.969-3.67   c-0.643-0.476-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C23.463,230.395,24.535,230.395,24.789,231.155z"/>
        <path style={{fill:"#F5F5F5"}} d="M48.582,123.567l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.027,0.488,1.502l-4.969,3.67l1.864,5.889   c0.242,0.762-0.627,1.394-1.278,0.928l-5.025-3.592l-5.025,3.592c-0.651,0.465-1.518-0.166-1.278-0.928l1.864-5.889l-4.969-3.67   c-0.643-0.476-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C47.255,122.809,48.329,122.809,48.582,123.567z"/>
        <path style={{fill:"#F5F5F5"}} d="M48.582,154.222l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.027,0.488,1.502l-4.969,3.67l1.864,5.889   c0.242,0.762-0.627,1.394-1.278,0.928l-5.025-3.592l-5.025,3.592c-0.651,0.465-1.518-0.165-1.278-0.928l1.864-5.889l-4.969-3.67   c-0.643-0.476-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C47.255,153.463,48.329,153.463,48.582,154.222z"/>
        <path style={{fill:"#F5F5F5"}} d="M48.582,184.876l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.027,0.488,1.502l-4.969,3.67l1.864,5.889   c0.242,0.762-0.627,1.394-1.278,0.928l-5.025-3.592l-5.025,3.592c-0.651,0.465-1.518-0.166-1.278-0.928l1.864-5.889l-4.969-3.67   c-0.643-0.476-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C47.255,184.117,48.329,184.117,48.582,184.876z"/>
        <path style={{fill:"#F5F5F5"}} d="M48.582,215.53l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.027,0.488,1.502l-4.969,3.67l1.864,5.889   c0.242,0.762-0.627,1.394-1.278,0.928l-5.025-3.592l-5.025,3.592c-0.651,0.465-1.518-0.166-1.278-0.928l1.864-5.889l-4.969-3.67   c-0.643-0.476-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C47.255,214.772,48.329,214.772,48.582,215.53z"/>
        <path style={{fill:"#F5F5F5"}} d="M72.375,108.538l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.027,0.488,1.502l-4.969,3.67l1.864,5.889   c0.242,0.762-0.627,1.394-1.278,0.928l-5.025-3.592l-5.025,3.592c-0.651,0.465-1.518-0.166-1.278-0.928l1.864-5.889l-4.969-3.67   c-0.643-0.476-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C71.049,107.779,72.122,107.779,72.375,108.538z"/>
        <path style={{fill:"#F5F5F5"}} d="M72.375,139.192l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.027,0.488,1.502l-4.969,3.67l1.864,5.889   c0.242,0.762-0.627,1.394-1.278,0.928l-5.025-3.592l-5.025,3.592c-0.651,0.465-1.518-0.166-1.278-0.928l1.864-5.889l-4.969-3.67   c-0.643-0.476-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C71.049,138.434,72.122,138.434,72.375,139.192z"/>
        <path style={{fill:"#F5F5F5"}} d="M72.375,169.846l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.027,0.488,1.502l-4.969,3.67l1.864,5.889   c0.242,0.762-0.627,1.394-1.278,0.928l-5.025-3.592l-5.025,3.592c-0.651,0.465-1.518-0.166-1.278-0.928l1.864-5.889l-4.969-3.67   c-0.643-0.476-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C71.049,169.088,72.122,169.088,72.375,169.846z"/>
        <path style={{fill:"#F5F5F5"}} d="M72.375,200.501l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.027,0.488,1.502l-4.969,3.67l1.864,5.889   c0.242,0.762-0.627,1.394-1.278,0.928l-5.025-3.592l-5.025,3.592c-0.651,0.465-1.518-0.166-1.278-0.928l1.864-5.889l-4.969-3.67   c-0.643-0.476-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C71.049,199.742,72.122,199.742,72.375,200.501z"/>
        <path style={{fill:"#F5F5F5"}} d="M72.375,231.155l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.027,0.488,1.502l-4.969,3.67l1.864,5.889   c0.242,0.762-0.627,1.394-1.278,0.928l-5.025-3.592l-5.025,3.592c-0.651,0.465-1.518-0.166-1.278-0.928l1.864-5.889l-4.969-3.67   c-0.643-0.476-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C71.049,230.395,72.122,230.395,72.375,231.155z"/>
        <path style={{fill:"#F5F5F5"}} d="M96.169,123.567l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.027,0.488,1.502l-4.969,3.67l1.864,5.889   c0.242,0.762-0.627,1.394-1.278,0.928l-5.025-3.592l-5.025,3.592c-0.651,0.465-1.518-0.166-1.278-0.928l1.864-5.889l-4.969-3.67   c-0.643-0.476-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C94.842,122.809,95.916,122.809,96.169,123.567z"/>
        <path style={{fill:"#F5F5F5"}} d="M96.169,154.222l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.027,0.488,1.502l-4.969,3.67l1.864,5.889   c0.242,0.762-0.627,1.394-1.278,0.928l-5.025-3.592l-5.025,3.592c-0.651,0.465-1.518-0.165-1.278-0.928l1.864-5.889l-4.969-3.67   c-0.643-0.476-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C94.842,153.463,95.916,153.463,96.169,154.222z"/>
        <path style={{fill:"#F5F5F5"}} d="M96.169,184.876l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.027,0.488,1.502l-4.969,3.67l1.864,5.889   c0.242,0.762-0.627,1.394-1.278,0.928l-5.025-3.592l-5.025,3.592c-0.651,0.465-1.518-0.166-1.278-0.928l1.864-5.889l-4.969-3.67   c-0.643-0.476-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C94.842,184.117,95.916,184.117,96.169,184.876z"/>
        <path style={{fill:"#F5F5F5"}} d="M96.169,215.53l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.027,0.488,1.502l-4.969,3.67l1.864,5.889   c0.242,0.762-0.627,1.394-1.278,0.928l-5.025-3.592l-5.025,3.592c-0.651,0.465-1.518-0.166-1.278-0.928l1.864-5.889l-4.969-3.67   c-0.643-0.476-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C94.842,214.772,95.916,214.772,96.169,215.53z"/>
        <path style={{fill:"#F5F5F5"}} d="M119.962,108.538l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.027,0.488,1.502l-4.969,3.67   l1.864,5.889c0.242,0.762-0.627,1.394-1.278,0.928l-5.026-3.592l-5.025,3.592c-0.651,0.465-1.518-0.166-1.278-0.928l1.864-5.889   l-4.969-3.67c-0.643-0.476-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C118.636,107.779,119.709,107.779,119.962,108.538z"/>
        <path style={{fill:"#F5F5F5"}} d="M119.962,139.192l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.027,0.488,1.502l-4.969,3.67   l1.864,5.889c0.242,0.762-0.627,1.394-1.278,0.928l-5.026-3.592l-5.025,3.592c-0.651,0.465-1.518-0.166-1.278-0.928l1.864-5.889   l-4.969-3.67c-0.643-0.476-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C118.636,138.434,119.709,138.434,119.962,139.192z"/>
        <path style={{fill:"#F5F5F5"}} d="M119.962,169.846l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.027,0.488,1.502l-4.969,3.67   l1.864,5.889c0.242,0.762-0.627,1.394-1.278,0.928l-5.026-3.592l-5.025,3.592c-0.651,0.465-1.518-0.166-1.278-0.928l1.864-5.889   l-4.969-3.67c-0.643-0.476-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C118.636,169.088,119.709,169.088,119.962,169.846z"/>
        <path style={{fill:"#F5F5F5"}} d="M119.962,200.501l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.027,0.488,1.502l-4.969,3.67   l1.864,5.889c0.242,0.762-0.627,1.394-1.278,0.928l-5.026-3.592l-5.025,3.592c-0.651,0.465-1.518-0.166-1.278-0.928l1.864-5.889   l-4.969-3.67c-0.643-0.476-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C118.636,199.742,119.709,199.742,119.962,200.501z"/>
        <path style={{fill:"#F5F5F5"}} d="M119.962,231.155l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.027,0.488,1.502l-4.969,3.67   l1.864,5.889c0.242,0.762-0.627,1.394-1.278,0.928l-5.026-3.592l-5.025,3.592c-0.651,0.465-1.518-0.166-1.278-0.928l1.864-5.889   l-4.969-3.67c-0.643-0.476-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C118.636,230.395,119.709,230.395,119.962,231.155z"/>
        <path style={{fill:"#F5F5F5"}} d="M143.755,123.567l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.027,0.488,1.502l-4.969,3.67   l1.864,5.889c0.242,0.762-0.627,1.394-1.278,0.928l-5.025-3.592l-5.025,3.592c-0.651,0.465-1.518-0.166-1.278-0.928l1.864-5.889   l-4.969-3.67c-0.643-0.476-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C142.43,122.809,143.502,122.809,143.755,123.567z"/>
        <path style={{fill:"#F5F5F5"}} d="M143.755,154.222l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.027,0.488,1.502l-4.969,3.67   l1.864,5.889c0.242,0.762-0.627,1.394-1.278,0.928l-5.025-3.592l-5.025,3.592c-0.651,0.465-1.518-0.165-1.278-0.928l1.864-5.889   l-4.969-3.67c-0.643-0.476-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C142.43,153.463,143.502,153.463,143.755,154.222z"/>
        <path style={{fill:"#F5F5F5"}} d="M143.755,184.876l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.027,0.488,1.502l-4.969,3.67   l1.864,5.889c0.242,0.762-0.627,1.394-1.278,0.928l-5.025-3.592l-5.025,3.592c-0.651,0.465-1.518-0.166-1.278-0.928l1.864-5.889   l-4.969-3.67c-0.643-0.476-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C142.43,184.117,143.502,184.117,143.755,184.876z"/>
        <path style={{fill:"#F5F5F5"}} d="M143.755,215.53l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.027,0.488,1.502l-4.969,3.67l1.864,5.889   c0.242,0.762-0.627,1.394-1.278,0.928l-5.025-3.592l-5.025,3.592c-0.651,0.465-1.518-0.166-1.278-0.928l1.864-5.889l-4.969-3.67   c-0.643-0.476-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C142.43,214.772,143.502,214.772,143.755,215.53z"/>
        <path style={{fill:"#F5F5F5"}} d="M167.549,108.538l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.027,0.488,1.502l-4.969,3.67   l1.864,5.889c0.242,0.762-0.627,1.394-1.278,0.928l-5.025-3.592l-5.025,3.592c-0.651,0.465-1.518-0.166-1.278-0.928l1.864-5.889   l-4.969-3.67c-0.643-0.476-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C166.222,107.779,167.296,107.779,167.549,108.538z"/>
        <path style={{fill:"#F5F5F5"}} d="M167.549,139.192l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.027,0.488,1.502l-4.969,3.67   l1.864,5.889c0.242,0.762-0.627,1.394-1.278,0.928l-5.025-3.592l-5.025,3.592c-0.651,0.465-1.518-0.166-1.278-0.928l1.864-5.889   l-4.969-3.67c-0.643-0.476-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C166.222,138.434,167.296,138.434,167.549,139.192z"/>
        <path style={{fill:"#F5F5F5"}} d="M167.549,169.846l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.027,0.488,1.502l-4.969,3.67   l1.864,5.889c0.242,0.762-0.627,1.394-1.278,0.928l-5.025-3.592l-5.025,3.592c-0.651,0.465-1.518-0.166-1.278-0.928l1.864-5.889   l-4.969-3.67c-0.643-0.476-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C166.222,169.088,167.296,169.088,167.549,169.846z"/>
        <path style={{fill:"#F5F5F5"}} d="M167.549,200.501l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.027,0.488,1.502l-4.969,3.67   l1.864,5.889c0.242,0.762-0.627,1.394-1.278,0.928l-5.025-3.592l-5.025,3.592c-0.651,0.465-1.518-0.166-1.278-0.928l1.864-5.889   l-4.969-3.67c-0.643-0.476-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C166.222,199.742,167.296,199.742,167.549,200.501z"/>
        <path style={{fill:"#F5F5F5"}} d="M167.549,231.155l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.027,0.488,1.502l-4.969,3.67   l1.864,5.889c0.242,0.762-0.627,1.394-1.278,0.928l-5.025-3.592l-5.025,3.592c-0.651,0.465-1.518-0.166-1.278-0.928l1.864-5.889   l-4.969-3.67c-0.643-0.476-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C166.222,230.395,167.296,230.395,167.549,231.155z"/>
        <path style={{fill:"#F5F5F5"}} d="M191.342,123.567l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.027,0.488,1.502l-4.969,3.67   l1.864,5.889c0.242,0.762-0.627,1.394-1.278,0.928l-5.025-3.592l-5.025,3.592c-0.651,0.465-1.518-0.166-1.278-0.928l1.864-5.889   l-4.969-3.67c-0.643-0.476-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C190.016,122.809,191.09,122.809,191.342,123.567z"/>
        <path style={{fill:"#F5F5F5"}} d="M191.342,154.222l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.027,0.488,1.502l-4.969,3.67   l1.864,5.889c0.242,0.762-0.627,1.394-1.278,0.928l-5.025-3.592l-5.025,3.592c-0.651,0.465-1.518-0.165-1.278-0.928l1.864-5.889   l-4.969-3.67c-0.643-0.476-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C190.016,153.463,191.09,153.463,191.342,154.222z"/>
        <path style={{fill:"#F5F5F5"}} d="M191.342,184.876l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.027,0.488,1.502l-4.969,3.67   l1.864,5.889c0.242,0.762-0.627,1.394-1.278,0.928l-5.025-3.592l-5.025,3.592c-0.651,0.465-1.518-0.166-1.278-0.928l1.864-5.889   l-4.969-3.67c-0.643-0.476-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C190.016,184.117,191.09,184.117,191.342,184.876z"/>
        <path style={{fill:"#F5F5F5"}} d="M191.342,215.53l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.027,0.488,1.502l-4.969,3.67l1.864,5.889   c0.242,0.762-0.627,1.394-1.278,0.928l-5.025-3.592l-5.025,3.592c-0.651,0.465-1.518-0.166-1.278-0.928l1.864-5.889l-4.969-3.67   c-0.643-0.476-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C190.016,214.772,191.09,214.772,191.342,215.53z"/>
        <path style={{fill:"#F5F5F5"}} d="M215.136,108.538l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.027,0.488,1.502l-4.969,3.67   l1.864,5.889c0.242,0.762-0.627,1.394-1.278,0.928l-5.025-3.592l-5.025,3.592c-0.651,0.465-1.518-0.166-1.278-0.928l1.864-5.889   l-4.969-3.67c-0.643-0.476-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C213.81,107.779,214.882,107.779,215.136,108.538z"/>
        <path style={{fill:"#F5F5F5"}} d="M215.136,139.192l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.027,0.488,1.502l-4.969,3.67   l1.864,5.889c0.242,0.762-0.627,1.394-1.278,0.928l-5.025-3.592l-5.025,3.592c-0.651,0.465-1.518-0.166-1.278-0.928l1.864-5.889   l-4.969-3.67c-0.643-0.476-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C213.81,138.434,214.882,138.434,215.136,139.192z"/>
        <path style={{fill:"#F5F5F5"}} d="M215.136,169.846l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.027,0.488,1.502l-4.969,3.67   l1.864,5.889c0.242,0.762-0.627,1.394-1.278,0.928l-5.025-3.592l-5.025,3.592c-0.651,0.465-1.518-0.166-1.278-0.928l1.864-5.889   l-4.969-3.67c-0.643-0.476-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C213.81,169.088,214.882,169.088,215.136,169.846z"/>
        <path style={{fill:"#F5F5F5"}} d="M215.136,200.501l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.027,0.488,1.502l-4.969,3.67   l1.864,5.889c0.242,0.762-0.627,1.394-1.278,0.928l-5.025-3.592l-5.025,3.592c-0.651,0.465-1.518-0.166-1.278-0.928l1.864-5.889   l-4.969-3.67c-0.643-0.476-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C213.81,199.742,214.882,199.742,215.136,200.501z"/>
        <path style={{fill:"#F5F5F5"}} d="M215.136,231.155l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.027,0.488,1.502l-4.969,3.67   l1.864,5.889c0.242,0.762-0.627,1.394-1.278,0.928l-5.025-3.592l-5.025,3.592c-0.651,0.465-1.518-0.166-1.278-0.928l1.864-5.889   l-4.969-3.67c-0.643-0.476-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C213.81,230.395,214.882,230.395,215.136,231.155z"/>
      </g>
    </svg>
  )
}