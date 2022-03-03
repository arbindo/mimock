package com.arbindo.mimock.constraints.validators;

import com.arbindo.mimock.constraints.ValidPassword;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.regex.Pattern;

public class PasswordValidator implements ConstraintValidator<ValidPassword, String> {
    @Override
    public void initialize(ValidPassword constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        // Valid BCrypt hash format
        // $2a$10$TwentytwocharactersaltThirtyonecharacterspasswordhash
        // $==$==$======================-------------------------------
        // E.g:
        // $2a$12$aZCF2UaVXv3g26gere3Qfu4csPBgqopXRcEmorhSkbWY3szsyfGiO
        if (value == null) return false;

        Pattern bcryptPattern = Pattern.compile("\\$2a\\$\\d\\d\\$[\\s\\S]{53}\\b");
        return bcryptPattern.matcher(value).matches();
    }
}
