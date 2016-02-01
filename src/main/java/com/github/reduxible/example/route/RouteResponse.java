package com.github.reduxible.example.route;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.concurrent.Callable;

/**
 * @author Minkyu Cho(mrnoname@naver.com)
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RouteResponse {
  private Integer status = 200;
  private String body;

  public RouteResponse status(Integer status) {
    this.status = status;
    return this;
  }

  public RouteResponse send(String body) {
    this.body = body;
    return this;
  }

  public RouteResponse end(String body) {
    return send(body);
  }
}
