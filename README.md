Game Holic
The project is now deployed on https://game-holic-bfb01.firebaseapp.com/
To start a local version, download and run ## npm install, ## npm start

Our project is using React and Redux dealing with data and interaction, so we spend a lot of time exploring how Redux works. For now, We have finished the data flow based React Redux and some interaction like search, add wishlist etc. And a very simple UI to present the functions we have done. 

We are now able to use React Redux to process data and implement interactive functions quickly. So the next stage we will focus on adding more features like more options for the searching, different types of game list, back-end develops and improves our UI design.

File Structure
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
    │   └── index.js
    ├── Api // Fetch data 
    │   └── api.js
    ├── App.js // Router
    ├── Components // Render different view when state changes, event listener, layput design
    │   ├── GameGrid.js
    │   ├── Main.js 
    │   ├── SideBar.js
    │   ├── SingleGame.js
    │   └── WishList.js
    ├── Reducers //Reducers specify how the state changes in response to actions sent to the store.
    │   ├── Index.js
    │   ├── editWishList.js
    │   ├── getAllGames.js
    │   └── getSingleGame.js
    ├── Store // Holds state, allows state to be updated via dispatch()
    │   └── configureStore.js
    ├── Styles
    │   ├── App.css
    │   ├── gamegrid.css
    │   ├── index.css
    │   ├── main.css
    │   ├── sidebar.css
    │   ├── singlegame.css
    │   └── wishlist.css
    ├── index.js // Render hole APP
    └── serviceWorker.js
```







