# Cinema Demo

## Table of contents

-   [Cinema Demo](#cinema-demo)
    -   [Table of contents](#table-of-contents)
    -   [About](#about)
        -   [Built with](#built-with)
    -   [How to run](#how-to-run)

## About

The contents of this repository is the frontend service for a cinema/movie-theater webpage. The project is not connected to any actual cinema, it is just a personal project. The associated backend is in a separate repostiory located at [cinema-server-backend](https://github.com/ScandiumSG/cinema_demo_backend).

### Built with

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

## How to run

To run the application locally you need to have node and npm installed, it is also required to have the url of the backend associated with the project inside a `.env` or `.env.local` file in the root of the project to provide the `VITE_BACKEND_BASE_URL` property used. Look at the [.env.example](.env.example) file for template.

If all the requirements are met simple run the commands

```#Bash
npm install
npm run dev
```

The project will start running on localhost:5173.
