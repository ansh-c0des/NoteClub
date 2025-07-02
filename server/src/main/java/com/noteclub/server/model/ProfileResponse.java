package com.noteclub.server.model;

import lombok.Data;

@Data
public class ProfileResponse {
    private String picture_url;
    private String bio;
    private String username;
}
