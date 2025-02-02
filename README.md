# Receipt-Processor
It is a Fetch Backend take-home exercise. The application is implemented using Express.js, which is a web framework for Node.js. The application is containerized using Docker for easy deployment and testing.

I have implemented the application logic in the src/index.js file, ensuring that all requirements are effectively met. Additionally, I have included comments within the code to provide clear explanations of its functionality.


## Instructions to run this application

* Clone the repository to your local machine.
* Navigate to the project directory
* Build the Docker image using the command (docker build -t receipt-processor .)
* Start the application by running the Docker container using the command (docker run -p 8080:8080 receipt-processor)
* Or you can use the command (docker-compose up) to start the application directly.
* The application will be available at http://localhost:8080
* I have provided the postman collection to test the API. Import that file to postman tool and test the endpoints.
* The POST request will return the ID as per the requirements. Copy the ID and paste it in the GET request URL to get the number of points awarded.
* Finally, stop the running container.



