# Blogify


## Introduction

This is a pet project I developed while learning Django Rest Framework. It replicates the functionalities of a real-world blog platform, including:

- CRUD operations for posts and authors
- Liking and commenting on posts
- Personal profile pages for each user
- Categorizing posts into various categories
- Searching for posts and authors
- Leaderboards for both posts and authors

Additionally, I have integrated new features such as:

- A chat lobby for user interactions
- Notifications for users to receive updates on interactions with their posts
- Security features including password recovery via email and account activation through email

Please note that this project is a basic implementation and contains various shortcomings and potential bugs, as it is primarily a learning exercise for Django Rest Framework. For a more polished and comprehensive source code example, you can refer to my school attendance support website project here: [PBL04_DUT_student-checkin-system](https://github.com/tranductri2003/PBL04_DUT_student-checkin-system).

## How the System Works
### System Overview:
1. **Server**
   URLs directed to the domain lqdlover.ddns.net will be redirected by Nginx to various servers running locally on the Raspberry (currently I have turned off the server). This includes two Backend servers running Django code to handle APIs for database queries linked together in a load balancing Cluster and a WebSocket server running Django code to handle operations related to WebSocket connectivity (chat), and a Frontend server running ReactJS code to create a user interaction interface for the website.

   - First Backend Server: Uses Django Framework to handle incoming APIs (port 8000) and placed in the NLB backend cluster.
   - Second Backend Server: Uses Django Framework to handle incoming APIs (port 8001) and also placed in the NLB backend cluster.
   - WebSocket Server: Uses Django Framework to handle WebSocket connectivity operations (port 8002).
   - Frontend Server: Uses ReactJS library to create the user interface.

2. **Admin Client**

   The Admin interface can be accessed at [Admin Login URL](https://lqdlover.ddns.net/admin/login/?next=/admin/). This interface provides administrators with comprehensive control over the system. Key functionalities include:

   - **Article and Category Management**: Efficiently manage articles and categories with CRUD operations..
   - **User Engagement Metrics**: Track and manage views, likes, comments and notifications on articles..
   - **Chat Room Management**: Facilitate real-time communication through chat rooms, allowing users to engage in discussions.
   - **User Management**: Admins also have the privilege to access the User Client interface for a more visual representation of user data, authentication, information,...

3. **User Client**

   The primary interface for teachers and students is available at [LQDLover Main URL](https://lqdlover.ddns.net/). User-friendly and easy-to-use web interface:

   - **View the list of articles**
   - **View detailed articles with various article interactions**
   - **User’s personal page**
   - **Chat lobby**

   This is just a small project of mine while learning Django. If you want to refer to a complex project with detailed reports on the network system as well as the Backend, you can refer to the project at this [DUTChecker](https://github.com/tranductri2003/PBL04_DUT_student-checkin-system/blob/main/README.md)



## Installation

We welcome you to install and try out our program.

After cloning my project from GitHub, you will need to set up both the BackEnd and FrontEnd to run the project.

### BackEnd Setup:

1. Refer to the `sample-backend-env.txt` file and modify it with your parameters, then place it into the `core` folder of the BackEnd.
2. Set up a virtual environment and install the required libraries as specified in the `requirements.txt` file.
3. Start the BackEnd server using the command:
   ```sh
   python manage.py runserver

### FrontEnd Setup:
1. Refer to the `sample-frontend-env.txt` file and modify it with your parameters, then place it into FrontEnd folder.
2. Install the necessary libraries for React.js using the command:
   ```sh
   npm install
3. Start the FrontEnd server using the command:
   ```sh
   npm start

Here is the directory structure of the project after successful installation:


![image](https://github.com/tranductri2003/My-Blog_DRF-REACT/assets/89126960/99e2e4e7-8f34-4d95-8da0-76c5b0c38fbb)

Feel free to contact me if you would like to learn more about how to install and deploy this project.

## Quick View of the Project
- Interface homepage:
![image](https://github.com/tranductri2003/My-Blog_DRF-REACT/assets/89126960/66e015cf-21f1-4206-bda9-f0cb8e3c6979)
- Post interface:
![image](https://github.com/tranductri2003/My-Blog_DRF-REACT/assets/89126960/4c1eac07-5b0a-4c45-a25d-8c97d8f091b5)
- User profile interface:
![image](https://github.com/tranductri2003/My-Blog_DRF-REACT/assets/89126960/b4ab0d49-a0b6-4cec-bd0b-caa72663cac8)
- Chat lobby:
![image](https://github.com/tranductri2003/My-Blog_DRF-REACT/assets/89126960/616e748f-f514-46ed-9530-b8a4a5f4c142)
- Leaderboard:
![image](https://github.com/tranductri2003/My-Blog_DRF-REACT/assets/89126960/115bfd9c-2d8c-4284-a049-71863778f68f)
- Notification:
![image](https://github.com/tranductri2003/My-Blog_DRF-REACT/assets/89126960/2c2ea790-f154-47d1-8048-6673ca6e0e22)
## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Feedback

Your feedback is highly appreciated. If you have any suggestions or encounter any issues while using the solver, feel free to reach out to me.

## Credits

- **Developer**: Trần Đức Trí
- **Email**: tranductri2003@gmail.com

### Connect with Me
- **Github:** [tranductri2003](https://github.com/tranductri2003)
- **Facebook:** [Trần Đức Trí](https://www.facebook.com/tranductri2003/)
- **LinkedIn:** [Duc Tri Tran](https://www.linkedin.com/in/duc-tri-tran-464343218/)
- **Github:** [phatdtvdvt](https://github.com/phatdtvdvt)
- **Facebook:** [Phạm Nguyễn Anh Phát](https://www.facebook.com/phamnguyenanhphat)
- **LinkedIn:** [Phát Phạm](https://www.linkedin.com/in/phat-pham-327aa1220/)
