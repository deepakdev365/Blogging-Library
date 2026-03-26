package com.example.mapping.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.mapping.model.Blog;
import com.example.mapping.model.User;
import com.example.mapping.repository.UserRepository;
import com.example.mapping.service.BlogService;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/blogs")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class BlogController {

    @Autowired
    private BlogService blogService;

    @Autowired
    private UserRepository userRepository;

    // ✅ CREATE BLOG
    @PostMapping("/create")
    public Blog createBlog(@RequestBody Blog blog) {

        // 🔥 Fix user mapping (IMPORTANT)
        if (blog.getUser() != null && blog.getUser().getId() != null) {

            User user = userRepository.findById(blog.getUser().getId())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            blog.setUser(user);
        } else {
            throw new RuntimeException("User ID is required");
        }

        // 🔥 Auto-set publish date
        blog.setDatePublished(LocalDate.now());

        return blogService.createBlog(blog);
    }

    // ✅ GET ALL BLOGS
    @GetMapping("/all")
    public List<Blog> getAllBlogs() {
        return blogService.getAllBlogs();
    }

    // ✅ GET BLOGS BY CATEGORY
    @GetMapping("/category/{category}")
    public List<Blog> getBlogsByCategory(@PathVariable String category) {

        System.out.println("Requested category: " + category);

        List<Blog> blogs = blogService.getBlogsByCategory(category);

        System.out.println("Blogs returned: " + blogs.size());

        return blogs;
    }

    // ✅ UPDATE BLOG
    @PutMapping("/{id}")
    public Blog updateBlog(@PathVariable Long id, @RequestBody Blog updatedBlog) {
        return blogService.updateBlog(id, updatedBlog);
    }

    // ✅ DELETE BLOG
    @DeleteMapping("/{id}")
    public String deleteBlog(@PathVariable Long id) {
        blogService.deleteBlog(id);
        return "Blog deleted successfully";
    }

    // ✅ GET BLOG BY ID (with visit count increment)
    @GetMapping("/{id}")
    public Blog getBlogById(@PathVariable Long id) {
        return blogService.getBlogById(id);
    }
}