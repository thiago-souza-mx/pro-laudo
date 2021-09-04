

global.Base={
  api: process.env.NEXT_PUBLIC_API
}

global.$ = element => document.querySelector( element );

export default global;