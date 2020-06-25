'use strict';

const { server } = require('../src/server');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);

jest.spyOn(global.console, 'log');
let idMOtivation = null;
let userMotivation = 'undifined';
let token = null;


require('dotenv').config();

describe('server.js', () => {
  
    
  it('should get /', () => {
    return mockRequest
      .get('/')
      .then(results => {
        expect(results.status).toBe(200);
      });
  });
    
    
    
    
  it('should /signup as a user role', () => {
    let testData = {
      username: 'testuser',
      fullName: 'shshshsh',
      password: '55',
    };
    return mockRequest
      .post('/signup')
      .send(testData)
      .then(data => {
        expect(data.status).toBe(403);
      });
  });

  it('should  /signin as a user role', () => {
    
    return mockRequest
      .get('/signin')
      .set('Authorization', `Basic dGVzdHVzZXI6NTU=`)
      .then(data => {
        token = data.body.token;
        expect(data.status).toBe(404);
      });
  });

  

  it('should  /signin as a user role', () => {
    
    return mockRequest
      .get('/signin')
      .set('Authorization', `Basic dhkhdfjkdhkdkh`)
      .then(data => {
        expect(data.status).toBe(404);
      });
  });



  it('post() failure /motivation', ()=> {
    let obj = {title: 'test-post-1'};
    return mockRequest
      .post('/motivation')
      .send(obj)
      .then(data => {
        expect(data.status).toBe(404);
      });
  });



  it('should delete /motivation/:id', () => { 
    return mockRequest
      .delete(`/motivation/${idMOtivation}`)
      .set('Authorization', `Bearer ${token}`) 
      .then(results => {
        expect(results.status).toBe(404);
      });
  });


  
  it('should get /motivation/:user', () => {
    return mockRequest
      .get(`/motivation/${userMotivation}`)
      .then(results => {
        expect(results.status).toBe(404);
      });
  });

 

  // *******************************************************************



});