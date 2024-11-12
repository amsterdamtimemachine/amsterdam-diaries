# Amsterdam Diaries Time Machine

**Amsterdam Diaries Time Machine** is a Nuxt 3 application designed to bring the past to life with diary fragments from Amsterdam women during World war 2. By navigating through their diaries, get an immersive glimpse into their lives.

## Getting Started

### Prerequisites

- **Node.js** (version 20 or higher)
- **NPM**
- **Docker** (To run the database)

### Installation

1. Clone the repository:

```bash
git clone git@github.com:amsterdamtimemachine/amsterdam-diaries.git
cd amsterdam-diaries
```

2. Build & Run the database container

```bash
docker build -t atm-db .
docker run -d --name atm-db -p 3306:3306 atm-db
```

3. Install dependencies:

```bash
npm ci
```

4. To populate the database with diaries, use the import script.\
   You do need to add the env variabels to connect to the database, for example:

```bash
NUXT_DB_HOST=localhost NUXT_DB_PORT=3306 NUXT_DB_USER=importer NUXT_DB_PASS=importer NUXT_DB_NAME=mydb npm run import
```

5. Run the development server:

```bash
npm run dev
```

### Deployment

This project uses **GitHub Actions** for automated deployments:

- **Production Deployment**: Commits to the `main` branch automatically trigger a deployment to the production environment.
- **Staging Deployment**: Commits to the `develop` branch trigger a deployment to the staging environment for testing and acceptance purposes.

### Running Tests

To ensure data integrity, the application includes tests to validate the contract with the linked open data:

```bash
npm run import:test
```

These tests verify that the application is correctly fetching and displaying linked open data, maintaining consistency between the app and data sources.
