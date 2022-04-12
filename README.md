# Meet

## Overview
"Meet" is a serverless, progressive web application (PWA) with React using a test-driven development (TDD) technique. The application uses the Google Calendar API to fetch upcoming events.

## Live Demo
To check out the live demo of this project, click [here](https://nightorb.github.io/meet/).
<div align="center">
  <img src="https://user-images.githubusercontent.com/89855337/162851083-095132e5-5ac7-4a81-a6fb-671cdb18d59c.png"
       alt="screenshot of meet app welcome page"
       width=45%>
  <img src="https://user-images.githubusercontent.com/89855337/162851099-6739f6c6-2626-484c-8aef-8e0979568078.png"
       alt="screenshot of data visualization"
       width=45%>
  <img src="https://user-images.githubusercontent.com/89855337/162851151-85b4e800-3069-4199-be08-4f258910bc66.png"
       alt="screenshot of city search input"
       width=45%>
  <img src="https://user-images.githubusercontent.com/89855337/162851160-f44d85cb-e0b7-46a1-b18b-00a7a340c342.png"
       alt="screenshot of event details"
       width=45%>
</div>

## Built with
- HTML, CSS, JavaScript
- React
- AWS Lambda
- Serverless
- Google Calendar API
- OAuth2
- Recharts data visualization

## App Features

**Key Features:**
- Filter events by city
- Show/hide event details
- Specify number of events
- Use the app when offline
- Add an app shortcut to the home screen
- View a chart showing the number of upcoming events by city

**Technical Features:** 
- Serverless functions (AWS lambda) for the authorization server
- Works offline or in slow network conditions with the help of a service worker
- API calls with React axios and async/await
- Alert system using an OOP approach to show information to the user
- Data visualization
- Test coverage rate >= 90%
- App monitored with online monitoring tool

## User Stories and Scenarios

### Feature 1: Filter Events by City

#### User Story
As a user, I should be able to filter events by city, so that I can see the list of events that take place in that city.

#### Scenario 1
When user hasn’t searched for a city, show upcoming events from all cities.
  - **Given** user hasn’t searched for any city
  - **When** the user opens the app
  - **Then** the user should see a list of all upcoming events

#### Scenario 2
User should see a list of suggestions when they search for a city
  - **Given** the main page is open
  - **When** user starts typing in the city textbox
  - **Then** the user should see a list of all cities (suggestions) that match what they’ve typed

#### Scenario 3
User can select a city from the suggested list
  - **Given** the user was typing “Berlin” in the city textbox and the list of suggested cities is showing
  - **When** the user selects a city (e.g., “Berlin, Germany”) from the list
  - **Then** their city should be changed to that city (i.e., “Berlin, Germany) and the user should receive a list of upcoming events in that city. The list of suggestions should disappear.

### Feature 2: Show/Hide an Event’s Details

#### User Story
As a user, I should be able to show/hide an event’s details by clicking a button, so that I can view more/less details about an event.

#### Scenario 1
An event element is collapsed by default
  - **Given** the list of events is showing
  - **When** the user doesn’t click anything
  - **Then** each event’s details will be collapsed

#### Scenario 2
User can expand an event to see its details
  - **Given** the user wanted to know more about a certain event
  - **When** the user clicks the “show more” button
  - **Then** the event’s details will be revealed

#### Scenario 3
User can collapse an event to hide its details
  - **Given** the user has expanded the event before
  - **When** the user clicks the “show less” button of the expanded event
  - **Then** the event will collapse to hide its details

### Feature 3: Specify Number of Events

#### User Story
As a user, I should be able to specify how many events I want to see, so that I can manage how many events I see at once.

#### Scenario 1
When user hasn’t specified a number, 32 is the default number
  - **Given** the user hasn’t specified a number of events they want to see
  - **When** the user is on the main page
  - **Then** 32 events will be displayed at once

#### Scenario 2
User can change the number of events they want to see
  - **Given** the user has specified a number of events they want to see
  - **When** the user specifies a number in the textbox
  - **Then** the specified number of events will be displayed at once

### Feature 4: Use the App When Offline

#### User Story
As a user, I should be able to use the app offline, so that I can view events without an internet connection.

#### Scenario 1
Show cached data when there is no internet connection
  - **Given** there is no internet connection
  - **When** the user is using the app
  - **Then** the app will display cached data

#### Scenario 2
Show error when user changes the settings (city, time range)
  - **Given** the user has been using the app offline
  - **When** the user changes the settings
  - **Then** the app will display an error message

### Feature 5: Data Visualization

#### User Story
As a user, I should be able to see a chart with upcoming events, so that I can see how many events there are in each city.

#### Scenario 1
Show a chart with the number of upcoming events in each city
  - **Given** main page is open
  - **When** the user wants to view a chart with upcoming events
  - **Then** the chart will show all upcoming events
