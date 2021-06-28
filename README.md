# CourseApp2

This application is designed to learn the usage of the following technologies.

## Getting Started
Use these instructions to get the project up and running.

### Prerequisites
You will need the following tools:

* [Visual Studio Code or Visual Studio 2019](https://visualstudio.microsoft.com/vs/)
* [.NET Core SDK 3](https://dotnet.microsoft.com/download/dotnet-core/3.0)
 * [Node.js](https://nodejs.org/en/) 

### Setup
Follow these steps to get your development environment set up:

  1. Clone the repository
  2. At the root directory, restore required packages by running:
      ```
     dotnet restore
     ```
  3. Next, build the solution by running:
     ```
     dotnet build
     ```
  4. Next, navigate to `\CourseApp.Web` directory, launch the application by running:
     ```
	 dotnet run
	 ```
  5. Launch [https://localhost:5001/](http://localhost:5001/) in your browser to view the Web UI
  
  6. Launch [https://localhost:5001/swagger](http://localhost:5001/swagger) in your browser to view the API

## Technologies
* ASP.NET Core 3
* Entity Framework Core 3
* React 16
* AutoMapper
* FluentValidation
* Serilog
* Bootstrap 4

