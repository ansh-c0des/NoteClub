package com.noteclub.server.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "user_details")
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer user_id;
    @Column(name = "user_name")
    private String username;
    private String email_id;
    private String phone_number;
    private String dob;
    private String edu_course;
    private String password;

    @Override
    public String toString() {
        return "Users{" +
                "user_id=" + user_id +
                ", user_name='" + username + '\'' +
                ", email_id='" + email_id + '\'' +
                ", phone_number='" + phone_number + '\'' +
                ", dob='" + dob + '\'' +
                ", edu_course='" + edu_course + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
