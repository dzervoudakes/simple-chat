# Simple Chat

> No frills chat app built with React and Socket.io.

<!-- [![build](https://github.com/dzervoudakes/simple-chat/workflows/Build%20and%20Test/badge.svg)](https://github.com/dzervoudakes/simple-chat/actions)
[![codecov](https://codecov.io/gh/dzervoudakes/simple-chat/branch/main/graph/badge.svg)](https://codecov.io/gh/dzervoudakes/simple-chat)
[![quality](https://app.codacy.com/project/badge/Grade/373b659cba7b4b8cb0f275db57c3ef38)](https://www.codacy.com/gh/dzervoudakes/simple-chat/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=dzervoudakes/simple-chat&amp;utm_campaign=Badge_Grade) -->
[![prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://prettier.io/)

## Premise

A simple, real-time chat UI with a preconfigured list of chatrooms which users can contribute to. Users can also send private messages to each other.

**Some notes:**

- This is a full rewrite of an older project that had some nasty patterns I wanted to clean up
- I didn't bother testing in IE11, so good luck there
- The UI is loosely inspired by Slack
- Web sockets are awesome

<!-- ![demo](demo.gif) -->

## Technologies Used

- **Frontend:** React, TypeScript, Socket.io-client, CSS-in-JS theming
- **Backend:** Node + Express, OvernightJS, Socket.io
- **Database:** Docker, MongoDB
- **CI/CD:** GitHub Actions

## Local Development

### Database and Server Setup

- Ensure `Docker` is installed and running
- In your terminal, `cd` into the `server` directory and run `npm install`
- From the project root, open your terminal and run `docker-compose up`
  - Seed data will be populated in the database automatically
  - The server will be running on `http://localhost:3000`
  - There are two test users by default, `Admin123` and `TestUser123` ... The password for each is `passworddd`

The `server/README.md` provides additional information on build scripts and environment variables.

### Client Setup

- In another terminal window, `cd` into the `client` directory and run `npm install`
- Run `npm start`
  - The application may be accessed in a web browser at `http://localhost:8080`

The `client/README.md` provides additional information on build scripts and environment variables.

## Technical Requirements

> The runtime environment for this application requires `node >= 14.6.0` and `npm >= 6.14.7`.

## Configuration

> This application makes use of `ESLint`, `Stylelint` and `EditorConfig`. Each of these features requires
> an extension be installed in order to work properly with IDEs and text editors such as VSCode.
