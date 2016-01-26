package com.github.reduxible.example;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author Alan(Minkyu Cho)
 */
@Controller
public class IndexController {

	@RequestMapping("/")
	public String index() {
		return "forward:/index.html";
	}
}
