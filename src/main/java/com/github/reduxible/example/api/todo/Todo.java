package com.github.reduxible.example.api.todo;

import com.github.reduxible.example.api.auth.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * @author Alan(Minkyu Cho)
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Todo {
	private User user;
	private String text;
	private boolean complete = false;

	public Todo merge(Todo toMerge) {
		this.user = this.user == null ? toMerge.user : this.user;
		this.text = this.text == null? toMerge.text : this.text;
		this.complete = this.complete != toMerge.complete ? toMerge.complete: this.complete;
		return this;
	}
}
