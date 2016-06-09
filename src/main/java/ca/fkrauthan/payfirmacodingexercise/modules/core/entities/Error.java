package ca.fkrauthan.payfirmacodingexercise.modules.core.entities;

/**
 * @author fkrauthan
 */
public class Error {

    private String fieldName;

    private String message;

    public Error(String message) {
        this.message = message;
    }

    public Error(String fieldName, String message) {
        this.fieldName = fieldName;
        this.message = message;
    }

    public String getFieldName() {
        return fieldName;
    }

    public void setFieldName(String fieldName) {
        this.fieldName = fieldName;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
