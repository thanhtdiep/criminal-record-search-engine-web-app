# Criminal Record Search Engine Web Application (CAB230 Web Computing Assignment)

## Objectives:
- Introduce you to full web application development – both client and server side 
- Provide experience in querying REST APIs and manipulating the results
- Provide experience in developing modern client applications 
- Introduce you to developing modern data oriented REST APIs 
- Provide experience in exposing a SQL database source as a REST API 
- Provide experience in authentication and security  
- Provide experience with application deployment 
- Provide  experience  with  modern  web  technologies  including  JS,  React,  Node.js  and  MySQL. 

## Requirements: 
### Client Side 
- /register (POST) – Register using email and password 
- /login (POST) – Logging into your account using the details provided. This allows access to authenticated routes via a JSON Web Token.  
- /offences (GET) –  returns  an  array  of  offences  recorded.  (Open  endpoint). 
- /search?offence=xxx (GET) – The primary search route. Note that query params need to be url encoded. (Requires authentication). 
- /search?offence=xxx&filter=yyy (GET)

### Server Side
#### Step 1: 
Create an Express App using express generator. You should initially serve these pages via HTTP, leaving consideration of HTTPS until later. You should expose the site and establish the  routes  needed  for  the  application without  spending  too  much  time  on  the  application  functionality.  You  may  organise  these  routes  as  you  see  fit,  but  we  expect  to  see  sensible  application structure and use of routers to handle related tasks. Applications in which all of the routes are handled from app.js will not be viewed favourably by the markers.  

#### Step 2:
Having  created  an  application  and  ensured  that  the  routing  is  handled  successfully,  you should now replace these temporary logging statements with the requirements of each of  the  API  endpoints.  Most  of  the  information  endpoints  correspond  to  simple  SELECT  *  queries and these are a good point to begin. It is sensible to proceed as follows: 
- Implement responses for the information endpoints – GET 
- Implement responses for the authentication endpoints – POST 
- Implement the basic /search endpoint without filtering or authentication 
- Add filtering to the search endpoint 

#### Step 3:
Having  created  a  working  application  deployed  via  HTTP,  you  should  migrate  the  application  to  serve  on  HTTPS  via  localhost  using  a  self-signed  certificate. 

#### Step 4:
Final deployment of your system prior to assessment.






