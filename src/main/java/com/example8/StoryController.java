package com.example8;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;


import javax.swing.text.html.parser.Entity;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Setter
@Getter
@AllArgsConstructor   //Lombok's annotations to generate boiler code
@NoArgsConstructor(force = true)

@RestController
@RequestMapping("/stories")
@CrossOrigin(origins = "http://localhost:4200")
public class StoryController {

    @Autowired
    private final StoryRepository storyRepository;

    @Autowired
    private final StoryTagsRepository storyTagsRepository;

    @Autowired
    private final TagRepository tagRepository;

    @Autowired
    private TagController tagController;


    @GetMapping("/all")
    public List<Story> getStories() {
        List<Story> storyList = storyRepository.findAll();
        Story updatedStory;
        for (int i=0; i<storyList.size(); i++){  //I get all the stories and then update them with their tags
            updatedStory = storyList.get(i);
            updatedStory.setTagList(tagController.getTagsByStory(updatedStory.getId()));
            storyList.set(i,updatedStory);
        }
        return storyList;
    }

    @GetMapping("/{id}")
    public Story getStoryById(@PathVariable Long id) {
        Story story_to_return = new Story();
        Optional<Story> optionalStory;
        optionalStory = storyRepository.findById(id);
        if (optionalStory.isPresent()){
            story_to_return = optionalStory.get();
            List<Tag> tagList = tagController.getTagsByStory(story_to_return.getId());
            story_to_return.setTagList(tagList);
        }

        return story_to_return;
    }

    @Transactional
    @DeleteMapping("/deletebyid/{id}")
    public ResponseEntity<Story> deleteStoryById(@PathVariable Long id){
        System.out.println("gffswghggg");
        storyTagsRepository.deleteAllByStoryId(id);
        storyRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }


    @GetMapping("/storiesbytag/{tag_title}")
    public List<Story> getStoriesByTag(@PathVariable String tag_title) {
        Tag tag = tagRepository.findByTitle(tag_title);
        List<StoryTags> story_tag_list = storyTagsRepository.findAllByTagId(tag.getId());
        List<Story> storyList = new ArrayList<>();
        Optional<Story> optional_story;
        for (StoryTags storyTags : story_tag_list) {
            optional_story = storyRepository.findById(storyTags.getStoryId());
            if (optional_story.isPresent()) {
                storyList.add(optional_story.get());
            }
        }
        return storyList;
    }

    @PostMapping("/addstory")
    public ResponseEntity<Story> addStory(@RequestBody Story story) {
        boolean allTagsExists = true;
        for (int i=0; i<story.getTagList().size(); i++){
            System.out.println(story.getTagList().size());
            System.out.println(story.getTagList().get(i).toString());
        }
        List<Tag> checkedTags = new ArrayList<>();

        if(story.getTagList().isEmpty()){  //If there are not any tags, we simply add the story
            this.storyRepository.save(story);
            return ResponseEntity.ok(story);
        }

        for (int i=0; i<story.getTagList().size(); i++){
            Tag tagToAdd = this.tagRepository.findByTitle(story.getTagList().get(i).getTitle());
            if (tagToAdd == null) {
                allTagsExists = false;  //If one tag does not exist, we cancel the whole operation
                break;
            }else {
                checkedTags.add(tagToAdd);
            }
        }
        if (allTagsExists){  //If all tags exist, we go through the checked list to save them and the story
            Story savedStory = this.storyRepository.save(story);
            for (Tag checkedTag : checkedTags) {
                StoryTags storyTagToAdd = new StoryTags();
                storyTagToAdd.setStoryId(savedStory.getId());
                storyTagToAdd.setTagId(checkedTag.getId());
                this.storyTagsRepository.save(storyTagToAdd);
            }
        } else {
            return ResponseEntity.badRequest().build();  //We return a 400 error code
        }
        return ResponseEntity.ok(story);
    }

    @ExceptionHandler(NullPointerException.class)
    public ResponseEntity<String> handleNullPointerException() {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Search did not show any results");
    }

}

