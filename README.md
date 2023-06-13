# Conjure Seed Builder

This application's sole use is to build seed data that can be dumped into a mySQL database (built by another program not public on my github) for an app I am working on.

Without the full app, this seed file is fairly useless but I good indicator of my code stylings. 

## What this seed builder does

Using axios, this app pulls data from the *Dungeons & Dragons* [5e API](https://www.dnd5eapi.co/), a public API that returns data for for the popular TTRPG that Wizards of the Coast consider free use (so long as users/creators follow their guidelines). This app pulls all the data available for items from the game, which my full application will use as a basis for users. The full app is an inventory manager for *Dungeons and Dragons* that allows players and game masters to manage character inventories using both this seed data and their own creations. 

The 5e API is great and thourough, but because it is non-relational I need to duplicate the data so I can make sure collumns aren't ommitted. Examples of raw JSON data pulled from the api can be found [here](sample-data-from-5eapi).

Additionally, my app will organize data entirely differently, and does a few things the source material, the public API, and other apps do not (i.e. linking magic weapons with their base weapon stats, assigning weights to items that aren't listed despite having a weight in their description, etc.) This program also preps descriptions in the style my app uses (I allow special syntax in my app to do things such as adding tables, lists, as well as formatting text.)

## Using this application

Again, this really shouldn't be used, but for funsies it's easy. This whole app is built in NodeJS. ```npm install``` will install the required dependencies (axios, and dotenv though I'm not actually using dotenv in this public branch). ```node seedBuilder.js``` will run the script, and that's it.