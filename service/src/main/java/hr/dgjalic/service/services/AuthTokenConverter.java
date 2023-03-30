package hr.dgjalic.service.services;

import org.springframework.stereotype.Component;
import org.json.JSONObject;
import java.util.Base64;

@Component
public class AuthTokenConverter {
    public String getEmailFromToken(String authToken) {
        JSONObject payloadObject = new JSONObject(getDecodedTokenPayload(authToken));
        return payloadObject.getString("email");
    }

    private String extractTokenFromHeader(String header) {
        return header.replace("Bearer ", "");
    }

    private String decode(String encodedString) {
        return new String(Base64.getUrlDecoder().decode(encodedString));
    }

    private String getDecodedTokenPayload(String authToken) {
        String token = extractTokenFromHeader(authToken);
        String tokenPayload = token.split("\\.")[1];
        return decode(tokenPayload);
    }
}
