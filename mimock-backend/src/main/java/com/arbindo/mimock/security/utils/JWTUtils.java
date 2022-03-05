package com.arbindo.mimock.security.utils;

import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;

@Service
public class JWTUtils {

    @Value("${app.security.jwt-expiry-in-seconds}")
    private String jwtExpiryInSeconds;

    @Value("${app.security.jwt-secret-key}")
    private String jwtSecretKey;

    public Date getTokenExpiryTimestamp() {
        return new Date(System.currentTimeMillis() + (Long.parseLong(jwtExpiryInSeconds) * 1000));
    }

    private SecretKeySpec getSigningKey() {
        return new SecretKeySpec(jwtSecretKey.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
    }

    public String generateJWT(UserDetails userDetails, HashMap<String, Object> claims) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userDetails.getUsername())
                .setHeaderParam("iat", new Date().toString())
                .setExpiration(getTokenExpiryTimestamp())
                .signWith(getSigningKey())
                .compact();
    }
}
