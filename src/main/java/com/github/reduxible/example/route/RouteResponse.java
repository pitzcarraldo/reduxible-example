package com.github.reduxible.example.route;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

/**
 * @author Alan(Minkyu Cho)
 */
@Getter
@Setter
@AllArgsConstructor
public class RouteResponse {
	private Integer status;
	private String body;
}
