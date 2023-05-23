package com.example8;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StoryTagsRepository extends JpaRepository<StoryTags, Long> {

    StoryTags findByTagId(Long tag_id);
    List<StoryTags> findAllByTagId(Long tag_id);

    @Query("SELECT s1.storyId FROM StoryTags s1 WHERE s1.tagId = :first_id AND EXISTS(SELECT 1 FROM StoryTags s2 WHERE s2.tagId = :second_id AND s1.storyId = s2.storyId)")
    List<StoryTags> findAllByTagsId(@Param("first_id") Long first_id, @Param("second_id") Long second_id);

    List<StoryTags> findAllByStoryId(Long story_id);

    void deleteAllByStoryId(Long id);

}
