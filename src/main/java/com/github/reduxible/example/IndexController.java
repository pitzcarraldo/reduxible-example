package com.github.reduxible.example;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author Minkyu Cho(mrnoname@naver.com)
 */
@Controller
public class IndexController {

	@RequestMapping("/")
	public String index() {
		return "forward:/index.html";
	}
}
