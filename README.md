# Social Network API

## Description
Mock social network api using Get, Post, Put, Delete methods to update database.

## Technologies Used
-Javascript
-NoSQL
-HTML
-MongoDB
-Mongoose


## Usage
Using the following API routes :
users/ (Get, Post)
    Get : returns all users
    Post : creates new user when username and email is entered.
users/:id (Get, Put, Delete)
    Get : returns user with id entered
    Put : updates user credentials 
    Delete : removes the user
users/:id/friends/:id(Post, Delete)
    Post : add freind
    Delete : remove friend
thoughts/ (Get, Post)
    Get : returns all thoughts
    Posts : adds new thought
thoughts/:id (Get, Put, Delete)
    Get : returns thought with id entered
    Put : updates thought with id
    Delete : deletes thought with id
thoughts/:id/reactions/:id (Post, Delete)
    Post :  creates reaction
    Delete :  deletes reaction


## Contributing
github username: nicholasstacy89
repo :  https://github.com/nicholasstacy89/UR-18-SocialNetwork
demo : https://drive.google.com/file/d/1uWC5T1ds5TEo2G80JbPtQ8aSk666gyM6/view


