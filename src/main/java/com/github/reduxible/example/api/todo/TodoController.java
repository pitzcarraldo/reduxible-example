package com.github.reduxible.example.api.todo;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * @author Minkyu Cho(mrnoname@naver.com)
 */
@RestController
@RequestMapping("/api/todos")
public class TodoController {
	private static Map<String, Todo> TODOS = new HashMap<>();

	@RequestMapping(path = "", method = RequestMethod.GET)
	public Map<String, Todo> getTodos() {
		return TODOS;
	}

	@RequestMapping(path = "", method = RequestMethod.POST)
	public Map<String, Todo> postTodos(@RequestBody Map<String, Map<String, Todo>> body) {
		Map<String, Todo> todos = body.get("todos");
		todos.forEach((id, todo) -> {
			if (TODOS.containsKey(id)) {
				todo = TODOS.get(id).merge(todo);
			}
			TODOS.put(id, todo);
		});
		return TODOS;
	}

	@RequestMapping(path = "/{id}", method = RequestMethod.DELETE)
	public Map<String, Todo> deleteTodo(@PathVariable String id) {
		TODOS.remove(id);
		return TODOS;
	}
}
