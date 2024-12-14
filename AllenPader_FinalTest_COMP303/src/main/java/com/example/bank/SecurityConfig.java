package com.example.bank;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable() // Disable CSRF for simplicity during testing
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/banks/**") // Allow all endpoints under /api/banks
                .permitAll() // No authentication required
                .anyRequest().authenticated() // Require authentication for other endpoints
            )
            .httpBasic(); // Use basic authentication (if applicable)
        return http.build();
    }
}
