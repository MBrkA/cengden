## CENG 495 Cloud Computing - HW1
Mustafa Burak Akkaya - 2396968

## OnRender
[https://four95hw1.onrender.com/](https://four95hw1.onrender.com/)

## Technologies

Backend: NodeJS, Express, MongoDB

Frontend: VueJS, Vite

I chose NodeJS for backend because I have experience with it and it is easy to use thanks to JavaScript's asynchronous nature.

I choose VueJS for frontend because I have quite a lot of experience with it.
This allows me to develop the frontend faster and develop a better user interface.

## How to Use

**Login & Register**: You can login with the provided accounts or register a new account. Link to these pages are given in the header.
After registration, you will receive an email with a verification link. You need to click this link to verify your email. Then you can login with your email and password.

**Listings**: You can see all the listings in the homepage. You can choose a category from the left sidebar. After category selection, you can filter the listings by multiple filters. 

**Listing Details**: You can click on a listing to see its details. You can also favorite a listing by clicking the button. You can also update and (de/re)activate if you are the owner of the listing. Owner and admin can remove the listing.

**Add Listing**: You can add a new listing by clicking the button in the header. First choose a category, then fill the form to add a new listing.

**My Listings**: You can see your own listings in this page.

**My Favorites**: You can see your favorite listings in this page.

**Profile**: You can see your profile information in this page. You can also update your profile information.

**Users**: Admin can see all the users in this page. Admin can also remove users. If a user is removed, all the listings of that user will be removed.

## Accounts

Please do not add new favorites to users except e2396968 which is my account,
in order to prevent email spamming to other people.
```
email - password - role
admin@ceng.metu.edu.tr - 1 - admin
e2396968@ceng.metu.edu.tr - 1 - user
utku@ceng.metu.edu.tr - 1 - user
veli@ceng.metu.edu.tr - 1 - user
ali@ceng.metu.edu.tr - 1 - user
```

## Important Notes

**OnRender**: System shots down after 30 minutes of inactivity. Please wait for a while to wake up the system.

**Email**: I get banned from the SendGrip no matter how many accounts I create. I have to use Postmark for sending emails. I used Postmark to send emails. This account has a limit of 100 emails. I used 10 emails for testing purposes. This service should work fine. But, if you encounter any problems, please let me know. 

-----
## Requirements

* NodeJS (v18.18.0)
* NPM (v9.8.1)

-----

## Backend Dependencies

* body-parser (^1.20.2)
* cors (^2.8.5)
* express (^4.18.3)
* mongodb (^6.5.0)
* postmark (^4.0.2)

## Running the Backend Application

```bash
# move to be folder
$ cd be

# install dependencies
$ npm install

# run the application
$ node index.js
```

-----

## Frontend Dependencies

* pg (^8.10.0)
* axios (^1.6.7)
* crypto-js (^4.2.0)
* element-plus (^2.6.1)
* pinia (^2.1.7)
* vue (^3.4.21)
* vue-router (^4.3.0)
* vite (^5.1.6)

## Running the Frontend Application

```bash
# move to fe folder
$ cd fe

# install dependencies
$ npm install

# run the application
$ npm run dev
```