## World Universities App
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

A React Native app that provides users with information of thousands of top Universities around the World.

### Features
- Users can search for institutions by their names or by the countries in which they are.
- Users can visit the official websites of these institutions. 
- Users can also add/remove institutions as favourites.
- Users can make a suggestion for a University to be added to the app. 

### Download from Google Play Store
https://play.google.com/store/apps/details?id=com.princewilliroka.worlduniversitiesapp

### App User Interface

![Home Screen](https://imgur.com/KOn6bgw.png)
![Nav Menu](https://imgur.com/omN4L2E.png)

![Suggestions](https://imgur.com/994OZCB.png)
![Favourites](https://imgur.com/n036bLQ.png)

### API
Information is gotten from this API https://github.com/PrincewillIroka/World-Universities-API

### Usage and Setup
- Clone this repo. Go into the root folder and run *yarn* to install the dependencies.
- Create a .env file in the root folder of this project.
- Go to http://api.ipstack.com, and get a free access key.
- Set the access key you got as ACCESS_KEY in .env file.
- Clone the API from https://github.com/PrincewillIroka/World-Universities-API and run *yarn* to install the dependencies.
- Create a .env file in the root folder of the API you just cloned.
- In the .env file for the API, set NODE_ENV either as 'dev' or 'production' depending on your environment and set PORT too e.g 4500
- Run *yarn start* to start the server (API). 
- Go back to the .env file in the root folder of this project and set API key to the url of your server e.g API=http://localhost:4500
- Connect your machine to a mobile device or emulator and run *yarn start* to see the app. 

### Note
This app is intended for informational purposes only, you could still make a proper search online for any information you find here.

### Like this project?
Don't forget to star :star2: this repo.

### Want to contribute or need to see some improvements?
I would love that, please create an issue or send a PR.

### License
Copyright 2020 **Princewill Iroka**

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
