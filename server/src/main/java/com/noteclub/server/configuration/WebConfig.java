package com.noteclub.server.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.File;
import java.nio.file.Paths;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry){
        // Always serve the "uploads" folder alongside wherever the app is running
        String uploadDir = Paths.get("uploads")
                .toAbsolutePath()
                .toString() + File.separator;

        registry
                .addResourceHandler("/files/**")
                .addResourceLocations("file:" + uploadDir)
                .setCachePeriod(3600);


    }
}
