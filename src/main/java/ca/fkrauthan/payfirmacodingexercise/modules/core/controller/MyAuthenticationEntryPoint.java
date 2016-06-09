package ca.fkrauthan.payfirmacodingexercise.modules.core.controller;

import ca.fkrauthan.payfirmacodingexercise.modules.core.entities.Error;
import ca.fkrauthan.payfirmacodingexercise.modules.core.entities.ErrorsRepresentation;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Service;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author fkrauthan
 */
@Service
public class MyAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Autowired
    private ObjectMapper objectMapper;

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        ErrorsRepresentation representation = new ErrorsRepresentation();
        representation.addError(new Error(authException.getMessage()));

        response.getWriter().write(objectMapper.writeValueAsString(representation));
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.addHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON.toString());
    }
}
