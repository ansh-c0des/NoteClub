package com.noteclub.server.model.DTO;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class ProfileRequestDTO {
    @JsonIgnore
    private MultipartFile pic_file;

    private String picture_url;
    private String bio;
    private String edu_course;
    private String username;
    private String token;

}
