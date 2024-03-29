package hr.dgjalic.service.services;

import org.springframework.stereotype.Component;

@Component
public class EmailValidator {

    static String emailRegex = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$";

    public boolean isValid(String email) {
        return email.matches(emailRegex);
    }

}
