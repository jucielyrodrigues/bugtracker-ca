# BUG TRACKER

> This project is a bugtracker for the course Cloud Based Web Applications

> This application register bugs and you can add comments, users, projects and search using the variables defined.

## Table of contents

- [General info](#general-info)
- [Screenshots](#screenshots)
- [Technologies](#technologies)
- [Setup](#setup)
- [Features](#features)
- [Status](#status)
- [Inspiration](#inspiration)
- [Contact](#contact)

## General info

CA2 - CLOUD WEB APPLICATIONS

## Technologies

- "body-parser": "1.19.0",
- "express": "4.17.1",
- "mongodb": "3.6.2",
- "nodemailer": "6.4.16"
- HEROKU
- GITHUB
- IMSOMNIA
- MONGODB

## Setup

git clone https://github.com/jucielyrodrigues/bugtracker-ca

go to directory and run npm start.

## Example usage

- get users: /users
- get users by email: /users/:email
  add users using post: /users

- get projects : /projects
- get projects by slug: /projects/:slug
- add project using post: /projects

- get issues: /issues
- get issues by slug: /issues/:slug
- get issues by project :/projects/:slug/issues
- add issues using post : /projects/:slug/issues

- get comments for an issue: /issues/:issueNumber/comments
- get specific comment for an issue: /issues/:issueNumber/comments/:commentsId
- add a comment for an issuen using post: /issues/:issueNumber/comments

## changelog

- OCT 23- START PROJECT
- OCT 25- ADD postusercontroller, function add
- OCT 27- add model and control for issues
- OCT 29- comments,update, agreggate, getByKey
- NOV 25- All promises have a reject,
  not be able to duplicate users (based on email),
  not be able to duplicate projects based on SLUG,
  not be able to add any item without all the fields.

## Roadmap

-Project is: finished.

## Contact

Created by [@jucielyrodrigues](github.com/jucielyrodrigues)
