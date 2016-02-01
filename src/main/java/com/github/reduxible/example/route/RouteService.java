package com.github.reduxible.example.route;

import com.github.reduxible.example.script.JavaScriptRunner;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.AsyncResult;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

/**
 * @author Minkyu Cho(mrnoname@naver.com)
 */
@Slf4j
@Service
public class RouteService {
  private static final ExecutorService EXECUTOR = Executors.newCachedThreadPool();

  @Autowired
  private JavaScriptRunner runner;

  @Async
  public Future<RouteResponse> getRouteResult(RouteRequest req) {
    try {
      Future result = EXECUTOR.submit(() -> (RouteResponse) runner.run("render", req, new RouteResponse()));
      return new AsyncResult<>((RouteResponse) result.get());
    } catch (Exception e) {
      log.error(e.getMessage(), e);
      return new AsyncResult<>(new RouteResponse(500, ""));
    }
  }
}
