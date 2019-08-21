# Airbnb_more_homes

module: More homes you may like

CRUD API Documentation:

API Endpoints

| Request |      Endpoint      | Input  |          Output          |                      Description                      |
| ------- | :----------------: | :----: | :----------------------: | :---------------------------------------------------: |
| GET     | /MoreHomes/:homeID | homeID | listings for that homeID |           get all listings for that homeID            |
| POST    | /MoreHomes/:homeID |        |     Status code:201      | add a new homeID to joined table, update relationship |
| DELETE  | /MoreHomes/:homeID | homeID |     Status code:200      | remove a listing for that homeID, update relationship |
