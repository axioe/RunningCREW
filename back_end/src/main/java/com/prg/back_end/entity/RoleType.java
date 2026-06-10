package com.prg.back_end.entity;

import com.fasterxml.jackson.annotation.JsonCreator;

import java.util.Arrays;

public enum RoleType {
    USER,
    ADMIN;

    @JsonCreator
    public static RoleType from(String value) {
        return Arrays.stream(values())
                .filter(v -> v.name().equalsIgnoreCase(value))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException(value));
    }
}