# Social Network

Welcome to my 5th project for GeeksHub Academy and my second backend project.

<div align="center">
  <img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGptYmEweWF4ZGhteWlnZ285eWcyaDljOWI2M2VyZmU5M285enVsZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ONUbxDeVekEKa8ynHb/giphy.webp" alt="Like" />
</div>
<br/>
<details>
  <summary>Summary 📝</summary>
  <ol>
    <li><a href="#deploy">Deploy</a></li>
    <li><a href="#stack">Stack</a></li>
    <li><a href="#db-scheme">DB Scheme</a></li>
    <li><a href="#local-installation">Installation</a></li>
    <li><a href="#endpoints">Endpoints</a></li>
    <li><a href="#futures-functionalities-and-things-to-improve">Futures functionalities and things to improve</a></li>
    <li><a href="#author">Author</a></li>
  </ol>
</details>

## Deploy

<div align="center">
  🚀<a href="https://social-network-fornesb.zeabur.app/healthy"> <strong> Click here to check the status of the deploy!</strong></a>🚀
</div>

## Stack

<div align="center">
<a href="https://www.expressjs.com/">
    <img src= "https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"/>
</a>
<a href="https://nodejs.org/es/">
    <img src= "https://img.shields.io/badge/node.js-026E00?style=for-the-badge&logo=node.js&logoColor=white"/>
</a>
<a href="https://developer.mozilla.org/es/docs/Web/JavaScript">
    <img src= "https://img.shields.io/badge/javascipt-EFD81D?style=for-the-badge&logo=javascript&logoColor=black"/>
</a>
<a href="">
    <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white"/>
</a>
<a href="">
    <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT" />
</a>
<a href="">
    <img src="https://img.shields.io/badge/bcrypt-3178C6?style=for-the-badge&" alt="TypeScript" />
</a>
 </div>

## DB Scheme

<div align="center">
  <img src="https://i.gyazo.com/71e7f5ba04e8968644e3735b407cebb6.png" alt="DB Scheme" />
</div>
We have three documents, posts is weak because it needs user to work and comments (which I don't use right now but is a possible feature in the future) is weaker, it needs author_id to work and comment_id to work because it has to reference a post and can be made by any user.

## Local installation

1. Clone the repository ```git clone https://github.com/FornesBorja/tatooStudioBackend.git```
2. Open the folder
3. ` $ npm i `
4. Copy the .env.example file, change the name of the copy to .env.
5. Write the .env file with your server parameters, to make the server work.
6. ``` $ npm run seed ```
7. ``` $ npm run dev ```

## Endpoints

<div align="center">
    📖<a href="https://documenter.getpostman.com/view/36919197/2sA3kSnNSa"><strong> Click here to check the endpoint documentation! </strong></a>📖
</div>

## Futures functionalities and things to improve

🔲 More endpoints (extra endpoints) <br/> 
🔲 Comment section <br/>  

## Author

- Esperanza Fornes - student Full Stack Developer Web
  - [GitHub](https://github.com/fornesborja)
