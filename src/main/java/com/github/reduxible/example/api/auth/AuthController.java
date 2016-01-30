package com.github.reduxible.example.api.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * @author Minkyu Cho(mrnoname@naver.com)
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {
	@Autowired
	private AuthService authService;

	@RequestMapping(path = "/user", method = RequestMethod.POST)
	public User getUser(@RequestBody Map<String, String> auth) {
    return new User(authService.getUser(auth), "");
	}

	@RequestMapping(path = "/login", method = RequestMethod.POST)
	public User login(@RequestBody Map<String, String> username) {
		return new User("", authService.getAuth(username));
	}

	@RequestMapping(path = "/logout", method = RequestMethod.POST)
	public User logout(@RequestBody Map<String, String> auth) {
		return new User(authService.getUser(auth), "");
	}

}
