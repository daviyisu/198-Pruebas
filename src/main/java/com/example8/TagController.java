package com.example8;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Setter
@Getter
@AllArgsConstructor   //Lombok's annotations to generate boiler code
@NoArgsConstructor(force = true)

@RestController
@RequestMapping("/tags")
@CrossOrigin(origins = "http://localhost:4200")
public class TagController {

    @Autowired
    private final StoryRepository storyRepository;

    @Autowired
    private final StoryTagsRepository storyTagsRepository;

    @Autowired
    private final TagRepository tagRepository;

    @GetMapping("/tagsbystory/{story_id}")
    public List<Tag> getTagsByStory(@PathVariable Long story_id){
        List<StoryTags> storyTagsList = storyTagsRepository.findAllByStoryId(story_id);
        List<Tag> tagList = new ArrayList<>();
        Optional<Tag> optionalTag;
        for (StoryTags storyTags : storyTagsList) {
            optionalTag = tagRepository.findById(storyTags.getTagId());
            if (optionalTag.isPresent()) {
                tagList.add(optionalTag.get());
            }
        }
        return tagList;
    }
}
