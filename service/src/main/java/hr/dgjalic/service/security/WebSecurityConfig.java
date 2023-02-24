package hr.dgjalic.service.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@RequiredArgsConstructor
public class WebSecurityConfig {

    @Bean
    @Profile("default")
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(authorizeRequests -> authorizeRequests
                .requestMatchers("/api/**").hasAuthority(USER)
                .requestMatchers("/api/**").authenticated()
                .anyRequest().permitAll()
        );

        http.oauth2ResourceServer()
                .jwt()
                .jwtAuthenticationConverter(new CustomJwtAuthenticationConverter());
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.cors().and().csrf().disable();

        return http.build();
    }

    private static final String USER = "user";
}
