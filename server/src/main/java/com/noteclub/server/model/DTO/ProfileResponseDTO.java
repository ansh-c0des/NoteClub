package com.noteclub.server.model.DTO;

import lombok.Data;

@Data
public class ProfileResponseDTO {
    private String picture_url;
    private String bio;
    private String username;
    private String edu_course;
}
