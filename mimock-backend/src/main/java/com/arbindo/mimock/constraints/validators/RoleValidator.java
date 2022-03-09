package com.arbindo.mimock.constraints.validators;

import com.arbindo.mimock.common.constants.Role;
import com.arbindo.mimock.constraints.ValidRole;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class RoleValidator implements ConstraintValidator<ValidRole, String> {
    @Override
    public void initialize(ValidRole constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(String role, ConstraintValidatorContext context) {
        try {
            Role.enumFromText(role);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
