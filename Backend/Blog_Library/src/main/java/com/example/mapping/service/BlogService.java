package com.example.mapping.service;

import java.util.List;

import com.example.mapping.model.Blog;

public interface BlogService {

    Blog createBlog(Blog blog);

    List<Blog> getAllBlogs();

    List<Blog> getBlogsByCategory(String category);

    Blog updateBlog(Long id, Blog blog);

    void deleteBlog(Long id);

    Blog getBlogById(Long id); // for visit count
}