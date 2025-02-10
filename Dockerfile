# Use the official PostgreSQL image from the Docker Hub
FROM mariadb:10.6

# Set environment variables for PostgreSQL
ENV MYSQL_ROOT_PASSWORD=password
ENV MYSQL_DATABASE=mydb
ENV MYSQL_USER=importer
ENV MYSQL_PASSWORD=importer

# Expose the default PostgreSQL port
EXPOSE 3306
