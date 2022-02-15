Feature: Specify number of events

Scenario: When user hasn't specified a number, 32 is the default number
  Given the user hasn't specified a number of events they want to see
  When the user is on the main page
  Then 32 events will be displayed at once

Scenario: User can change the number of events they want to see
  Given the user has specified a number of events they want to see
  When the user specifies a number in the textbox
  Then the specified number of events will be displayed at once
