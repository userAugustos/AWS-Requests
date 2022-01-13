const https = require('https');
const axios = require('axios');

// let address;


exports.getAddress = async (event, context) => {
  const cep = event.queryStringParameters.cep

  if(!cep){
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Você não passou nenhum endereço'
      })
    }
  }

  try {
    const response = new Promise((resolve, reject) => {
      const req = https.get(`https://viacep.com.br/ws/${cep}/json/`, (res) => {
        res.on('data', data => {
          address = JSON.parse(data);
        });
        res.on('end', () => {
          resolve({
            statusCode: 200,
            body: JSON.stringify(address)
          });
        });
      });

      req.on('error', (e) => {
        reject({
          statusCode: 500,
          body: 'Something went wrong!'
        });
      });
    });

    return response;
  } catch (error) {
    console.log(error)
    return error
  };
}


    // const address = await fetch('viacep.com.br/ws/01001000/json/').then(res => JSON.parse(res));
    // axios.get(`https://viacep.com.br/ws/${cep}/json/`).then(res => {
    //   const address = JSON.parse(res);
    //   return {
    //     statusCode: 200,
    //     body: JSON.stringify(address)
    //   }
    // }).catch(err => {
    //   return {
    //     statusCode: 500,
    //     body: JSON.stringify(err)
    //   }
    // });