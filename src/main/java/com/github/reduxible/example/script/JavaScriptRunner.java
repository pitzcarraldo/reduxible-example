package com.github.reduxible.example.script;

import jdk.nashorn.api.scripting.NashornScriptEngine;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * @author Minkyu Cho(mrnoname@naver.com)
 */
@Slf4j
@Component
public class JavaScriptRunner {
  @Autowired
  public NashornScriptEngine nashornScriptEngine;

  public Object run(String method, Object... args) throws Exception {
    return nashornScriptEngine.invokeFunction(method, args);
  }
}
