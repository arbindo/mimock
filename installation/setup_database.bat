@echo off

echo "Setting up PostgreSQL database for mimock..."

@REM Pass the default username `-U <user_name>` to the following command.
psql "-h" "localhost" -p "5432" -U "postgres" -f "%CD%\psql_setup.sql"

echo "PostgreSQL database setup complete."
