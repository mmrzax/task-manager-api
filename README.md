<div align="center">

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

</div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/mmrzax/task-manager-api">
    <img src="logo.svg" alt="Logo" width="200" height="200">
  </a>

<h3 align="center">To-Do App API</h3>

  <p align="center">
    Built using Node.js
    <br />
    <br />
    <a href="https://github.com/mmrzax/task-manager-api/issues">Report Bug</a>
    ·
    <a href="https://github.com/mmrzax/task-manager-api/issues">Request Feature</a>
  </p>
</div>
<br>


<h2 align="center"> =>>> <a href="http://mrx-task-manager.herokuapp.com/">API Docs</a> <<<= </h2>

  
<br>
<br>
  

* Things I have to do:
- [ ] Add Email sending support for Signup and Login.
- [ ] Build a front-end for this app.


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project



### Built With

* [Node.js](https://nodejs.org/en/)
* [Express.js](https://expressjs.com/)
* [Mongoose.js](https://mongoosejs.com/)
* [MongoDB](https://www.mongodb.com/)
* [MailChimp](https://mailchimp.com/)
* [Typescript](https://www.typescriptlang.org/)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started


### Prerequisites

* npm
* Node.js
* MongoDB Community Server

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/mmrzax/task-manager-api.git
   ```
2. Install NPM packages (Prod & Dev)
   ```sh
   npm install
   npm install --only=dev
   ```
3. Edit env variables in `config/env.dev`
   ```dev
   PORT=<ENTER_YOUR_DEV_PORT>
   JWT_SECRET=<YOUR_SECRET_FOR_JWT>
   MONGODB_URL=mongodb://127.0.0.1:<MONGODB_SERVER_PORT>/task-manager-api
   ```
4. Run MongoDB local server

5. Run TS compiler
   ```sh
   npm run compile
   ```
6. Start local server
   ```sh
   npm run dev
   ```


<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

<p align="right">(<a href="#top">back to top</a>)</p>






<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/mmrzax/task-manager-api.svg?style=for-the-badge
[contributors-url]: https://github.com/mmrzax/task-manager-api/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/mmrzax/task-manager-api.svg?style=for-the-badge
[forks-url]: https://github.com/mmrzax/task-manager-api/network/members
[stars-shield]: https://img.shields.io/github/stars/mmrzax/task-manager-api.svg?style=for-the-badge
[stars-url]: https://github.com/mmrzax/task-manager-api/stargazers
[issues-shield]: https://img.shields.io/github/issues/mmrzax/task-manager-api.svg?style=for-the-badge
[issues-url]: https://github.com/mmrzax/task-manager-api/issues
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/mohammad-reza-fathi-10731521a
