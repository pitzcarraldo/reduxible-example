package com.github.reduxible.example.route;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;

/**
 * @author Minkyu Cho(mrnoname@naver.com)
 */
@Slf4j
@RestController
public class RouteController {
  private static final int DEFAULT_TIMEOUT = 1000;

  @Autowired
  private RouteService routeService;

  @RequestMapping("/**")
  public String index(HttpServletRequest request, HttpServletResponse response) {
    Future<RouteResponse> future = routeService.getRouteResult(new RouteRequest(request));
    try {
      RouteResponse routeResponse = future.get(DEFAULT_TIMEOUT, TimeUnit.MILLISECONDS);
      response.setStatus(routeResponse.getStatus());
      return routeResponse.getBody();
    } catch (Exception routeException) {
      log.error("Rendering Timed Out, Render Single Page Application.");
      //When Timed Out, Render Single Page Application.
      RequestDispatcher dispatcher = request.getRequestDispatcher("/dist/index.html");
      try {
        dispatcher.forward(request, response);
        return "";
      } catch (Exception forwardException) {
        log.error(forwardException.getMessage(), forwardException);
      }
    }
    return "";
  }
}
