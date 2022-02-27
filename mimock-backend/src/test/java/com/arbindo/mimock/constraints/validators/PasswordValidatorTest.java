package com.arbindo.mimock.constraints.validators;

import com.arbindo.mimock.constraints.ValidPassword;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;
import org.springframework.validation.beanvalidation.SpringConstraintValidatorFactory;
import org.springframework.web.context.WebApplicationContext;

import javax.validation.ConstraintViolation;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;

class ValidatorStub {
    @ValidPassword
    String hashedPassword;

    ValidatorStub(String password) {
        this.hashedPassword = password;
    }
}

@SpringBootTest
public class PasswordValidatorTest {
    private LocalValidatorFactoryBean validator;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @BeforeEach
    void setupTest() {
        SpringConstraintValidatorFactory springConstraintValidatorFactory =
                new SpringConstraintValidatorFactory(webApplicationContext.getAutowireCapableBeanFactory());
        validator = new LocalValidatorFactoryBean();
        validator.setConstraintValidatorFactory(springConstraintValidatorFactory);
        validator.setApplicationContext(webApplicationContext);
        validator.afterPropertiesSet();
    }

    @ParameterizedTest
    @ValueSource(strings = {
            "$2a$12$aZCF2UaVXv3g26gere3Qfu4csPBgqopXRcEmorhSkbWY3szsyfGiO",
            "$2a$12$wRsP0qwaYWA2WGZ0HxZu4evfRHEulSjwdTAF6G0YusL6Bwqln3khO",
            "$2a$10$jugULZtTYFK8z1BcBV84I.ttsWsXCRl0csDNBuBw/wBk0KgTfK8Uy",
            "$2a$05$jugULZtTYFK8z1BcBV84I.ttsWsXCRl0csDNBuBw/wBk0KgTfK8Uy"
    })
    void shouldPassValidation_WhenPasswordIsValidBcryptHash(String hash) {
        ValidatorStub stub = new ValidatorStub(hash);
        Set<ConstraintViolation<ValidatorStub>> constraintViolations =
                validator.validate(stub);

        assertEquals(0, constraintViolations.size());
    }

    @ParameterizedTest
    @ValueSource(strings = {
            "$2b$12$aZCF2UaVXv3g26gere3Qfu4csPBgqopXRcEmorhSkbWY3szsyfGiO",
            "$2a$12$aZCF2UaVXv3g26gere3Qfu4csPBgqopXRcEmorhSkbWY3szsyfGi",
            "$2a$5$jugULZtTYFK8z1BcBV84I.ttsWsXCRl0csDNBuBw/wBk0KgTfK8Uy",
            "098f6bcd4621d373cade4e832627b4f6",
            "a94a8fe5ccb19ba61c4c0873d391e987982fbbd3",
            "randomhash",
            ""
    })
    void shouldFailInValidation_WhenPasswordIsNotValidBcryptHash(String hash) {
        ValidatorStub stub = new ValidatorStub(hash);
        Set<ConstraintViolation<ValidatorStub>> constraintViolations =
                validator.validate(stub);

        assertEquals(1, constraintViolations.size());
    }
}