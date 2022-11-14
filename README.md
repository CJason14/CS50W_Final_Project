# CS50W_Final_Project

### Description:

You can apply for Jobs as a Normal User, find the perfect Job for you and see all information you need at once.
On the Profile Page, you can Upload a Profile Picture and change certain data. In the settings, you can change between white and dark mode and change your preferred language. When you applied for an Job and the Company checked it, they can answer you on the chat page and you can talk with them.

### Distinctiveness and Complexity:

The project uses multiple Models, which are connected for some features. In the frontend most of the stuff is javascript, the chat has almost no HTML and is fully written in JS. The project includes a Profile, a Chat function, different Account types and the main function of applying for Jobs. The company can see the CV and all the personalised Data that you have uploaded. Once the company accepted you, you will get a message in the chat tab. If they declined you you will get info once you loaded the page that you have been declined.

### Features:

Settings:
  - Change to Darkmode
  - Change preferred Language

Chats:
  - Apply for Jobs
  - Write with Company

Jobs:
  - Apply for Jobs
  - Find the Job you want

Profile:
  - Change your Profile Picture
  - Change Personal Data
  - Upload your CV

Company:
  - Upload new Jobs
  - See CV of people that applied
  - Change Company Description

### Design:

Dark
  - Simple Dark Design
  - Purple Accents

White
  - Standard White Design

Mobile
  - Other Scripts for Mobile
  - Complete new Design for Mobile

## Files:

### CSS-Files:
  - CSS Folder for normal CSS Design
  - Dark CSS Folder for Custom Dark Mode
  - Light CSS Folder for Custom White Mode

### HTML-Files:

### JS-Files:
  - applications.js -> loads all applications that a company receives
  - chat.js -> loads the text messages, posts them and is used for mobile design
  - jobs.js -> loads the jobs for the homepage
  - settings.js -> controls the setting and could change them without reload
  - info.js -> shows pop-up if you have been accepted or declined for an job

### How to run:
  1. !! The database is needed for the translation !!
  2. Install all requirements
  3. python manage.py makemigrations Job
  4. python manage.py migrate
  5. python manage.py runserver


## Author
- [@CJason14](https://github.com/CJason14)
