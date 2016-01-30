package com.github.reduxible.example.route;

import com.github.reduxible.example.script.JavaScriptRunner;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

/**
 * @author Alan(Minkyu Cho)
 */
@Slf4j
@Service
public class RouteService {
	private static final String STATUS_KEY = "status";
	private static final String BODY_KEY = "body";

	@Autowired
	private JavaScriptRunner runner;

	public RouteResponse getRouteResult(RouteRequest request) {
    try {
      Map result = (Map) runner.run("render", request);
      return new RouteResponse(
        (Integer) result.get(STATUS_KEY),
        (String) result.get(BODY_KEY)
      );
    } catch (Exception e) {
      log.error(e.getMessage());
      return new RouteResponse(500, "");
    }
	}
}
