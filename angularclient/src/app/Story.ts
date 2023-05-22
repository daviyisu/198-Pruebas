import {Tag} from "./Tag";

export class Story {
  id!: string;
  content!: string;
  tagList!: Tag[];

  setTags(tagsToAdd: Tag[]): void {
    this.tagList = tagsToAdd;
  }

  setTagsFromForm(tagsToSplit: string): void {
    let splitList: string[] = tagsToSplit.split(",");  //Split the string using the comas
    let tagsToAdd: Tag[] = [];
    if (tagsToAdd.length != 0){
      for (let i = 0; i<splitList.length; i++){
        let newTag: Tag = new Tag(splitList.at(i)!);   //Each position of splitList is the title of a Tag
        tagsToAdd.push(newTag);
      }
    }

    this.tagList = tagsToAdd;
  }

}
