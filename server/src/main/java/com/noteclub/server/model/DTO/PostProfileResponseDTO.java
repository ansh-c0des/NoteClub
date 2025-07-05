package com.noteclub.server.model.DTO;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class PostProfileResponseDTO {
    private MultipartFile pic_file;
    private String picture_url;
    private String bio;
    private String edu_course;

}
