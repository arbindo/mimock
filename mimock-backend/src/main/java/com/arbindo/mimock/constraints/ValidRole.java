package com.arbindo.mimock.constraints;

import com.arbindo.mimock.constraints.validators.RoleValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Target({ElementType.FIELD, ElementType.METHOD, ElementType.PARAMETER,
        ElementType.ANNOTATION_TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = RoleValidator.class)
@Documented
public @interface ValidRole {
    String message() default "Role is invalid. Allowed roles - ADMIN | MANAGER | VIEWER";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}