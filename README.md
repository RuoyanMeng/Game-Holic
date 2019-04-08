# GameHolic

## What is it?
GameHolic is a web application where users can search for trendy games and view detailed information of games, including rating scores, game
descriptions and etc. Users can log in the site and add the selected games to their collection lists of their own accounts, as well as edit the
items of those lists.

## What have we done so far?
Our project is using React and Redux dealing with data and interaction, and we spend a lot of time exploring how Redux works. For now, we are able to use React Redux to process data and implement interactive functions quickly. Also, we have now finished the data flow based React Redux , UI design and most parts of the interaction like search, add wishlist etc.

## Link to running application
[GameHolic](https://game-holic-590ee.firebaseapp.com/)

## To start a local version
To start a local version, download and run ## npm install, ## npm start
  
### Frameworks used
* ReactJS
* Redux

### Libraries used
* Ant Design of React

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
    ├── Components // Render different view when state changes, event listener, layput design
    │   ├── GameGrid.js  // Components for showing trendy game list
    │   ├── Main.js // Components for homepage
    │   ├── Header.js   // Components for header bar
    │   ├── SingleGame.js   // Components for game details page
    │   ├── UserIndex.js   // Components for user index page
    │   ├── Search.js   // Components for Searching
    │   ├── auth // Components handle signin/signup part
    │   ├    ├── SignIn.js
    │   ├    ├── SignUp.js
    │   ├── gamelist // Components handle game collection lists
    │   ├    ├── AbandonedList.js
    │   ├    ├── CompletedList.js
    │   ├    │── PlayingList.js
    │   ├    │── WishListt.js

    ├── Reducers //Reducers specify how the state changes in response to actions sent to the store.
    │   ├── Index.js
    │   ├── editGameList.js
    │   ├── getAllGames.js
    │   ├── getSingleGame.js
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
    │   └── UserIndex.scss
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