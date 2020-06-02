# GameHolic

## Updates
Up to now, we have done the following updates:
* Reorganize the file architecture to make the separation between containers and presentational components more precise and clear

* Add more functionality
    * add drag and drop functionality to personal lists:
        * reorder the items
        * move items to another list
    * add more operation to single game:
        * add rating (users can rate the game from 0 to 5 stars) 
        * add comments (users can add comments about the game and see others' replies)
        * add hover delete button (users can delete the items in their personal lists directly)

## What is it?
GameHolic is a web application where users can search for trendy games and view detailed information of games, including rating scores, game descriptions and etc. Users can log in the site and add the selected games to their collection lists of their own accounts, as well as edit the items of those lists. The project is using React and Redux dealing with data and interaction

## Link to running application
[GameHolic](https://game-holic-590ee.firebaseapp.com/)

## To start a local version
To start a local version, download and run:
<pre><code>npm install</code></pre>
<pre><code>npm start</code></pre>
  
### Frameworks used
* ReactJS
* Redux

### Libraries used
* Ant Design of React
* Tachyons
* react-beautiful-dnd

### API used
* IGDB API

## File Architecture
```
├── README.md
├── package-lock.json
├── package.json
├── public
│   └── index.html
└── src
    ├── APIKEY.js
    ├── Actions // Actions are payloads of information that send data from your application to the store. 
    │   ├── actionTypes.js
    ├   ├── authActions.js
    │   └── index.js
    ├── Api // Fetch data 
    │   └── api.js

    ├── App.js // Router
    ├── Components
    │   ├── auth // Components handle signin/signup part
    │   ├    ├── SignIn.js
    │   ├    ├── SignUp.js
    │   ├── Containers
    │   ├    ├── Main.js
    │   ├    ├── Search.js
    │   ├    ├── SingleGame.js
    │   ├    ├── UserIndex.js    
    │   ├── Presentational
    │   ├    ├── Comments.js
    │   ├    ├── gameDetails.js
    │   ├    │── GameGrid.js
    │   ├    │── GameList.js
    │   ├    │── PlayStatusModal.js
    │   ├── Header.js

    ├── Reducers //Reducers specify how the state changes in response to actions sent to the store.
    │   ├── Index.js
    │   ├── editGameList.js
    │   ├── getAllGames.js
    │   ├── getSingleGame.js
    │   ├── getComment.js    
    │   └── authReducers.js
    ├── Store // Holds state, allows state to be updated via dispatch()
    │   └── configureStore.js
    ├── Styles
    │   ├── App.css
    │   ├── gamegrid.scss
    │   ├── header.scss
    │   ├── index.css
    │   ├── main.scss
    │   ├── search.scss
    │   ├── Sign.css
    │   ├── singlegame.scss
    │   ├── UserIndex.scss
    │   └── comments.scss

    │── img
    │   ├── background.png
    │   ├── bg1.jpg
    │   ├── bg2.jpg
    │   ├── bg3.jpg
    │   ├── bg4.jpg
    │   ├── logo.png
    │   └── logo1.png
    │── config
    │   └──  firebaseConfig.js
    ├── index.js // Render hole APP
    └── serviceWorker.js
```
