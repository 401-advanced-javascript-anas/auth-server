'use strict';

let URL = 'https://github.com/login/oauth/authorize';

let options = {
  client_id: '28c677595f49640da838',
  redirect: 'http://localhost:3000/oauth',
  scope: 'read:user',
  state: 'oauthstate',
};
// encodeURIComponent
let QueryString = Object.keys(options).map((key)=> {
  return `${key}=` + encodeURIComponent(options[key]);
}).join('&'); // pairs key=value&ley2=value2
// uri+ QS
let authURL = `${URL}?${QueryString}`;

let link = document.getElementById('oauth');
link.setAttribute('href', authURL);
console.log('authURL: ', authURL);
