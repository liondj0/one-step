import {CreateGroupDto} from "../../../../packages/common/dto/group";
import {GroupEntity} from "../entity/group-entity";
import {groupRepo} from "../repo/group-repo";
import {UserInGroupEntity} from "../entity/user-in-group-entity";
import {UserInGroupRole} from "../enum/user-in-group-role";
import {UserInGroupStatus} from "../enum/user-in-group-status";
import {userInGroupRepo} from "../repo/user-in-group-repo";
import {getUserInSession} from "../util/session-util";


export const createGroup = async (params: CreateGroupDto) => {
  const group = new GroupEntity();
  group.name = params.name;
  group.description = params.description;
  group.isPublic = params.isPublic;
  groupRepo().save(group);

  const userInGroup = new UserInGroupEntity();
  userInGroup.user = getUserInSession();
  userInGroup.group = group;
  userInGroup.role = UserInGroupRole.ADMIN;
  userInGroup.status = UserInGroupStatus.ACTIVE;

  userInGroupRepo().save(userInGroup);

  return group;

}



