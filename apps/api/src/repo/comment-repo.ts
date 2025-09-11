import {BaseRepo} from "./base-repo";
import {GroupPostEntity} from "../entity/group-post-entity";
import {CommentEntity} from "../entity/comment-entity";


export class CommentRepo extends BaseRepo<CommentEntity> {

  constructor() {
    super(CommentEntity);
  }


}


export const commentRepo = () => new CommentRepo();
