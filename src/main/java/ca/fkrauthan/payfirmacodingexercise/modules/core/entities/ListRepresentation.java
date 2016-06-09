package ca.fkrauthan.payfirmacodingexercise.modules.core.entities;

import java.util.List;

/**
 * @author fkrauthan
 */
public class ListRepresentation<T> {

    private Integer count;

    private List<T> data;

    public ListRepresentation(Integer count, List<T> data) {
        this.count = count;
        this.data = data;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public List<T> getData() {
        return data;
    }

    public void setData(List<T> data) {
        this.data = data;
    }
}
