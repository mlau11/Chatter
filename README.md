# Chatter

A real time chat application. This application will allow the user to chat one on one or in a group with other users.

## Built With

- [React](https://reactjs.org/)
- [Chakra UI](https://chakra-ui.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Node](https://nodejs.org/en/)
- [Socket.IO](https://socket.io/)
- [BCrypt](https://github.com/dcodeIO/bcrypt.js)
- [Json Web Token](https://jwt.io/)
- [React Router](https://reactrouter.com/)
- [Axios](https://axios-http.com/)

## Demo

[Chatter](https://chatter-ml.herokuapp.com)

## Installation

1. Clone repo and install dependencies
2. You will need to add your own .env file to configure environment variables for:
    * Port number
    * Mongo URI
    * JWT Secret
3. You will also need to change the CORS origin in backend/Server.js (line 43) and the Endpoint in frontend/Chat.js (line 14)
    * If you use a port number that is not 5000 in your endpoint, then you must change the proxy in frontend/package.json to match the port number you selected

To start the project, you must run `npm start` in both the backend and frontend folders on separate terminals.