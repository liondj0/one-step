import {BaseRepo} from "./base-repo";
import {RefreshTokenEntity} from "../entity/refresh-token-entity";


export class RefreshTokenRepo extends BaseRepo<RefreshTokenEntity> {
  constructor() {
    super(RefreshTokenEntity);
  }

  findOneByToken(token: string): Promise<RefreshTokenEntity | undefined> {
    return this.findOne({token})
  }
}


export const refreshTokenRepo = () => new RefreshTokenRepo();
