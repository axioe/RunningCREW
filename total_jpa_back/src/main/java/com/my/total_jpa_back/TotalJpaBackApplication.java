package com.my.total_jpa_back;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class TotalJpaBackApplication {

	public static void main(String[] args) {
		SpringApplication.run(TotalJpaBackApplication.class, args);
	}

}
