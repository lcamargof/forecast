## Simple Forecast App

### Setup

- `npm start` to bootstrap the application into `localhost:3000`
- `npm build` to build the production code into the `/build` folder
- `npm test` to run the unit tests using Jest

### Libraries used

- Used `react-create-app` for this react application
- `material-ui` for the basic components
- `Chart.js` to display the charts easy and simple
- `Express 5` server to store the user history


#### - Notes
Every tool was used with the objetive of reducing boilerplate and develop this app quicker and prettier.
The exception here is the use of Express to store the history, I could have used a simpler solution to just store the history (like firebase for example, or just store the history in the localStorage), I choose Express because it was one of the requirements for the position.