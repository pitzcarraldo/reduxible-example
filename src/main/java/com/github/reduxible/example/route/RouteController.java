package com.github.reduxible.example.route;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @author Minkyu Cho(mrnoname@naver.com)
 */
@Slf4j
@Controller
public class RouteController {
  @Autowired
  private RouteService routeService;

  @RequestMapping("/**")
  public ResponseEntity<String> index(HttpServletRequest request, HttpServletResponse response) {
    RouteResponse routeResponse = routeService.getRouteResult(new RouteRequest(request));
    // if (StringUtils.isEmpty(routeResponse.getBody())) {
    //   //When Timed Out, Render Single Page Application.
    //   RequestDispatcher dispatcher = request.getRequestDispatcher("/dist/index.html");
    //   try {
    //     dispatcher.forward(request, response);
    //     return null;
    //   } catch (Exception e) {
    //     log.error(e.getMessage(), e);
    //   }
    // }
    return new ResponseEntity<>(routeResponse.getBody(), HttpStatus.valueOf(response.getStatus()));
  }
}
