sequenceDiagram
  participant user
  participant browser
  participant server

  user->>browser: writes something in the form's input and clicks save

  browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note with note text
  activate server

  Note left of server: The server starts executing the JavaScript code that saves the new note content (on the request's body) into the database

  server-->>browser: HTTP Response 302 asking browser to redirect to location /exampleapp/notes
  deactivate server
  
  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
  activate server
  server-->>browser: HTML document
  deactivate server

  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
  activate server
  server-->>browser: CSS file
  deactivate server

  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
  activate server
  server-->>browser: JavaScript file
  deactivate server

  Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
  activate server
  server-->>browser: [ {content: "KKona Howdy", date: "2024-12-19T03:26:34.592Z"}, ... ]
  deactivate server

  Note right of browser: The browser executes the callback function that renders the notes