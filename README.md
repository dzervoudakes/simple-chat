# Simple Chat

> No frills chat app built with React and Socket.io

<!-- [![build](https://github.com/dzervoudakes/simple-chat/workflows/Build%20and%20Test/badge.svg)](https://github.com/dzervoudakes/simple-chat/actions)
[![codecov](https://codecov.io/gh/dzervoudakes/simple-chat/branch/main/graph/badge.svg)](https://codecov.io/gh/dzervoudakes/simple-chat)
[![quality](https://app.codacy.com/project/badge/Grade/373b659cba7b4b8cb0f275db57c3ef38)](https://www.codacy.com/gh/dzervoudakes/simple-chat/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=dzervoudakes/simple-chat&amp;utm_campaign=Badge_Grade) -->
[![prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://prettier.io/)

## Premise

A simple chat UI with a preconfigured list of chatrooms which users can contribute to. All chats are ephemeral with no data persistence.

<!-- <img src="demo.gif" height="350"/> -->

## Technologies Used

- **Frontend:** React, TypeScript, CSS-in-JS theming
- **Backend:** Node + Express, Socket.io
- **CI/CD:** GitHub Actions

## Local Development

### Server Setup

- In your terminal, `cd` into the `server` directory and run `npm install`
- Run `npm start`
  - The server will be running on `http://localhost:3000`

The `server/README.md` provides additional information on build scripts for local development.

### Client Setup

- In another terminal window, `cd` into the `client` directory and run `npm install`
- Run `npm start`
  - The application may be accessed in a web browser at `http://localhost:8080`

The `client/README.md` provides additional information on build scripts for local development.

## Technical Requirements

> The runtime environment for this application requires `node >= 14.6.0` and `npm >= 6.14.7`.

## Configuration

> This application makes use of `ESLint`, `Stylelint` and `EditorConfig`. Each of these features requires
> an extension be installed in order to work properly with IDEs and text editors such as VSCode.
