# Betting WebApp
This project was developed within the scope of a university project.

The goal was to develop a simple webapp simulating a betting website.

## Documentation

## How Frontend interacts with Backend

### Login/Register/Logout

The Register and Login pages makes use of the ```/register```, ```/login``` and ```/logout``` endpoints to register user information, authenticate user and logout user, respectively.

### Check if user is logged in 

The ```withAuthCheck``` wrapper component ensures that only authenticated users can access certain parts of the application. It verifies the user's login status by making a request to the ```/checkLogIn``` endpoint. If the user is not logged in, they are redirected to the login page.

The following functionalities require authentication:

* Profile Page: Ensures that only logged-in users can view and edit their profiles.
* Bet Checkout Page: Restricts access to the betting checkout process to authenticated users only.
* Add Balance Button on Navbar: The button to add balance should be visible and functional only for logged-in users.

### Live Event Updates

The application fetches live games and odds information using the ```/getLiveData``` and ```/getLiveEventOdds``` endpoints, respectively. This data is initially retrieved when the user enters the Home page and is updated in real-time through MQTT messages on the ```live-update``` topic.

### Mosquitto MQTT configuration

In order to MQTT work it is needed to add these lines to the Mosquitto configuration file (mosquitto.conf):
```
listener 1883
protocol mqtt
allow_anonymous true

listener 9001
protocol websockets
allow_anonymous true
```
These lines sets up a listener on port 1883 for standard MQTT protocol, sets up a listener on port 9001 for WebSocket connections and allows anonymous connections.

### Create Bets

On the Bet Checkout page, users can place bets by submitting their predictions, the amount they want to bet, and the fixture ID. This data is sent to the ```/createBet``` endpoint to create a new bet.

### Wallet Management

There are three endpoints to interact with the wallet:
* ```/withdraw```: allow user to withdraw money from the wallet.
* ```/deposit```: allow user to deposit money in the wallet.
* ```/checkBalance```: allow user to check is wallet balance.

### User Information on Profile Page

On profile page it is displayed the user information and their active bets using ```/getUserInfo``` and ```/getBets``` endpoints, respectively.

## Simulate Live Events

The API we were using to retrieve real life events stopped working and started asking for a credit card, so in order to simulate live events update we created the ```/simulateDummyData``` endpoint.
We can use this endpoint to toggle a boolean state variable that updates game information accordingly. Based on the state, the game data is modified to reflect changes earlier (when true) or later (when false) in time.






