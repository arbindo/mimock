package com.arbindo.mimock.repository;

import com.arbindo.mimock.init.InitDatabase;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

@Component
public class GetMocksRepository {
    private final InitDatabase initDatabase;

    public GetMocksRepository(final InitDatabase initDatabase) {
        this.initDatabase = initDatabase;
    }

    public String getMocks(String route, String method) {
        try {
            Statement stmt = this.initDatabase.initConnection().createStatement();
            String query = String.format("SELECT * FROM mimock_schema.mocks WHERE route = '%s' AND method = '%s'", route, method);
            ResultSet result = stmt.executeQuery(query);

            String response = "";
            while (result.next()) {
                response = result.getString("response_body");
            }

            return response;
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return "";
    }
}
