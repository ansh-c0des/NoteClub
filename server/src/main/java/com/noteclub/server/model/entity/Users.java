package com.noteclub.server.model.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "user_details")
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "user_id")
    private Integer userId;
    @Column(name = "user_name")
    private String username;
    private String email_id;
    private String phone_number;
    private String dob;
    @Column(name="edu_course")
    private String eduCourse;
    private String password;

    @Override
    public String toString() {
        return "Users{" +
                "user_id=" + userId +
                ", user_name='" + username + '\'' +
                ", email_id='" + email_id + '\'' +
                ", phone_number='" + phone_number + '\'' +
                ", dob='" + dob + '\'' +
                ", edu_course='" + eduCourse + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
