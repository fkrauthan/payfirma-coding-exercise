package ca.fkrauthan.payfirmacodingexercise.modules.users.exceptions;

/**
 * @author fkrauthan
 */
public class UserAlreadyExistsException extends RuntimeException {

    public UserAlreadyExistsException(final String message) {
        super(message);
    }

}
