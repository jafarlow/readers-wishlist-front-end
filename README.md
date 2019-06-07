Reader's Wishlist App (front end)


LINKS:

Wireframe: https://imgur.com/tBSoSJf

ERD: https://imgur.com/pPR0jnK

Deployed site: https://jafarlow.github.io/readers-wishlist-front-end/

Heroku link: https://powerful-mesa-48048.herokuapp.com/

Front-end repo: https://github.com/jafarlow/readers-wishlist-front-end

Back-end repo: https://github.com/jafarlow/readers-wishlist-back-end


APP PREVIEW:
![screenshot from 2019-06-06 20-49-56](https://media.git.generalassemb.ly/user/19621/files/cc936c00-889c-11e9-87dd-937b4b591ca5)


API ROUTES:

There are three resources on the back-end: User, Book, and Wishlist

A User owns a wishlist (potentially many beyond version 1.0)

A wishlist can reference a book

A book has attributes (author, title, etc.) but is not owned by anything,
which leaves it available to other users

When a user interacts with a book (adding it to the wishlist) that book's ID
is stored in their wishlist as a reference to be utilized in displaying the
book later on.


USER STORIES:

As a user I want to sign up - POST

As a user I want to sign in - POST

As a user I want to change password when signed in - PATCH

As a user I want to sign out - DELETE

As a user I want to get three random book suggestions - GET

As a user I want to add items a wishlist - POST

As a user I want to be able to view what is in the wishlist - GET

As a user I want to remove items from the wishlist - DELETE

As a user I want to mark a wishlist item as read/unread - PATCH


TECHNOLOGY USED:

Front-end: ReactJS, HTML, SCSS, React Bootstrap, Google Fonts

Back-end: Express, MongoDB, & Mongoose


HOW IT WORKS:

This is a rough version 1.0 of my Reader's Wishlist App. Once a user has
signed-in, that person can view their wishlist and can get some books at
random. For a first-time user, the wishlist page will be blank. When
navigating over to the Book Suggester page, the user is presented with a
button that invitingly says "Get Books!"

Clicking this button will display three books to the user, randomly selected
from a database that I have seeded. A user can then either click the button
again to show three new books, or the user can click to add a book to their
wishlist.

Once a user has items in their wishlist, the "Get Books" button will exclude
them from the available list of books to display.

With books in the wishlist, a user can take two actions on a book. One, they
can remove it from their list. And two, they can mark that they've read it.

PLANNING/PROCESS/PROBLEM-SOLVING:

This is an idea I've had in my head for a while. I wanted to create an app
that allows someone to quickly get books at random for someone who has a
tough time choosing a book.

I sketched this out a few times, with my most hopeful wireframes linked
above (not accurate for version 1.0!). I also sketched out the ERD and how
I anticipated relationships on the back-end of things.

Once it came down to coding, I tried to keep it as simple as possible and
take it one piece at a time. At first I thought this would be an easy
approach with using ReactJS, given its modular nature. How wrong I was!
There were numerous times I found myself at an impasse, unable to see
beyond the immediate code/component I was working with. At those times, I
turned to my fellow classmates for words or encouragement, suggestions, and
good old fashioned distractions to take my mind off of things. When I got
well and truly mired, I would compose an issue and submit that to request
instructor assistance.

This has been one of the most challenging experiences I've set for myself,
and in such a short time frame! I've learned a lot about using ReactJS
and Express, and I've learned different techniques for pushing myself to
find the solutions I need.


UNSOLVED PROBLEMS/FUTURE FIXES:

There are a whole heap of things in version 1.0 that I am not satisfied
with. Primarily, the action a user can take to mark a book as "read" does
not stay firm with that book when the page is reloaded. This is something
that is actively being worked on and should be fixed very shortly.

There are some stylstic things that I would like to improve to clean up the
image, such as centering content, organizing the books in a grid, and making
the whole experience feel more bookish than it currently does.

Future iterations of this app will include new buckets for books to be put
into. I'm thinking there should be 4 in total: Wishlist, Owned, Read, and
Blocked. A user should be able to interact with each of these and move items
from one to the other at ease.

I would also like to incorporate GoodReads' API so that my available
offering of books to a user is more than the meagre 346 items that currently
sit on the bookshelves at my house.

SETUP & INSTALLATION INSTRUCTIONS FOR LOCAL CONTRIBUTIONS:

FRONT END:

Fork and clone the front-end repository

Install dependencies with `npm install`

`git add` and `git commit` your changes

Open a pull request for submission

Test locally with a development server with `npm start`

The back-end server will also need to be running

BACK END:

Fork and clone the back-end repository

Install dependencies with `npm install`

Install `nodemon` by running `npm install -g nodemon`

Make certain mongo is running:

-- MAC USERS: `brew services start mongodb`

-- UBUNTU USERS: `sudo service mongod start`

-- WSL USERS: `sudo service mongodb start`

Ensure the API is functioning properly by running `npm run server`

`git add` and `git commit` your changes

Open a pull request for submission

I will update Heroku upon approval of any pull requests, so no need to
worry about that one
