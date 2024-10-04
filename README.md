# BookHub
Made as my first full stack project at Get Academy. 
The thought was to make a *GoodReads* type of application, where users can keep track and rate their books, as well as seeing what their friends are reading.
## Log In
![Log In Page](/screenshots/LogIn.png?raw=true)
The app has a very simple log in / register page, with only username and password. 
When you create an account, the password gets hashed and the info gets pushed to my SQL Server database.
## Home
![Home Page](/screenshots/Home.png?raw=true)
The home page is made of 3 components:
**User**
The user component uses the userid to fetch the users *following*, *followers* and the sum of pages and books read.
**Library**
The library keeps track of all the books a user has read, along with their scores, status and pages. 
A user can sort the library by Title (default), Author, Score and status.
**Feed**
The feed fetches all the people the user is following and shows their recent book entries. 



# Ikkje ferdig