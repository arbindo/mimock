package com.arbindo.mimock.security.utils;

import com.arbindo.mimock.utils.TimeTokenParser;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.function.Function;

@Service
public class JWTUtils {

    @Getter
    @Value("${app.security.jwt-expiry-duration}")
    private String jwtExpiryDuration;

    @Value("${app.security.jwt-secret-key}")
    private String jwtSecretKey;

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token).getBody();
    }

    public Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public Date getTokenExpiryTimestamp() {
        return new Date(System.currentTimeMillis() + (TimeTokenParser.durationInSeconds(jwtExpiryDuration) * 1000));
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

    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return username.equals(userDetails.getUsername());
    }
}
