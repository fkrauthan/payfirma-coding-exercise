package ca.fkrauthan.payfirmacodingexercise.modules.core.entities;

import java.util.ArrayList;
import java.util.List;

/**
 * @author fkrauthan
 */
public class ErrorsRepresentation {

    private List<Error> errors;

    public ErrorsRepresentation() {
        this.errors = new ArrayList<>();
    }

    public ErrorsRepresentation addError(Error error) {
        this.errors.add(error);
        return this;
    }

    public List<Error> getErrors() {
        return errors;
    }

    public void setErrors(List<Error> errors) {
        this.errors = errors;
    }
}
