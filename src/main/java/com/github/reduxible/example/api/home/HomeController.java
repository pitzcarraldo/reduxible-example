package com.github.reduxible.example.api.home;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Minkyu Cho(mrnoname@naver.com)
 */
@RestController
@RequestMapping("/api/home")
public class HomeController {
  @RequestMapping(path = "", method = RequestMethod.GET)
  public List<HomeContent> getHomeContents() {
    List<HomeContent> contents = new ArrayList<>();
    contents.add(new HomeContent("Why Reduxible?",
      "React, Redux and other related things are already good enough to use directly. But some people (like me) only want to focus to application codes and don't want to spend time for make and sustain project base. So I wrapped base elements for React + Redux Application. If you use Reduxible, you only have to make and set Router, Middleware, Reducers and React Components to Reduxible. When then, you can run React + Redux App immediately. Also, it can be Universal App or Single Page App by config."));
    contents.add(new HomeContent("We Need Long-Term Services!",
      "The environment of React and Redux is changing very quickly every day. There are too many related libraries and APIs of those are changing frequently. But for making real products, we need stable and verified stuff. Reduxible provides required modules that have many references for make universal application with React and Redux. And they are peer dependencies, so you can update them for the minor update. Reduxible will provides fixed API by wrapping that modules and will not update except when those have critical bugs. Therefore, you can only focus to make functions your application without modifying integration codes on your application. Reduxible will provide Long-Term Services for React + Redux application that even can be run in the Internet Explorer 8!"));
    return contents;
  }
}
