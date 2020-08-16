Health Passport (Student Side)
====================================

## DESCRIPTION

Health Passport is a system which can guarantee a safer class environment during COVID-19. This repo is
specifically for the student side application. To see the other two platforms (Professor side and Health 
Service side), you can go to

* https://github.com/anamkhan2/HealthTracker_Professor_View
* https://github.com/cs394-s20/HealthServices_View

This mobile app will let students input their temperatures each day, and upload some verification image,
so that professor can decide who is eligible for the class.

* Students can see their health status for today.
* Students can see their temperature over the past week.
* Students can upload their temperatures, check symptoms, upload verification images.


## SYSTEM REQUIREMENTS

- Node v12.16.1
- Pod 1.9.1
- Gem 3.0.3
- Xcode simulator Version 11.5 (921.9.1)
- iPhone 11
- npm 6.14 + (6.14.4 recommended)
- Mac OS (Catalina 10.15.5 +)


## INSTALLATION

The best way to install the React Native App is to follow this link

[https://reactnative.dev/docs/0.60/getting-started]

which includes installing Node, Watchman, the React Native command line interface, and Xcode.

```bash
$ brew install node
$ brew install watchman
$ sudo gem install cocoapods
```

After you set up the environment, now you have to install the packages for the App

Normally the following command would just work fine
```bash
$ npm install .
$ cd ios
$ pod install
```

If there is error, then try the following command

```bash
$ yarn add react-native-image-picker
$ npm install --save rn-fetch-blob
$ grep -rl "s.dependency 'React/Core'" node_modules/ | xargs sed -i '' 's=React/Core=React-Core=g'
$ cd ios
$ pod update
```


## RUNNING

To run navigate to your repository via the
command line, and run the executable:

```bash
$ cd HealthPassportIOS
$ npx react-native run-ios
```

This will start up a app server running the React Native on your Xcode simulator.

## CONFIG FILE

In order to create your own firebase database, you should 
- create a firebase account
- create a project
- create a real time database
- import the firebase_database_schema.json 
- copy the configurations from firebase into ./components/config.js
- create a img/ in firebase storage


## API DOCUMENTATION

The [React Components](https://reactnative.dev/docs/0.60/components-and-apis) allows you to format 
your frontend in a IOS way.


## CONTRIBUTE

If you'd like to contribute to our project, start by forking the repo on GitHub:

https://github.com/cs394-s20/HealthTracker_Student_View

To get all of the dependencies, install the gem first. The best way to get
your changes merged back into core is as follows:

1. Clone down your fork
1. Create a thoughtfully named topic branch to contain your change
1. Hack away
1. If you are adding new functionality, document it in the README
1. Push the branch up to GitHub
1. Send a pull request to the HealthTracker_Student_View project.

## RELEASING

In order to release the project in public, you should have a Apple Developer account.

## FUTURE IMPROVEMENTS

- Also we would recommend using Expo platform to moving the project forward, because we faces a lot
of challenges in using Xcode Platform to perform some features(such as taking an image).
- Before production deployment, it would be ideal to incorporate the Canvas API and Caesar API of
your university.

Refer to [Expo](https://expo.io/)
