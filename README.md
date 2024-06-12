# NextGen SportsBet Inc.
## Project developed by
- João Mourão, 102578
- Pompeu Costa, 103294
- Rafael Pinto, 103379
- Ricardo Antunes, 98275

## Documentation

## How Frontend interacts with Backend

### Login/Register

The Login and Register pages makes use of the ```/register``` and ```/login``` endpoints to register user information and authenticate user, respectively.

### Check if user is logged in 

The ```withAuthCheck``` wrapper component ensures that only authenticated users can access certain parts of the application. It verifies the user's login status by making a request to the ```/checkLogIn``` endpoint. If the user is not logged in, they are redirected to the login page.

The following functionalities require authentication:

* Profile Page: Ensures that only logged-in users can view and edit their profiles.
* Bet Checkout Page: Restricts access to the betting checkout process to authenticated users only.
* Add Balance Button on Navbar: The button to add balance should be visible and functional only for logged-in users.






