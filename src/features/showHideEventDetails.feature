Feature: Show/hide an event's details

Scenario: An event element is collapsed by default
  Given the list of events is showing
  When the user doesn't click anything
  Then each event's details will be collapsed

Scenario: User can expand an event to see its details
  Given the user wanted to know more about a certain event
  When the user clicks the “show more” button
  Then the event's details will be revealed

Scenario: User can collapse an event to hide its details
  Given the user has expanded the event before
  When the user clicks the “show less” button of the expanded event
  Then the event will collapse to hide its details
