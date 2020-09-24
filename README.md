# Greenfield Products API Service

The goal of this project was to work with a legacy front-end web portal, built by another engineering team, and build out a specific API service to be used by the front-end client. This API service was to be a RESTful API that would need to handle web-scale traffic as well as the entire dataset product catalog (~4.7GBs worth of data or 20M+ records). An ETL process was required before beginning the project, in order to pass in the appropriate data to a Postgres database. The service was then incrementally optimized through indexing techniques and connection pooling. The API service was containerized using Docker and deployed to an Amazon EC2 instance. 

# Tech Stack

- Node.js
- Express
- PostgreSQL
- Docker

# Routes built

|  Method  |          Endpoint             |    Purpose                                                       |  Response Code  |
|  :----:  |           :----              |         :----                                                   | :----:          |
|   GET    | /products/list                | Returns a list of products capped at 5 per page, can be edited.  |       200          |
|   GET    | /products/:product_id         | Returns details about a specific product based on ID.            |     200         | 
|   GET    | /products/:product_id/styles  | Returns set styles for a specific  product based on the ID.      |      200           |
|   GET    | /products/:product_id/related | Returns all related products for a specific product by ID.       |      200           |

# Results

The biggest challenge in this project was handling a huge amount of data, and making sure the queries would be as performant as possible. Given that the API would exclusively be used for GET requests, I wanted to make sure I was leaning into the aggregator functions found within Postgres in order to improve those times. Initially my most expensive query would take around 9mins to complete. I therefore moved to go towards indexing of the database and was able to achieve 175ms/50RPS in production, down 99% in query time. 
