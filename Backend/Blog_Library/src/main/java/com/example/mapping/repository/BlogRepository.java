package com.example.mapping.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.mapping.model.Blog;

import java.util.List;

public interface BlogRepository extends JpaRepository<Blog, Long> {
	@Query("SELECT b FROM Blog b WHERE LOWER(b.category) = LOWER(:category)")
	List<Blog> findByCategoryExact(@Param("category") String category);
}