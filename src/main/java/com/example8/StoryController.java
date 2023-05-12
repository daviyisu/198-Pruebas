package com.example8;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Setter
@Getter
@AllArgsConstructor   //Lombok's annotations to generate boiler code
@NoArgsConstructor(force = true)

@RestController
@RequestMapping("/stories")
public class StoryController {

    @Autowired
    private final StoryRepository storyRepository;

    @Autowired
    private final StoryTagsRepository storyTagsRepository;

    @Autowired
    private final TagRepository tagRepository;


    @GetMapping("/all")
    public List<Story> getStories() {
        return storyRepository.findAll();
    }

    @GetMapping("/{id}")
    public Story getStoryById(@PathVariable Long id) {
        Optional<Story> story_to_return;
        story_to_return = storyRepository.findById(id);
        return story_to_return.get();
    }


    @GetMapping("/storiesbytag/{tag_title}")
    public List<Story> getStoriesByTag(@PathVariable String tag_title) {
        Tag tag = tagRepository.findByTitle(tag_title);
        List<StoryTags> story_tag_list = storyTagsRepository.findAllByTagId(tag.getId());
        List<Story> storyList = new ArrayList<>();
        Optional<Story> optional_story;
        for (int i = 0; i < story_tag_list.size(); i++) {
            optional_story = storyRepository.findById(story_tag_list.get(i).getStoryId());
            if (optional_story.isPresent()) {
                storyList.add(optional_story.get());
            }
        }
        return storyList;
    }

    @ExceptionHandler(NullPointerException.class)
    public ResponseEntity<String> handleNullPointerException() {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Search did not show any results");
    }

}

