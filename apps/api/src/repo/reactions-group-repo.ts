import {BaseRepo} from "./base-repo";
import {ReactionsGroupEntity} from "../entity/reactions-group-entity";


export class ReactionsGroupRepo extends BaseRepo<ReactionsGroupEntity> {

  constructor() {
    super(ReactionsGroupEntity);
  }
}

export const reactionsGroupRepo = () => new ReactionsGroupRepo();
