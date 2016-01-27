package com.github.reduxible.example;

import jdk.nashorn.api.scripting.NashornScriptEngine;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.handler.SimpleUrlHandlerMapping;
import org.springframework.web.servlet.resource.ResourceHttpRequestHandler;

import javax.script.ScriptEngineManager;
import javax.script.ScriptException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.Arrays;
import java.util.Collections;

@SpringBootApplication
public class ReduxibleSpringExampleApplication {
	public static void main(String[] args) {
		SpringApplication.run(ReduxibleSpringExampleApplication.class, args);
	}

	@Bean
	public NashornScriptEngine nashornScriptEngine() {
		NashornScriptEngine nashornScriptEngine = (NashornScriptEngine) new ScriptEngineManager().getEngineByName("nashorn");
		try {
			nashornScriptEngine.eval(read("static/js/eventloop.js"));
			nashornScriptEngine.eval(read("static/dist/server.js"));
			//nashornScriptEngine.eval(read("static/js/render.js"));
		} catch (ScriptException e) {
			throw new RuntimeException(e);
		}
		return nashornScriptEngine;
	}

	private Reader read(String path) {
		InputStream input = getClass().getClassLoader().getResourceAsStream(path);
		return new InputStreamReader(input);
	}

	@Bean
	public SimpleUrlHandlerMapping staticHandlerMapping() {
		SimpleUrlHandlerMapping mapping = new SimpleUrlHandlerMapping();
		mapping.setOrder(Integer.MIN_VALUE);
		mapping.setUrlMap(Collections.singletonMap("/dist/**", staticRequestHandler()));
		return mapping;
	}

	@Bean
	protected ResourceHttpRequestHandler staticRequestHandler() {
		ResourceHttpRequestHandler requestHandler = new ResourceHttpRequestHandler();
		requestHandler.setLocations(Arrays.<Resource>asList(new ClassPathResource("/static/dist/")));
		return requestHandler;
	}
}
