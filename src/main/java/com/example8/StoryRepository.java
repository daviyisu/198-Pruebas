package com.example8;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface StoryRepository extends JpaRepository<Story, Long>{

}
