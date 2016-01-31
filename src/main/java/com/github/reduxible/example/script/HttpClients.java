package com.github.reduxible.example.script;

import com.fasterxml.jackson.databind.util.LRUMap;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.apache.http.impl.nio.client.CloseableHttpAsyncClient;
import org.apache.http.impl.nio.client.HttpAsyncClients;
import org.apache.http.impl.nio.reactor.IOReactorConfig;
import org.springframework.http.client.AsyncClientHttpRequestFactory;
import org.springframework.http.client.HttpComponentsAsyncClientHttpRequestFactory;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.AsyncRestTemplate;
import org.springframework.web.client.RestTemplate;

/**
 * @author Minkyu Cho(mrnoname@naver.com)
 */
@Component
public class HttpClients {
  private static final Gson GSON = new GsonBuilder().disableHtmlEscaping().create();
  private static final LRUMap<Integer, RestTemplate> SYNC_CLIENT_CACHE = new LRUMap<>(10, 10);
  private static final LRUMap<Integer, AsyncRestTemplate> ASYNC_CLIENT_CACHE = new LRUMap<>(10, 10);

  public static RestTemplate getSync(int timeout) {
    if (SYNC_CLIENT_CACHE.get(timeout) != null) {
      return SYNC_CLIENT_CACHE.get(timeout);
    }
    HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();
    factory.setConnectTimeout(timeout);
    factory.setConnectTimeout(timeout);
    RestTemplate client = new RestTemplate(factory);
    SYNC_CLIENT_CACHE.putIfAbsent(timeout, client);
    return client;
  }

  public static AsyncRestTemplate getAsync(int timeout) {
    if (ASYNC_CLIENT_CACHE.get(timeout) != null) {
      return ASYNC_CLIENT_CACHE.get(timeout);
    }
    IOReactorConfig ioReactorConfig = IOReactorConfig.custom().setConnectTimeout(timeout).build();
    CloseableHttpAsyncClient asyncHttpClient = HttpAsyncClients.custom().setDefaultIOReactorConfig(ioReactorConfig).build();
    AsyncClientHttpRequestFactory asyncHttpRequestFactory = new HttpComponentsAsyncClientHttpRequestFactory(asyncHttpClient);
    AsyncRestTemplate client = new AsyncRestTemplate(asyncHttpRequestFactory, getSync(timeout));
    ASYNC_CLIENT_CACHE.putIfAbsent(timeout, client);
    return client;
  }

  public static String toJson(Object object) {
    return GSON.toJson(object);
  }
}
