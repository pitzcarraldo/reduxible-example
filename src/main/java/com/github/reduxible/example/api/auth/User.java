package com.github.reduxible.example.api.auth;

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
public class User {
	private String username;
	private String auth;
}
