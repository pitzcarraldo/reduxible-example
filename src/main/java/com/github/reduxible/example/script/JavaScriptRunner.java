package com.github.reduxible.example.script;

import jdk.nashorn.api.scripting.NashornScriptEngine;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.concurrent.*;

/**
 * @author Alan(Minkyu Cho)
 */
@Slf4j
@Component
public class JavaScriptRunner {
  private static final ExecutorService EXECUTOR = Executors.newCachedThreadPool();
  private static final int DEFAULT_TIMEOUT = 3;

  @Autowired
  public NashornScriptEngine nashornScriptEngine;

  public Object run(String method, Object... args) throws Exception {
      return EXECUTOR.submit(() -> nashornScriptEngine.invokeFunction(method, args)).get(DEFAULT_TIMEOUT, TimeUnit.SECONDS);
  }

}
