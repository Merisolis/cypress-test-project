const flatted = require('flatted');
const axios = require('axios');

const userCredentials = {
  email: 'mariya.vivchar@gmail.com',
  password: 'Qwerty12345'
};

let sessionCookie;
let createdCarIds = [];

beforeAll(async () => {
  try {
    // Отправка запроса на аутентификацию
    const authResponse = await axios.post('https://qauto.forstudy.space/api/auth/signin', {
      email: userCredentials.email,
      password: userCredentials.password
    }, {
      withCredentials: true
    });

    // Извлечение cookie из ответа
    const cookies = authResponse.headers['set-cookie'];
    sessionCookie = cookies.find(cookie => cookie.startsWith('sid='));

    // Логируем только тело ответа, сериализованное через flatted
    console.log(flatted.stringify(authResponse.data)); // Сериализуем тело ответа
  } catch (error) {
    console.error('Ошибка при аутентификации:', error);
  }
});

afterAll(async () => {
  try {
    // Удаление созданных автомобилей
    for (let carId of createdCarIds) {
      await axios.delete(`https://qauto.forstudy.space/api/cars/${carId}`, {
        headers: { Cookie: sessionCookie },
        withCredentials: true
      });
    }
  } catch (error) {
    console.error('Ошибка при удалении автомобилей:', error);
  }
});

// Массив брендов и моделей для тестов
const carBrands = [
  { brandId: 1, modelId: "Audi", mileage: 15000 },  // Audi
  { brandId: 2, modelId: "BMW", mileage: 12000 },  // BMW
  { brandId: 3, modelId: "Ford", mileage: 13000 },  // Ford
  { brandId: 4, modelId: "Porsche", mileage: 18000 },  // Porsche
  { brandId: 5, modelId: "Fiat", mileage: 10000 }   // Fiat
];

// Тест для создания автомобиля для всех брендов и моделей
test('User can create a car for all brands and models', async () => {
  for (const { brandId, modelId, mileage } of carBrands) {
    try {
      const createResponse = await axios.post('https://qauto.forstudy.space/api/cars', {
        brandId,
        modelId,
        mileage
      }, {
        headers: { Cookie: sessionCookie },
        withCredentials: true
      });

      expect(createResponse.status).toBe(200);
      createdCarIds.push(createResponse.data.data.id);
    } catch (error) {
      console.error(`Ошибка при создании автомобиля для бренда ${brandId}:`, error);
    }
  }
});

// Тест для неудачного создания автомобиля с некорректным пробегом
test('Fail to create car with invalid mileage', async () => {
  try {
    await axios.post('https://qauto.forstudy.space/api/cars', {
      brandId: 1,
      modelId: 1,
      mileage: 'invalid'
    }, {
      headers: { Cookie: sessionCookie },
      withCredentials: true
    });
  } catch (error) {
    expect(error.response.status).toBe(400);  // Ожидаем ошибку 400 (Bad Request)
  }
});

// Тест для неудачного создания автомобиля для несуществующего бренда
test('Fail to create car for non-existent brand', async () => {
  try {
    await axios.post('https://qauto.forstudy.space/api/cars', {
      brandId: 999, 
      modelId: 1,
      mileage: 10000
    }, {
      headers: { Cookie: sessionCookie },
      withCredentials: true
    });
  } catch (error) {
    expect(error.response.status).toBe(400);  // Ожидаем ошибку 400 (Bad Request)
  }
});
