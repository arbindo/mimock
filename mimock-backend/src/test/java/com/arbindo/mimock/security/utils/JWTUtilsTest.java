package com.arbindo.mimock.security.utils;

import com.arbindo.mimock.entities.User;
import com.arbindo.mimock.entities.UserRole;
import com.arbindo.mimock.security.user.models.MimockUserDetails;
import io.jsonwebtoken.Jwts;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest(properties = {"app.security.jwt-expiry-in-seconds=1800", "app.security.jwt-secret-key=C4BE6B45CBBD4CBADFE5E22F4BCDBAF8"})
class JWTUtilsTest {

    @Autowired
    JWTUtils jwtUtils;

    @Test
    public void shouldReturnJWT() {
        MimockUserDetails userDetails = new MimockUserDetails(
                User.builder()
                        .userName("testadmin")
                        .password("Password@007")
                        .userRoles(UserRole.builder().roleName("ADMIN").build())
                        .build()
        );

        String authToken = jwtUtils.generateJWT(userDetails, new HashMap<>());

        SecretKeySpec key = new SecretKeySpec("C4BE6B45CBBD4CBADFE5E22F4BCDBAF8".getBytes(StandardCharsets.UTF_8), "HmacSHA256");
        String subject = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(authToken).getBody().getSubject();

        assertEquals(userDetails.getUsername(), subject);
    }
}