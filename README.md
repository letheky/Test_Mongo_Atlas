# Node.js Server with MongoDB Atlas

MongoDB Atlas test.

## Introduction

This guide demonstrates the process of initializing a Node.js server and connecting it to MongoDB Atlas, allowing you to build applications with a scalable and cloud-hosted database.

## Prerequisites

Before you begin, ensure you have the following prerequisites installed:

- [Node.js](https://nodejs.org/) installed on your machine
- A MongoDB Atlas account and a MongoDB connection string

## Getting Started

1. Clone this repository to your local machine:

    ```bash
    git clone https://github.com/letheky/Test_Mongo_Atlas.git
    cd your-repo
    ```

2. Install project dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the project root and add your MongoDB Atlas connection string:

    ```env
    MONGODB_URI=your_mongodb_atlas_connection_string
    ```

    Replace `your_mongodb_atlas_connection_string` with your actual MongoDB Atlas connection string.

4. Start the Node.js server:

    ```bash
    npm start
    ```

    The server will run at `http://localhost:5000` by default.

## Usage

- Connect to MongoDB Atlas
- Sample CRUD with MongoDB

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- Using express, mongodb, dotenv.
- Thank the MongoDB Atlas team for providing a cloud database solution.
