package com.github.reduxible.example.route;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @author Alan(Minkyu Cho)
 */
@RestController
public class RouteController {
	@Autowired
	private RouteService routeService;

	@RequestMapping("/**")
	public String index(HttpServletRequest request, HttpServletResponse response) {
		RouteResponse routeResponse = routeService.getRouteResult(new RouteRequest(request));
		response.setStatus(routeResponse.getStatus());
		return routeResponse.getBody();
	}
}
