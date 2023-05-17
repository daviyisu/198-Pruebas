import {Tag} from "./Tag";

export class Story {
  id!: string;
  content!: string;
  tagList!: Tag[];

  getId(): String {
    return this.id
  }

  setTags(tagsToAdd: Tag[]): void {
    this.tagList = tagsToAdd;
  }

}
