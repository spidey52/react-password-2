const axios = require("axios");

const data = [

  {
    id: 21,
    tagName: "good nature",
    tagPass: "fake one",
    userName_id: 1,
  },
  {
    id: 22,
    tagName: "good feel bazaar ",
    tagPass: "838324234 ",
    userName_id: 1,
  },
  {
    id: 23,
    tagName: "heroku",
    tagPass: "satyam52!@",
    userName_id: 1,
  },
  {
    id: 24,
    tagName: "twilio recovery code ",
    tagPass: "zFvFGf44Kf6ZJFjx0WHBxtxLFK4bRaZWezR2Z5tS",
    userName_id: 1,
  },
];

console.log(data[0]);

const updateData = async () => {
  for (let i = 0; i < data.length; i++) {
    const res = await axios.post(
      `https://spidey-passmanager.herokuapp.com/passwds`,
      {
        name: data[i].tagName,
        password: data[i].tagPass,
        username: "satyamkumar5254@gmail.com",
        email: "satyamkumar5254@gmail.com",
      },
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDAxZTlmNjBlY2FlMzAwMDQ2MDI2ODIiLCJpYXQiOjE2MTIwMjc3MDV9.-Uw0R4faSPIlu8qlw6L5kZ-9Eqe0bPwZP7lVS6UaOLs`,
        },
      }
    );

    console.log(res.data);
  }
};

updateData();
