# PubCrawlin' Frontend README

## Project Overview

Pubcrawlin' is an app to create pubcrawls with a user's group of friends. Users can log in or sign up to view all of their friends, groups and pubcrawls. When a user visits their profile page, they can view their established friendships, their pending friendships and all the users of the sight. They can also accept friend requests and make friend requests. From there, a user can navigate to their group page where they can view groups that they have created(if any) and groups they are already a member of(if any). A user can create a group from their list of friends. With that group, a user can then create a pubcrawl. On the pubcrawl page, a user can search a neighborhood by zip code or neighborhood name and begin adding bars to their pubcrawl.They can view the bars they've added on the map below to make sure that their pubcrawl makes logistic sense. After a pucbrawl is created a user can view that pubcrawl's details back on the group page. 

## Technologies Used

React, Redux, Thunk, Ruby on Rails (Rails API backend), Yelp API, Leaflet, HTML, CSS, JSON, Material UI & GoogleFonts, ActiveModel Serializers, Faker, ‘dotenv-rails’ and other Ruby gems

## Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Prerequisites
To use, clone down this repo and open with your preferred text editor. Before anything else, if you haven’t already, make sure to set up the project backend as well (link below), which will ensure you have the working usable version of Ruby/Rails installed on your machine. This project uses React and requires node package manager, so once you have it open in your local environment, from the root of the project run the following:

`npm install`

terminal command to install dependencies.

### Installing
Once npm is finished installing and you’re back to a working terminal, jump over to the backend project root and run:

`rails s`

to start the server. (From the previous backend set up, should indicate successful connection to server, but to double check, navigate to http://localhost:3000 and make sure you have a “Yay! You’re on Rails!” welcome page). Back in the terminal, run:

`npm start`

and type “yes” or “y” when asked if you’d like to run this server on another port, at which point PubCrawlin' will launch in your browser. You can sign in, sign up as a new user (and sign back in later with same info), view your profile and friends, view and create groups and and view and create pubcrawls. Cheers! 🍻

## Backend Link

[PubCrawlin'-backend](https://github.com/gbellini90/PubCrawlBackEnd)

## Demo Video

[PubCrawlin'](https://youtu.be/rxKEzIz-uek)

## Author

**Gabrielle  Bellini**

≫ gbellini90@gmail.com<br/>
↳ *LinkedIn*: https://www.linkedin.com/in/gabrielle-bellini/<br/>
↳ *GitHub*: https://github.com/gbellini90<br/>
↳ *Blog*: https://medium.com/@gbellini90

## License

This project is licensed under the MIT License - see the [LICENSE.md](/LICENSE) file for details.

