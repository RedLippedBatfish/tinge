# tinge
Find most prominent colors in any image.

### Application flow
<img src="https://preview.ibb.co/hEUYJU/tinge.png" alt="tinge" border="0">

### Notes for future iterators
- Run npm install first.
- Create .env file in root directory and add DB_URI with connection string to m-labs and SECRET for generating JWT tokens.
- Make sure to use your machine's IP address on the network instead of localhost when making fetch request to backend. expo has its own localhost, it's named the same but it's actually a different hostname.
- Server is running on port 8080.


### Notes on getting started with Expo
-install expo app from app store on phone
-install create react native app
  '$ npm i -g create-react-native-app'
-install package dependencies in client folder then start server
  -'$ npm install'
  -'$ npm start'
-terminal will display options with qr code to view app from expo
  -email or texting a link option worked well
