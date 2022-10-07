create user if not exists ${spring.datasource.username} password ${spring.datasource.password} admin;
CREATE domain IF NOT EXISTS jsonb AS other;