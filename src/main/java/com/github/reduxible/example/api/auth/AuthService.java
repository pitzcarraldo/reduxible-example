package com.github.reduxible.example.api.auth;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

/**
 * @author Minkyu Cho(mrnoname@naver.com)
 */
@Service
public class AuthService {
  private static final String AUTH_API_URI = "http://reduxible.herokuapp.com/api/auth";

  private RestTemplate restTemplate = new RestTemplate();

  public String getAuth(Map<String, String> username) {
    return restTemplate.postForObject(AUTH_API_URI + "/login", username, String.class);
  }

  public String getUser(Map<String, String> auth) {
    return restTemplate.postForObject(AUTH_API_URI + "/user", auth, String.class);
  }
}
