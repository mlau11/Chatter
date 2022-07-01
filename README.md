# Chatter

A real time chat application. This application will allow users to chat one on one or in a group with other users.

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
2. Add .env file to configure environment variables for:
    * PORT
    * MONGO_URI
    * JWT_SECRET
3. Change the CORS origin in backend/Server.js (line 43)
4. Change ENDPOINT in frontend/Chat.js (line 14)
    * If a different port number than 5000 is used as the endpoint, then the proxy in frontend/package.json must be changed to match the port number selected

To start the project, run `npm start` in both the backend and frontend folders on separate terminals.