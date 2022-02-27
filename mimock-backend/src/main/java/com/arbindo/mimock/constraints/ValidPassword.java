package com.arbindo.mimock.constraints;

import com.arbindo.mimock.constraints.validators.PasswordValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Target({ElementType.FIELD, ElementType.METHOD, ElementType.PARAMETER,
        ElementType.ANNOTATION_TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = PasswordValidator.class)
@Documented
public @interface ValidPassword {
    String message() default "Password is not properly encoded";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}