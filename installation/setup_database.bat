@echo off

echo "Setting up PostgreSQL database for mimock..."

@REM If the 'postgres' user does not exist, use an existing user  `-U <user_name>` to run the SQL script.
psql "-h" "localhost" -p "5432" -U "postgres" -f "%CD%\psql_setup.sql"

echo "PostgreSQL database setup complete."
