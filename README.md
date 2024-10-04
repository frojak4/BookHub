# BookHub
Made as my first full stack project at Get Academy. 
The thought was to make a *GoodReads* type of application, where users can keep track and rate their books, as well as seeing what their friends are reading.

## Process
-Frontend stack: React, tailwindcss
-Backend stack: Node.js, express.js, SQL Server
-Other: Google Books API (for fetching books), Postman (for testing)

I was quite comfortable with React before starting this project (although I had never made anything in this scale), but I had never used any of the backend technologies.
I started with a simple book table in the database, that could store the books that I fetch from the Google Books API. Later I expanded the database to include *users*, *entries* and *connections*.
***
The frontend mainly consists of 4 different pages and is handled by react-router-dom:
## Log In
<img alt="Log In Page" src="/screenshots/LogIn.png?raw=true" width="200">
![Log In Page](/screenshots/LogIn.png?raw=true =250x)
The app has a very simple log in / register page, with only username and password. 
When you create an account, the password gets hashed and the info gets pushed to my SQL Server database.
I did not prioritize security and authentication further than this, simply because it's just a practice project that won't be deployed.
## Home
![Home Page](/screenshots/Home.png?raw=true =250x)
The home page is made of 3 components:
#### **User**
The user component uses the userid to fetch the user's *following*, *followers* and the sum of pages and books read.
#### **Library**
The library keeps track of all the books a user has read, along with their scores, status and pages. 
A user can sort the library by Title (default), Author, Score and status.
#### **Feed**
The feed shows recent book entries from people that the user is following sorted by date. The time formatting is made using momentjs.
## Profile
![Profile Page](/screenshots/Profile.png?raw=true =250x)
Uses the same user and library components as *home*, with just a little different layout and some other functionalities.
## Book
![Book Page](/screenshots/Book.png?raw=true =250x)
The book is first fetched from the parameters of the url, which is just the google books ID of the book. When fetching a book it first checks if it already is in my database, or else it will get it from google books. On this page users can see the picture and description of the book, as well as adding or editing their own *entry* of the book. When a user adds an entry for a book not in my database, it will automatically add it.
## Search
![Book Search](/screenshots/SearchBook.png?raw=true =100x)
![User Search](/screenshots/SearchUser.png?raw=true =100x)
In the searchbar a user can choose to search for users or books. When searching for books it uses the Google Books Api, and when searching for users it uses my own database.

***
2024 Frode Jakobsen

