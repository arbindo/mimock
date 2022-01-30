DROP SCHEMA IF EXISTS public;
CREATE SCHEMA IF NOT EXISTS ${spring.datasource.hikari.schema};
ALTER ROLE ${spring.datasource.username} SET search_path TO ${spring.datasource.hikari.schema};
