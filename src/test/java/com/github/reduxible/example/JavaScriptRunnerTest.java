package com.github.reduxible.example;

import com.github.reduxible.example.route.RouteRequest;
import com.github.reduxible.example.route.RouteResponse;
import com.github.reduxible.example.script.JavaScriptRunner;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.FutureTask;

import static org.fest.assertions.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;
import static sun.swing.SwingUtilities2.submit;

/**
 * @author Minkyu Cho(mrnoname@naver.com)
 */
@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@SpringApplicationConfiguration(classes = ReduxibleSpringExampleApplication.class)
public class JavaScriptRunnerTest {
  @Autowired
  private JavaScriptRunner sut;

  @Test
  public void test() throws Exception {
    HttpServletRequest request = mock(MockHttpServletRequest.class);
    given(request.getRequestURI()).willReturn("/");
    RouteRequest req = new RouteRequest(request);
    RouteResponse response = (RouteResponse) sut.run("render", req, new RouteResponse());
    assertThat(response).isNotNull();
  }
}