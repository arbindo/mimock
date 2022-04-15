package com.arbindo.mimock.audit;

import com.arbindo.mimock.entities.User;
import com.arbindo.mimock.repository.UserRepository;
import lombok.Builder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Builder
public class AuditorServiceImpl implements AuditorService {

    @Autowired
    UserRepository userRepository;

    @Override
    public String getCurrentAuditor() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<User> user = userRepository.findByUserName(username);
        return user.map(User::getName).orElse(null);
    }

}
