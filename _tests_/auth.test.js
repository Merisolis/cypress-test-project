const axios = require('axios');

const userCredentials = {
  email: 'mariya.vivchar@gmail.com',
  password: 'Qwerty12345'
};

test('auth can get token', async () => {
  const authResponse = await axios.post('https://demoqa.com/Account/v1/GenerateToken', {
    "userName": userCredentials.email,
    "password": userCredentials.password
  });

  expect(authResponse.status).toBe(200);
  expect(authResponse.data).toHaveProperty('token');
});

test('auth can get user info', async () => {
  const authResponse = await axios.post('https://demoqa.com/Account/v1/GenerateToken', {
    "userName": userCredentials.email,
    "password": userCredentials.password
  });

  const token = authResponse.data.token;


  const userInfoResponse = await axios.get('https://qauto.forstudy.space/api/users/current', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  console.log('BEFORE');
  expect(userInfoResponse.status).toBe(200); 
  expect(userInfoResponse.data).toHaveProperty('status', 'ok'); 
  expect(userInfoResponse.data).toHaveProperty('data'); 


  expect(userInfoResponse.data.data).toHaveProperty('userId',153704); 
  expect(userInfoResponse.data.data).toHaveProperty('currency', 'usd'); 
  expect(userInfoResponse.data.data).toHaveProperty('distanceUnits', 'km'); 
  expect(userInfoResponse.data.data).toHaveProperty('photoFilename', 'default-user.png');
  console.log('AFTER');
});