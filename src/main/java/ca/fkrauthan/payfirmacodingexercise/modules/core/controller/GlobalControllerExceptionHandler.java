package ca.fkrauthan.payfirmacodingexercise.modules.core.controller;

import ca.fkrauthan.payfirmacodingexercise.modules.core.entities.Error;
import ca.fkrauthan.payfirmacodingexercise.modules.core.entities.ErrorsRepresentation;
import ca.fkrauthan.payfirmacodingexercise.modules.users.exceptions.UserAlreadyExistsException;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.List;

/**
 * @author fkrauthan
 */
@ControllerAdvice
public class GlobalControllerExceptionHandler {

    @ExceptionHandler
    @ResponseStatus(HttpStatus.CONFLICT)
    public @ResponseBody ErrorsRepresentation handleUserAlreadyExistsException(UserAlreadyExistsException e) {
        ErrorsRepresentation errorsRepresentation = new ErrorsRepresentation();
        errorsRepresentation.addError(new Error(e.getMessage()));

        return errorsRepresentation;
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public @ResponseBody ErrorsRepresentation handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        ErrorsRepresentation errorsRepresentation = new ErrorsRepresentation();

        BindingResult result = e.getBindingResult();
        final List<FieldError> fieldErrors = result.getFieldErrors();
        for (FieldError error : fieldErrors) {
            errorsRepresentation.addError(new Error(error.getField(), error.getDefaultMessage()));
        }

        return errorsRepresentation;
    }

}
