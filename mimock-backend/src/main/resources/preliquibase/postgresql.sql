ALTER ROLE ${spring.datasource.username} SET search_path TO ${spring.liquibase.default-schema};
CREATE SCHEMA IF NOT EXISTS ${spring.liquibase.default-schema};
