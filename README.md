# Simple Chat

> No frills chat app built with React and Socket.io.

[![client](https://github.com/dzervoudakes/simple-chat/workflows/Client/badge.svg)](https://github.com/dzervoudakes/simple-chat/actions)
[![server](https://github.com/dzervoudakes/simple-chat/workflows/Server/badge.svg)](https://github.com/dzervoudakes/simple-chat/actions)
[![codecov](https://codecov.io/gh/dzervoudakes/simple-chat/branch/main/graph/badge.svg)](https://codecov.io/gh/dzervoudakes/simple-chat)
[![quality](https://app.codacy.com/project/badge/Grade/4bd2e6a40f774d2ea9300a2afd9489f5)](https://www.codacy.com/gh/dzervoudakes/simple-chat/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=dzervoudakes/simple-chat&amp;utm_campaign=Badge_Grade)
[![prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://prettier.io/)

## Premise

A simple, real-time chat UI with a preconfigured list of chatrooms which users can contribute to. Users can also send private messages to each other.

**Notes:**

- This is a full rewrite of an older project that had some nasty patterns I wanted to clean up
- I decided to experiment with `react-with-styles` and custom components as an alternative to Material (and had a lot of fun doing it)
- The UI is loosely inspired by Slack
- WebSockets are awesome

![demo](demo.gif)

## Technologies Used

- **Frontend:** React, TypeScript, Socket.io-client, CSS-in-JS theming
- **Backend:** Node + Express, OvernightJS, Mongoose, Socket.io
- **Database:** Docker, MongoDB
- **CI/CD:** GitHub Actions

## Local Development

### Database and Server Setup

- Ensure that `Docker` is installed and running
- In your terminal, `cd` into the `server` directory and run `npm install`
- From the project root, open your terminal and run `docker compose up`
  - Seed data will be populated in the database automatically
  - The server will be running on `http://localhost:3000`
  - There are two test users by default, `Admin123` and `TestUser123`
  - The password for each test user is `passworddd`

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

## Accessibility

> This application has been tested for accessibility via the [axe DevTools - Web Accessibility Testing](https://chrome.google.com/webstore/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd) and [Accessibility Insights for Web](https://chrome.google.com/webstore/detail/accessibility-insights-fo/pbjjkligggfmakdaogkfomddhfmpjeni) Chrome extensions.
