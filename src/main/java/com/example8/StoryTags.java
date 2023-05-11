package com.example8;

import jakarta.persistence.*;
import lombok.*;

@Setter
@Getter
@Entity
@Table(name = "stories_tags")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class StoryTags {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @JoinColumn(name = "story_id")
    private Long storyId;

    @JoinColumn(name = "tag_id")
    private Long tagId;
}
