package com.example.mapping.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.mapping.model.Blog;
import com.example.mapping.service.BlogService;

import java.util.List;

@RestController
@RequestMapping("/blogs")
@CrossOrigin(origins = "localhost://5500")
public class BlogController {

    @Autowired
    private BlogService blogService;

    @PostMapping("/create")
    public Blog createBlog(@RequestBody Blog blog) {
        return blogService.createBlog(blog);
    }

    @GetMapping("/all")
    public List<Blog> getAllBlogs() {
        return blogService.getAllBlogs();
    }

    @GetMapping("/category/{category}")
    public List<Blog> getBlogsByCategory(@PathVariable String category) {
        return blogService.getBlogsByCategory(category);
    }

    @PutMapping("/{id}")
    public Blog updateBlog(@PathVariable Long id,
                           @RequestBody Blog blog) {
        return blogService.updateBlog(id, blog);
    }

    @DeleteMapping("/{id}")
    public String deleteBlog(@PathVariable Long id) {
        blogService.deleteBlog(id);
        return "Blog deleted successfully";
    }

    @GetMapping("/{id}")
    public Blog getBlogById(@PathVariable Long id) {
        return blogService.getBlogById(id);
    }
}