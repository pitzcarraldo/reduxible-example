package com.github.reduxible.example.route;

import com.github.reduxible.example.script.JavaScriptRunner;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.concurrent.*;

/**
 * @author Minkyu Cho(mrnoname@naver.com)
 */
@Slf4j
@Service
public class RouteService {
  private static final ExecutorService EXECUTOR = Executors.newCachedThreadPool();
  private static final int DEFAULT_TIMEOUT = 500;
  @Autowired
  private JavaScriptRunner runner;

  public RouteResponse getRouteResult(RouteRequest req) {
    try {
      RouteResponse res = (RouteResponse) runner.run("render", req, new RouteResponse());
      if (StringUtils.isEmpty(res.getBody())) {
        FutureTask<RouteResponse> task = new FutureTask<>(res);
        EXECUTOR.submit(task);
        res = task.get(DEFAULT_TIMEOUT, TimeUnit.MILLISECONDS);
      }
      return res;
    } catch (TimeoutException e) {
      log.error("Rendering Timed Out. Render Single Page Application.");
      return new RouteResponse(200, "");
    } catch (Exception e) {
      log.error(e.getMessage(), e);
      return new RouteResponse(500, "");
    }
  }
}
