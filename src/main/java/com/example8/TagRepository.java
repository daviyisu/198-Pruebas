package com.example8;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {

    Tag findByTitle(String tag_title);
    List<Tag> findAllByTitleIn(List<String> titleList);
}
