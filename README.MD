# Job Portal App

This is a job portal application with a frontend built with React and a backend using Node.js and MongoDB. It provides a platform to view job listings and analyze job data with insightful statistics.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/get-npm)
- [MongoDB](https://www.mongodb.com/try/download/community)

### Installation & Setup

1. Clone this repository:

```bash
git clone <repository-url>
```

2. Change directory to the project's root:

```bash
cd path-to-project-root
```

### Backend Setup:

1. Move to the backend directory:

```bash
cd job_postings_api
```

2. Install the necessary dependencies:

```bash
npm install
```

3. Set up your environment variables:

Copy `.env.example` to `.env` and fill in the values (make sure that this file is in backend/api folder and not in root):

```
DATABASE_URL=mongodb://localhost:27017/yourDatabaseName
PORT=5000
```

4. Start the backend server:

```bash
npm start
```

The server will run on `http://localhost:5000`.

### Frontend Setup:

1. Move to the frontend directory:

```bash
cd job_postings_frontend
```

2. Install the necessary dependencies:

```bash
npm install
```

3. Start the React app:

```bash
npm start
```

The app will be accessible at `http://localhost:3000`. Make sure that backend is running to be able to see results in frontend.

## API Documentation & Testing

OpenAPI/Swagger documentation was implemented for the backend. This provides a clear specification for the API routes, request-response structure, and allows for testing the endpoints directly from the documentation interface. You can access the Swagger UI at:

`http://localhost:5000/api-docs`

## Architecture

### Backend

The backend is a RESTful API built using Express.js and MongoDB.

- **Models:** Represent database schemas and the structure of data.
- **Routes:** Handle API routes and the available endpoints.

The backend also has a `/stats` and `/jobs` route that provides several endpoints for extracting valuable insights from the job data.

### Frontend

The frontend is a Single Page Application (SPA) built using React. It uses React Router for navigation. The main components include:

- **Home**: The landing page.
- **Jobs**: Displays the job listings with pagination.
- **Stats**: Visualizes job trends with charts using some of the backend endpoints in stats routes.

## Important Architectural Decisions

- **Database:** Initially, the approach was to utilize PostgreSQL for its robustness and relational data management capabilities. However, the data provided was extensive, and not entirely clean. There were substantial challenges in terms of data inconsistencies, presence of null or NaN values, and other corruptions. After spending considerable time attempting to wrangle and structure this data for PostgreSQL, it was evident that a different approach was needed. This led to the decision of switching to MongoDB. MongoDB, being document-oriented and schema-less, provided the flexibility that was crucial for managing this dataset. The transition to MongoDB significantly eased the data cleaning process, allowing for more efficient debugging and handling of corrupted data. This phase was the most time-consuming part of the project, but the adaptability of MongoDB proved invaluable in addressing the complexities of the data.

Also a really important note is that, which can be seen from the database scripts too, I only used first 5000 jobs into my MongoDB database to be able to continue working on backend and frontend earlier. A really easy script stops processing csv data into database after 5000 iterations, which

- **Styling:** Material-UI was used for quick and consistent styling. It's customizable and provides a wide range of components.

## Challenges & Trade-offs

- **Pagination:** Instead of loading all jobs at once, which would impact performance, jobs are fetched in chunks using pagination. This ensures the app remains performant even with a large dataset. Paginated jobs were used in job list in Jobs route of frontend app. There are too many jobs in the database if it was directly queried.

## Future Improvements

- **Testing** Testing for the whole system will be added.
- **Search & Filter:** Implement search functionality and additional filters for the jobs. Filtering in backend works fine.
- **Authentication:** Incorporate user authentication and allow for job posting by authenticated users.
- **Add more visualization, add job descriptions when clicked:** Time was important because and the fastest way to show that fetching backend data was working was chosen for the current frontend setup.
  


