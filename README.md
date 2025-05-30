# Battleships online game, Web application (Frontend)
[Link to the game: https://lukaschyle.github.io/battleship/](https://lukaschyle.github.io/battleship/)

[Link to the backend repository](https://github.com/LukasChyle/battleship-backend)

## Content
- [About](#about)
- [Abstract](#abstract)
- [To Do](#to-do)
- [Tools](#tools)
    
## About
This project was my thesis for a Higher Vocational Education program in Java development.
The application is designed to be scalable and lightweight, which is why it was built without a database.
This reduces complexity while maintaining performance.
Additionally, by not storing sensitive data, the application minimizes security risks.

## Abstract
The objective of this project was to develop a web application facilitating communication
between clients (frontend) and a server (backend) using WebSocket, a communication
protocol technology that enables interactive two-way communication between a client and a
server over a single TCP connection. It facilitates real-time communication between the
client and the server, meaning data can be sent and received instantly without the client
needing to repeat requests.
A good use case for WebSocket is for games that require real-time communication between
players. This project is a web application where users can play Battleship online by
connecting to a server. The server pairs clients into two-player game sessions, enabling
interactive gameplay over the internet.
The server is responsible for managing all game logic, ensuring that clients do not have
access to sensitive information regarding the game session.
The primary focus has been on creating a visually appealing and user-friendly gaming
environment within a scalable system.
The frontend is developed using JavaScript with the React library, while the backend is
implemented in Java utilizing the Spring Boot framework.

## To Do
- Implement an "About" page/dialog trough the header.
- Create an appropriate footer.
- Add more language options.

## Tools
### (used in frontend)

### React
A JavaScript library for building user interfaces with a component-based approach. It focuses on the view layer, enabling dynamic and interactive UIs.

### Vite
A fast frontend build tool and development server optimized for modern frameworks like React, Vue, and Svelte. It uses ES modules (ESM) and esbuild for faster startup and hot module replacement (HMR).

### WebSocket
A communication protocol enabling bidirectional, real-time data exchange between a client and server over a single persistent TCP connection, reducing the need for repeated requests.

### Material-UI (MUI)
A React component library implementing Google’s Material Design, offering customizable and reusable UI components for modern and responsive web applications.

### Dnd-kit
A lightweight React library for creating drag-and-drop interactions with a customizable and accessible API.

### React-use-websocket
A React library simplifying WebSocket management with built-in support for reconnecting, message handling, and real-time data streaming.

### React-intl
A React library for internationalization (i18n), enabling easy localization of text, dates, and numbers in different languages and regions.

