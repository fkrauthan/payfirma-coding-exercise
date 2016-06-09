package ca.fkrauthan.payfirmacodingexercise.modules.laptops.controller;

import ca.fkrauthan.payfirmacodingexercise.modules.core.entities.ListRepresentation;
import ca.fkrauthan.payfirmacodingexercise.modules.laptops.entities.Laptop;
import ca.fkrauthan.payfirmacodingexercise.modules.laptops.repositories.LaptopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * @author fkrauthan
 */
@RestController
@RequestMapping("/api/laptops")
public class LaptopController {

    @Autowired
    private LaptopRepository laptopRepository;

    @RequestMapping(method = RequestMethod.GET)
    public @ResponseBody ListRepresentation<Laptop> listLaptops() {
        List<Laptop> laptopList = laptopRepository.findAll(new Sort(Sort.Direction.ASC, "model"));
        return new ListRepresentation<Laptop>(laptopList.size(), laptopList);
    }

}
