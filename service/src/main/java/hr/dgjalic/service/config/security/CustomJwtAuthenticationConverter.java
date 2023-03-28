package hr.dgjalic.service.config.security;


import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;


/**
 * A custom implementation of a {@link Converter} that converts a JSON Web Token (JWT)
 * into an {@link AbstractAuthenticationToken}. The JWT is expected to contain a list of roles
 * under the "roles" claim, which will be extracted and used to create a collection of
 * {@link GrantedAuthority} objects. The username and email will also be extracted from the JWT
 * using the "preferred_username" and "email" claims.
 */
@AllArgsConstructor
@Component
public class CustomJwtAuthenticationConverter implements Converter<Jwt, AbstractAuthenticationToken> {

    private JwtAuthenticationConverter jwtAuthenticationConverter;
    private JwtGrantedAuthoritiesConverter jwtGrantedAuthoritiesConverter;


    public CustomJwtAuthenticationConverter() {
        this.jwtAuthenticationConverter = new JwtAuthenticationConverter();
        this.jwtGrantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
    }

    /**
     * Converts the given JWT into an {@link AbstractAuthenticationToken}
     */
    @Override
    public AbstractAuthenticationToken convert(Jwt jwt) {
        Collection<GrantedAuthority> authorities = extractAuthorities(jwt);

        return new JwtAuthenticationToken(jwt, authorities);
    }

    /**
     * Extracts the roles from a JWT token and converts them into a collection of {@link GrantedAuthority}.
     * The roles are expected to be nested in the "realm_access" claim of the JWT.
     * @param jwt The JWT token to extract the roles from
     * @return A collection of {@link GrantedAuthority} objects representing the roles extracted from the JWT token
     * */
    private Collection<GrantedAuthority> extractAuthorities(Jwt jwt) {
        if(jwt.getClaim("realm_access") != null) {
            Map<String, Object> realmAccess = jwt.getClaim("realm_access");
            ObjectMapper mapper = new ObjectMapper();
            List<String> roles = mapper.convertValue(realmAccess.get("roles"), new TypeReference<List<String>>(){});
            List<GrantedAuthority> authorities = new ArrayList<>();

            for (String role : roles) {
                authorities.add(new SimpleGrantedAuthority(role));
            }

            return authorities;
        }
        return new ArrayList<>();
    }
}
