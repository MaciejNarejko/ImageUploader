# ImageUploader

ImageUploader is a web application that enables users to upload, view, and manage images. The project is divided into two main parts:

- **Backend API** – Built with ASP.NET Core, it handles image upload, retrieval, and deletion, as well as communication with a MySQL database.
- **Frontend** – A React application (built with Vite or Create React App) that communicates with the backend via the API.

## Table of Contents

- [Requirements](#requirements)
- [API Specification](#api-specification)
- [Technologies](#technologies)
- [Project Constraints](#project-constraints)
- [Environment Configuration](#environment-configuration)
  - [Backend Configuration](#backend-configuration)
  - [Frontend Configuration](#frontend-configuration)


## Requirements

- **Backend:** .NET 8.0 SDK and ASP.NET Core Runtime
- **Frontend:** Node.js with npm or yarn
- **Database:** MySQL

## API Specification

The backend API provides the following endpoints:

- **POST** `/api/images/upload`  
  Used for uploading image files.  
  **Constraints:** Maximum of 10 files; each file must not exceed 3 MB.

- **GET** `/api/images`  
  Retrieves a list of available images along with their metadata.

- **DELETE** `/api/images/{id}`  
  Deletes an image by its unique identifier.

- **GET** `/uploads/{filename}`  
  Serves static files—this endpoint allows you to download an image file (e.g., `perfume1.jpg`).


## Technologies

- **ASP.NET Core** – for building the backend API
- **React** – for the frontend UI
- **TypeScript** – for static type-checking
- **MySQL** – as the database
- **Vite** – for fast development and bundling
- **Styled-components** – for component-level styling in React
- **Axios** – for handling HTTP requests



## Project Constraints

- **Maximum number of files:** 10  
- **Maximum file size:** 3 MB per file

The frontend communicates with the backend solely via the API.


## Environment Configuration

### Backend Configuration

The project uses configuration files:
- `appsettings.json` – default settings 

### Frontend Configuration and Publishing

In the `.env` file, you can define environment variables that will be injected into your frontend during the build process. For example:

```env
VITE_API_URL=http://localhost:5173

