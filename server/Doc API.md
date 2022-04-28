# My Movies App Server
My Assets App is an application to manage your movie. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints

### Create Movie

> Create movie based on specified req.body inputs. User Id will be assigned automatically based on the creator's Id.

_URL_
```
http://localhost:3000/movies
```
_Method_
```
POST
```

_URL Paramas_
```
None
```

_Request Headers_
```
{
  "access_token" : "<JWT_TOKEN>"
}
```

_Request Body_
```
{
    "title": "<movie title for input>",
    "synopsis": "<movie synopsis for input>",
    "trailerUrl": "<movie trailerUrl for input>",
    "imgUrl": "<movie imgUrl for input>",
    "rating": "<movie rating for input>",
    "genreId": "<movie genreId for input>",
    "authorId": "<movie authorId for input>",
    "status": "active",
}
```

_Response (201) - Created_
```
{ 
  "movie": {
        "id": 2,
        "title": "The Batman",
        "synopsis": "Batman ventures into Gotham City's underworld when a sadistic killer leaves behind a trail of cryptic clues. As the evidence begins to lead closer to home and the scale of the perpetrator's plans become clear, he must forge new relationships, unmask the culprit and bring justice to the abuse of power and corruption that has long plagued the metropolis.",
        "trailerUrl": "https://www.youtube.com/embed/mqqft2x_Aa4",
        "imgUrl": "https://awsimages.detik.net.id/community/media/visual/2022/03/01/the-batman-2.jpeg?w=700&q=90",
        "rating": 8,
        "genreId": 2,
        "status": "active",
        "authorId": 2,
        "updatedAt": "2022-03-30T18:47:14.521Z",
        "createdAt": "2022-03-30T18:47:14.521Z"
    },
    "data": {
        "id": 2,
        "MovieId": 2,
        "title": "The Batman",
        "description": "new movie with is 2 created",
        "updatedBy": "acong@mail.com",
        "authorId": 2,
        "updatedAt": "2022-03-30T18:47:14.524Z",
        "createdAt": "2022-03-30T18:47:14.524Z"
    }
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Title is required"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
---

### Get All Movies

> View all available movie in database.

_URL_
```
http://localhost:3000/movies
```
_Method_
```
GET
```

_URL Paramas_
```
None
```

_Request Headers_
```
{
  "access_token" : "<JWT_TOKEN>"
}
```

_Request Body_
```
Not needed
```

_Response (200)_
```
{
   "movies": [
        {
            "id": 1,
            "title": "Spider-Man: No Way Home",
            "synopsis": "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear, forcing Peter to discover what it truly means to be Spider-Man",
            "trailerUrl": "https://www.youtube.com/embed/JfVOs4VSpmA",
            "imgUrl": "https://m.media-amazon.com/images/M/MV5BZWMyYzFjYTYtNTRjYi00OGExLWE2YzgtOGRmYjAxZTU3NzBiXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_FMjpg_UX1000_.jpg",
            "rating": 8,
            "genreId": 2,
            "authorId": 1,
            "status": "active",
            "createdAt": "2022-03-30T18:46:31.941Z",
            "updatedAt": "2022-03-30T19:11:55.661Z",
            "Genre": {
                "id": 2,
                "name": "Action",
                "createdAt": "2022-03-30T18:46:31.930Z",
                "updatedAt": "2022-03-30T18:46:31.930Z"
            },
            "User": {
                "id": 1,
                "username": "tomHolland",
                "email": "tomholland@gmail.com",
                "password": "$2a$10$qExGZ8hL01XO3e//iY9ik.dLJbSvKvwhCsEn.tJlMFy5mPiccD7Ti",
                "role": "admin",
                "phoneNumber": "0823",
                "address": "UK",
                "createdAt": "2022-03-30T18:46:31.954Z",
                "updatedAt": "2022-03-30T18:46:31.954Z"
            }
        }
}
```
_Response (400 - "Bad Request")_
```
{
  "message": "SequelizeValidationError""
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Bad Request"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---

### Get Movie By Id

> Get available movie based on params id

_URL_
```
http://localhost:3000/movies/:id
```
_Method_
```
GET
```

_URL Paramas_
```
Movies Id AS id
```

_Request Headers_
```
{
  "access_token" : "<JWT_TOKEN>"
}
```

_Request Body_
```
Not needed
```

_Response (200)_
```
[
  "movie": {
        "id": 1,
        "title": "Spider-Man: No Way Home",
        "synopsis": "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear, forcing Peter to discover what it truly means to be Spider-Man",
        "trailerUrl": "https://www.youtube.com/embed/JfVOs4VSpmA",
        "imgUrl": "https://m.media-amazon.com/images/M/MV5BZWMyYzFjYTYtNTRjYi00OGExLWE2YzgtOGRmYjAxZTU3NzBiXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_FMjpg_UX1000_.jpg",
        "rating": 8,
        "genreId": 2,
        "authorId": 1,
        "status": "active",
        "createdAt": "2022-03-30T18:46:31.941Z",
        "updatedAt": "2022-03-30T19:11:55.661Z"
    }
]
```

_Response (404 - "Not Found")_
```
{
  "message": "Movie Not Found""
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---
### Update Movie

> Update all parameters/properties on specified movie based on paramas id

_URL_
```
http://localhost:3000/movies/:id
```
_Method_
```
PUT
```

_URL Paramas_
```
Movies Id AS id
```

_Request Headers_
```
{
  "access_token" : "<JWT_TOKEN>"
}
```

_Request Body_
```
Not needed
```

_Response (200)_
```
[
  "dataHistory": {
        "id": 3,
        "MovieId": 2,
        "title": "The Batmann",
        "description": "Movie with is 2 update",
        "updatedBy": "acong@mail.com",
        "authorId": 2,
        "updatedAt": "2022-03-30T18:48:33.682Z",
        "createdAt": "2022-03-30T18:48:33.682Z"
    }
]
```
_Response (400 - "Bad Request")_
```
{
  "message": "SequelizeValidationError""
}
```

_Response (404 - "Not Found")_
```
{
  "message": "Movie Not Found""
}
```
_Response (403 - "Forbidden")_
```
{
  "message": "Forbidden"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---
### Delete Movie

> Delete specified movie based on params id

_URL_
```
http://localhost:3000/movies/:id
```
_Method_
```
DELETE
```

_URL Paramas_
```
Movies Id AS id
```

_Request Headers_
```
{
  "access_token" : "<JWT_TOKEN>"
}
```

_Request Body_
```
Not needed
```
_Response (200)_
```
{
"history": {
        "id": 17,
        "MovieId": 2,
        "title": "The Batman",
        "description": "Movie with id 2 permanently deleted",
        "updatedBy": "acong@mail.com",
        "authorId": 2,
        "updatedAt": "2022-03-30T18:39:15.752Z",
        "createdAt": "2022-03-30T18:39:15.752Z"
    }
}
```

_Response (404 - "Not Found")_
```
{
  "message": "Movie Not Found""
}
```
_Response (403 - "Forbidden")_
```
{
  "message": "Forbidden"
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---
### Status Movie

> Update status movie by id

_URL_
```
http://localhost:3000/movies/:id
```
_Method_
```
PATCH
```

_URL Paramas_
```
Movies Id AS id
```

_Request Headers_
```
{
  "access_token" : "<JWT_TOKEN>"
}
```

_Request Body_
```
"status": "<status to updated>"
```
_Response (200)_
```
{
            { 
                "id": 1,
                "title": "Spider-Man: No Way Home",
                "synopsis": "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear, forcing Peter to discover what it truly means to be Spider-Man",
                "trailerUrl": "https://www.youtube.com/embed/JfVOs4VSpmA",
                "imgUrl": "https://m.media-amazon.com/images/M/MV5BZWMyYzFjYTYtNTRjYi00OGExLWE2YzgtOGRmYjAxZTU3NzBiXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_FMjpg_UX1000_.jpg",
                "rating": 8,
                "genreId": 2,
                "authorId": 1,
                "status": "active",
                "createdAt": "2022-03-30T18:46:31.941Z",
                "updatedAt": "2022-03-31T15:42:04.059Z"
            } 
}
```

_Response (404 - "Not Found")_
```
{
  "message": "Movie Not Found""
}
```

_Response (403 - "Forbidden")_
```
{
  "message": "Forbidden"
}
```

_Response (400 - "Bad Request")_
```
{
  "messages": [
	  "status must be either active, inactive or archived"
	]
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

----
### Get All History

> View all History in database.

_URL_
```
http://localhost:3000/histories
```
_Method_
```
GET
```

_URL Paramas_
```
None
```

_Request Headers_
```
{
  "access_token" : "<JWT_TOKEN>"
}
```

_Request Body_
```
Not needed
```

_Response (200)_
```
{
  {
            "id": 1,
            "MovieId": 1,
            "title": "Spider-Man: No Way Home",
            "description": "Movie with is 1 has been update frome active into inactive",
            "authorId": 1,
            "updatedBy": "acong@mail.com",
            "createdAt": "2022-03-30T18:46:49.774Z",
            "updatedAt": "2022-03-30T18:46:49.774Z",
            "User": {
                "username": "tomHolland",
                "email": "tomholland@gmail.com",
                "role": "admin"
            },
            "Movie": {
                "id": 1,
                "title": "Spider-Man: No Way Home",
                "status": "active",
                "authorId": 1
            }
        }
}

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---
### Register Admin

> Register User with role "Admin"

_URL_
```
http://localhost:3000/users/register
```
_Method_
```
POST
```

_URL Paramas_
```
Not needed
```

_Request Headers_
```
{
  "access_token" : "<JWT_TOKEN>"
}
```

_Request Body_
```
{
    "username": "<username>",
    "email": "<email>",
    "password": "<password>",
    "phoneNumber": "<phone number>",
	  "address": "<address>
}
```
_Response (201)_
```
{
	  "id": 3,
    "email": "admin@mail.com"
}
```
_Response (400 - "Bad Request")_
```
{
  "messages": [
		"Username is required",
		"Email is required",
		"Password is required",
		"Password length minimum 5"
	]
}
```

_Response (404 - "Not Found")_
```
{
  "message": "Movie Not Found""
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---
### Login User & Admin

> Login User & Admin

_URL_
```
http://localhost:3000/users/login
```
_Method_
```
POST
```

_URL Paramas_
```
Not needed
```

_Request Headers_
```
{
  "access_token" : "<JWT_TOKEN>"
}
```

_Request Body_
```
{
    "email": "<email>",
    "password": "<password>"
}
```
_Response (200)_
```
{
	"access_token": "<JWT_TOKEN>"
}
```
_Response (400 - "Bad Request")_
```
{
  "messages": [
		"Email/Password is required"
	]
}
```

_Response (401 - "Unauthorized")_
```
{
  "messages": [
		"Invalid Password"
	]
}
```

_Response (404 - "Not Found")_
```
{
  "messages": [
		"Email doesn't exists"
	]
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---
---
### Register Customer

> Register Customer

_URL_
```
http://localhost:3000/customers/register
```
_Method_
```
POST
```

_URL Header_
```
Not needed
```

_Request Body_
```
{
  "email": "<email to get insert into>" ,
	"password": "<password to get insert into>",
	"phoneNumber": "<phoneNumber to get insert into>",
	"address": "<address to get insert into>",
}
```
_Response (201)_
```
{
	 "email": "<email>",
   "password": "<password>"
}
```
_Response (400 - "Bad Request")_
```
{
  "messages": [
		"Email/Password is required"
	]
}
```

_Response (401 - "Unauthorized")_
```
{
  "messages": [
		"Invalid Password"
	]
}
```

_Response (404 - "Not Found")_
```
{
  "messages": [
		"Email doesn't exists"
	]
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---
---
### Login Customer

> Login Customer

_URL_
```
http://localhost:3000/customers/login
```
_Method_
```
POST
```

_URL Headers_
```
Not needed
```

_Request Body_
```
{
  "email": "<email to geted>" ,
	"password": "<password to geted>"
}
```
```
_Response (200)_
```
{
	"access_token": "<JWT_TOKEN>"
}
```
_Response (400 - "Bad Request")_
```
{
  "messages": [
		"Email/Password is required"
	]
}
```

_Response (401 - "Unauthorized")_
```
{
  "messages": [
		"Invalid Password"
	]
}
```

_Response (404 - "Not Found")_
```
{
  "messages": [
		"Email doesn't exists"
	]
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---
---
### Get All list Movie Customer

> Get All list Movie Customer

_URL_
```
http://localhost:3000/movies/pub/pag
```
_Method_
```
GET
```

_URL Headers_
```
Not needed
```

_Request Body_
```
{
  Not needed
}
```
```
_Response (200)_
```
{
	{
    "Movies": [
        {
            "id": 1,
            "title": "Spider-Man: No Way Home",
            "synopsis": "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear, forcing Peter to discover what it truly means to be Spider-Man.",
            "trailerUrl": "https://www.youtube.com/embed/JfVOs4VSpmA",
            "imgUrl": "https://m.media-amazon.com/images/M/MV5BZWMyYzFjYTYtNTRjYi00OGExLWE2YzgtOGRmYjAxZTU3NzBiXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_FMjpg_UX1000_.jpg",
            "rating": 8,
            "genreId": 2,
            "authorId": 1,
            "status": "active",
            "createdAt": "2022-04-19T04:26:11.208Z",
            "updatedAt": "2022-04-19T04:26:11.208Z",
            "Genre": {
                "id": 2,
                "name": "Action",
                "createdAt": "2022-04-19T04:26:11.102Z",
                "updatedAt": "2022-04-19T04:26:11.102Z"
            },
            "User": {
                 "id": 1,
                "username": "tomHolland",
                "email": "tom@mail.com",
                "role": "admin",
                "phoneNumber": "0823",
                "address": "UK"
            }
        }
    ],
    "totalPage": 5
}
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---
---
### Get All list Movie Customer By id

> Get All list Movie Customer By id

_URL_
```
 http://localhost:3000/movies/pub/1
```
_Method_
```
GET
```

_URL Headers_
```
Not needed
```

_Request Body_
```
{
  Not needed
}
```
```
_Response (200)_
```
{
	{
    "movie": {
        "id": 1,
        "title": "Spider-Man: No Way Home",
        "synopsis": "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear, forcing Peter to discover what it truly means to be Spider-Man.",
        "trailerUrl": "https://www.youtube.com/embed/JfVOs4VSpmA",
        "imgUrl": "https://m.media-amazon.com/images/M/MV5BZWMyYzFjYTYtNTRjYi00OGExLWE2YzgtOGRmYjAxZTU3NzBiXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_FMjpg_UX1000_.jpg",
        "rating": 8,
        "genreId": 2,
        "authorId": 1,
        "status": "active",
        "createdAt": "2022-04-19T04:26:11.208Z",
        "updatedAt": "2022-04-19T04:26:11.208Z"
      }
  }
}
```
_Response (404 - Not Found)_
```
{
  "message": "Movie Not Found"
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---
---
### Add Bookmark Movie Customer 

> Add Bookmark Movie Customer 

_URL_
```
http://localhost:3000/movies/1/bookmark
```
_Method_
```
POST
```

_URL Headers_
```
	"access_token": "<JWT_TOKEN>"
```

_Request Body_
```
{
  Not needed
}
```
```
_Response (200)_
```
{
	{
    "id": 1,
    "authorId": 2,
    "movieId": 4,
    "updatedAt": "2022-04-19T07:22:40.634Z",
    "createdAt": "2022-04-19T07:22:40.634Z"
  }
}
```
_Response (404 - Not Found)_
```
{
  "message": "Movie Not Found"
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---
---
### Get All list Bookmark Movie Customer 

> Get All list Bookmark Movie Customer 

_URL_
```
http://localhost:3000/movies/bookmark
```
_Method_
```
GET
```

_URL Headers_
```
	"access_token": "<JWT_TOKEN>"
```

_Request Body_
```
{
  Not needed
}
```
```
_Response (200)_
```
[
    {
        "id": 1,
        "movieId": 4,
        "authorId": 2
    }
]
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---



