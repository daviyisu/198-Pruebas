package com.example8;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface StoryRepository extends JpaRepository<Story, Long>{
    @Query("SELECT s.id\n" +
            "FROM Story s\n" +
            "         JOIN StoryTags st ON s.id = st.storyId\n" +
            "         JOIN Tag t ON st.tagId = t.id\n" +
            "WHERE t.title IN (:tag_title_list)\n" +
            "GROUP BY s.id\n" +
            "HAVING COUNT(DISTINCT t.title) = :num_tags")
    List<Long> findAllByTagsId(@Param("tag_title_list") List<String> tag_title_list, @Param("num_tags") int num_tags);
}
