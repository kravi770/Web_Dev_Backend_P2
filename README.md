# Web_Dev_Backend_P2
Natours | All Tours

Natours is an innovative web-based application that revolutionizes the way tours are listed and organized. Designed to cater to the needs of hikers, solo travelers, and tour guides. Natours provides a convenient and efficient solution for making exciting and memorable experiences easily accessible to everyone.

Key Features of Natours:

1. Comprehensive Tour Listings: Natours offers an extensive database of diverse tours, ranging from thrilling hiking expeditions to serene nature walks. Each tour is accompanied by detailed information, including duration, difficulty level, location, and highlights, enabling users to make informed decisions based on their preferences.

2. Customized Search and Filters: The application provides powerful search and filter options to help users find tours that match their specific requirements. Users can search by location, tour type, duration, difficulty, and more, ensuring they discover the perfect adventure tailored to their preferences.

3. User Reviews and Ratings: To facilitate transparency and trust, Natours incorporates a review and rating system. Previous participants can share their experiences and provide feedback on tours, allowing potential travelers to gain insights and make well-informed decisions.

To begin, I created a server.js file that serves as the entry point for the application. In this file, I set up an HTTP server using the mongoose module available in MongoDB, specifying port 3000 as the server's listening port. By utilizing mongoose, I was able to connect to a MongoDB database and leverage its powerful features.
In addition, I used the express framework to simplify routing within the application. By using express, I could define routes in a straightforward manner, making it easier to handle different HTTP requests and their corresponding actions.

To further organize the codebase, I created separate files such as controllers. In these files, I defined functions that handle specific operations related to tours, such as retrieving a single tour, getting all tours, creating a new tour, updating a tour, and deleting a tour. This approach enhances code modularity and improves code readability.

To establish the routing functionality, I created a separate file called routers that maps the defined functions in the controllers to their corresponding routes. This allows for a clear separation of concerns and ensures that each function is invoked based on the appropriate HTTP route.

To ensure data consistency and structure, I implemented a model folder where I defined tour schemas. These schemas specify the required fields and any additional constraints for the tours' data. By utilizing models, I could ensure that the data stored in the MongoDB database adheres to a predefined structure.

Finally, as part of the development process, I imported data from a .json file located in the starter/dev-data section. This data was imported to showcase initial tour information and provide sample data for testing and development purposes.
