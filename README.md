

# Table of Contents 
[Project Description](#project-description)

[Project Key Features](#project-key-features)

[Backend API service](#backend-api-service)

[Technologies Used](#technologies-used)

[Contributors](#contributors)


# Project Description

PAGER is a social app for ravers to connect and share experiences. The app allows users to join groups, discover upcoming events, make new friends, and chat with fellow ravers. With PAGER, you can easily find like-minded people to attend events with, join groups based on your music preferences, and even plan your own events. 

I collaborated with 6 other engineers created this app from conception to implementation, testing and deployment.

My main responsibilities in this project includes 
- Creation backend API services which supports 70% of platform's feature includes Homepage Module, All Group Module and Individual Group Module
- UI Design + Improvement
- Creation of detailed API documentation for frontend modules
- Implementation of data binding and filter for Homepage Module
- Tech lead for technical decision making and daily debugging


## Project Key Features

### Firebase Services
- Our team decided to use Firebase as it offered a wide variety of services for our product that can be easily integrated in our application such as real-time databases using Firestore, login and register account pages using Firebase Authentication , Real-time chat messages using Cloud Messaging and the ability to upload photos using Cloud Storage.

### Login
<img src="https://github.com/palmigloo/PAGER/assets/3084586/45ff903f-1466-4eef-bb6a-893ef97c8587" width="250" /> <img src="https://github.com/palmigloo/PAGER/assets/3084586/413291d4-d6f6-4f4b-904c-5f4f65b55f03" width="240" /> <img src="https://github.com/palmigloo/PAGER/assets/3084586/1a9cc4f3-aaa5-4c5e-a4d0-9d2ae12c74a9" width="238" />
- Utilized Firebase Authentication for user sign in and sign up
- Managed authentication screen stack flow for global state for authenticated users
- Sign up user and corresponding data points in Firebase Firestore with information and profile image

### User Profile
<img src="https://github.com/palmigloo/PAGER/assets/3084586/a5d66789-4fc9-4cb1-a409-d677bf563b5e" width="253" /> <img src="https://github.com/palmigloo/PAGER/assets/3084586/342d41b8-0a6a-4225-9b33-e1d6f1325fd3" width="250" /> <img src="https://github.com/palmigloo/PAGER/assets/3084586/4ed41495-2649-4607-9475-1d27aaa7b7fb" width="250" />
- Main page showing the details of the signed-in user
- Expanded view of friends and music tastes
- Edit page to edit music tastes and description

### Homepage
<img src="https://github.com/palmigloo/PAGER/assets/3084586/f15149e1-3a49-44d9-8e40-767d1ca8f355" width="250" /> <img src="https://github.com/palmigloo/PAGER/assets/3084586/314ecd52-ce08-4397-aa2d-5e1dd2877821" width="248" /> <img src="https://github.com/palmigloo/PAGER/assets/3084586/ba02e68d-9b7f-4c62-ae74-e32af6520d00" width="253" /> 

- Swipe cards displaying groups attending events. Swipe right to join or left to pass.
- Card expanded view, showing additional information about the group.
- Filter cards based on size and vibe.

### Groups
### All Groups
<img src="https://github.com/palmigloo/PAGER/assets/3084586/9b15096a-d66a-4d83-99cd-70dddad0bb2f" width="250" /> <img src="https://github.com/palmigloo/PAGER/assets/3084586/267d6d7a-6f13-4054-b8b0-11e4f02e9f89" width="248" />
- Tabular design to view a user’s upcoming and attended groups
- Tab for user to create their own group and upload group images

### Individual Groups
<img src="https://github.com/palmigloo/PAGER/assets/3084586/ba02e68d-9b7f-4c62-ae74-e32af6520d00" width="250" />  <img src="https://github.com/palmigloo/PAGER/assets/3084586/11af9fe7-4e89-4368-9dc7-b8035d515dfe" width="250" /> <img src="https://github.com/palmigloo/PAGER/assets/3084586/62dc5236-ada6-454c-8bfa-4be012017c24" width="253" /> 
- Overview of group details with members and brief schedule
- Full schedule list where owner has the ability to add/delete plans
- Each group has their own chatroom to discuss plans for their event within their group

# Backend API service
This is an overview of the API services I created to support Homepage, All Groups and Individual Group Module

### Groups & Chat: 

 - #### Get all groups info for a specific event
    ``` getGroupsPerEvent(event_id)   ```
 
 - #### Get all the pending request for a specific group
	 ``` getPendingRequestPerGroup(group_id) ```
 
  - #### Get all member info for a specific group
	 ``` getGroupsPerUser(user_id) ```
     
  - #### Get all attended groups info for a specific user
	 ``` getGroupsAttendedPerUser(user_id) ```
     
  - #### Get all upcoming groups info for a specific user
	 ``` getGroupsUpcomingPerUser(user_id) ```
     
  - #### Get all members for a specific group
	 ``` getGroupMembers(group_id) ```
  
   - #### Create a new group with all the infos
	 ``` createGroup(formdata, organizer_id) ```
     
   - #### User requests to join a group
	 ``` sendRequestToGroup(user_id, group_id) ```
     
  - #### Group own invites friends to join his group
	 ``` invitePeopleToGroup(user_id, group_id) ```
     
  - #### Get all chat message for a specific group
	 ``` getChatMsgsPerGroup(group_id) ```
     
  - #### Add chat message for a specific group
	 ``` addChatMsg(formdata) ```
  
   - #### Approve a user's join request 
	 ``` acceptInGroup(user_id, group_id) ```
     
   - #### Get schedule for a specific group
	 ``` getGroupPlans(group_id) ```

   - #### Add a new plan to the schedule for a specific group 
	 ``` addPlan(group_id, form_data) ```
     
   - #### Delete a plan from schedule for a specific group
	 ``` deletePlan(group_id, plan_id) ```
	 

### Installation
  To **build** and install all the dependencies
```
  npm install 
```

  To start
 ```
  expo start
```

## Technologies Used

Frontend 

- React Native
- Redux
- JavaScript

Backend 

- Firebase
    - Authentication
    - Firestore
    - Cloud Messaging
    - Cloud Storage

![https://img.shields.io/badge/React%20Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB](https://img.shields.io/badge/React%20Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) ![https://img.shields.io/badge/Express.js-404D59?style=for-the-badge](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge) ![https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) ![Firebase](https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black)

## Contributors
- Abigail Li [@palmigloo]([https://github.com/palmigloo](https://github.com/palmigloo))
- Simon Buret de Longagne [@SimonBdeL]([https://github.com/SimonBdeL](https://github.com/SimonBdeL))
- Andrew Heim [@andepants]([https://github.com/andepants](https://github.com/andepants))
- Madeline King [@maddieking02]([https://github.com/maddieking02](https://github.com/maddieking02))
- Charlie Um [@charlieum]([https://github.com/charlieum](https://github.com/charlieum))
- Joshua Vilela [@joshuavilela]([https://github.com/joshuavilela1](https://github.com/joshuavilela1))
- Jeffrey Zhang [@Jeffreyzhangsd]([https://github.com/Jeffreyzhangsd](https://github.com/Jeffreyzhangsd))
<br />
<p align="center">
<a href="https://github.com/palmigloo"><kbd><img width="125" alt="Abigail" src="https://user-images.githubusercontent.com/3084586/214108734-a204be6c-9982-4d42-88e7-9abbc1ff2eb0.png"></kbd></a>
<a href="https://github.com/SimonBdeL"><kbd><img width="125" alt="Simon" src="https://user-images.githubusercontent.com/3084586/214108755-16d2f668-e287-4c70-9bfb-86257a4bc793.png"></kbd></a>
<a href="https://github.com/andepants"><kbd><img width="125" alt="Andrew" src="https://user-images.githubusercontent.com/3084586/214108759-991fb017-2303-4405-8f9b-0231f0e4ade0.png"></kbd></a>
<a href="https://github.com/maddieking02"><kbd><img width="125" alt="Madelline" src="https://user-images.githubusercontent.com/3084586/214108752-cdd3984e-8ceb-4a91-a412-48eae18aac27.png"></kbd></a>
<a href="https://github.com/charlieum"><kbd><img width="125" alt="Charlie" src="https://user-images.githubusercontent.com/3084586/214108745-9dff6439-8d59-4e23-b6d2-29da44166915.png"></kbd></a>
<a href="https://github.com/joshuavilela1"><kbd><img width="125" alt="Joshua" src="https://user-images.githubusercontent.com/3084586/214108740-2ab3e842-b2b4-4549-97b6-6a454d3c8a3c.png"></kbd></a>
    <a href="https://github.com/JeffreyZhangsd"><kbd><img width="125" alt="Jeffrey" src="https://user-images.githubusercontent.com/3084586/214108748-ef7355bb-6e70-42f0-bcc7-5f03a518ad63.png"></kbd></a>
</p>
