package com.github.reduxible.example.route;

import lombok.Getter;
import lombok.Setter;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

/**
 * @author Alan(Minkyu Cho)
 */
@Getter
@Setter
public class RouteRequest {
  private final HttpServletRequest REQUEST;
  private Map<String, String> cookies = new HashMap<>();

  public RouteRequest(HttpServletRequest request) {
    this.REQUEST = request;
    if (request.getCookies() != null) {
      for (Cookie cookie : request.getCookies()) {
        cookies.put(cookie.getName(), cookie.getValue());
      }
    }
  }

  public String getOriginalUrl() {
    return REQUEST.getRequestURI();
  }

  public String get(String key) {
    return REQUEST.getHeader(key);
  }

  public Map<String, String> getCookies() {
    return cookies;
  }
}
