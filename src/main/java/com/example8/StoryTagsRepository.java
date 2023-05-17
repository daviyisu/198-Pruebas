package com.example8;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StoryTagsRepository extends JpaRepository<StoryTags, Long> {

    StoryTags findByTagId(Long tag_id);
    List<StoryTags> findAllByTagId(Long tag_id);

    List<StoryTags> findAllByStoryId(Long story_id);

    void deleteAllByStoryId(Long id);
}
